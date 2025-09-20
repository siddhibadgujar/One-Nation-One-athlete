import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Message } from '../models/Message';

export const initSockets = (io: Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Unauthorized'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev') as any;
      (socket as any).user = { id: decoded.sub };
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('message:send', async (payload: { conversationId: string; content: string; attachments?: string[] }) => {
      const senderId = (socket as any).user.id;
      const msg = await Message.create({ conversationId: payload.conversationId, senderId, content: payload.content, attachments: payload.attachments || [] });
      io.to(payload.conversationId).emit('message:new', msg);
    });

    socket.on('conversation:join', (conversationId: string) => {
      socket.join(conversationId);
    });

    socket.on('typing:start', (conversationId: string) => {
      socket.to(conversationId).emit('typing:start', { userId: (socket as any).user.id });
    });

    socket.on('typing:stop', (conversationId: string) => {
      socket.to(conversationId).emit('typing:stop', { userId: (socket as any).user.id });
    });
  });
};
