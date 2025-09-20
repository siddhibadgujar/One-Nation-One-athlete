import { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../../lib/api';

export const Messaging = () => {
  const [conversationId, setConversationId] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken') || '';
    const s = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000', { auth: { token } });
    socketRef.current = s;
    s.on('message:new', (msg: any) => setMessages((m) => [...m, msg]));
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (conversationId && socketRef.current) socketRef.current.emit('conversation:join', conversationId);
  }, [conversationId]);

  const send = () => {
    if (socketRef.current && conversationId) socketRef.current.emit('message:send', { conversationId, content: text });
    setText('');
  };

  return (
    <div className="space-y-2">
      <input className="p-2 rounded bg-slate-800 w-full" placeholder="Conversation ID" value={conversationId} onChange={(e) => setConversationId(e.target.value)} />
      <div className="h-64 overflow-auto glass rounded p-2">
        {messages.map((m, i) => (
          <div key={i} className="py-1 text-sm">{m.content}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="p-2 rounded bg-slate-800 flex-1" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="bg-brand-500 hover:bg-brand-600 rounded px-4" onClick={send}>Send</button>
      </div>
    </div>
  );
};
