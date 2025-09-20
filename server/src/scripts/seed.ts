import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Scholarship } from '../models/Scholarship';
import { SponsorshipCampaign } from '../models/SponsorshipCampaign';
import { PerformanceLog } from '../models/PerformanceLog';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';

dotenv.config();

const run = async () => {
  const uri = process.env.MONGODB_URI || '';
  await mongoose.connect(uri);

  await Promise.all([
    User.deleteMany({}),
    Scholarship.deleteMany({}),
    SponsorshipCampaign.deleteMany({}),
    PerformanceLog.deleteMany({}),
    Conversation.deleteMany({}),
    Message.deleteMany({})
  ]);

  const mkUser = async (u: any) => {
    const passwordHash = await bcrypt.hash('password123', 10);
    return User.create({ ...u, passwordHash });
  };

  const athletes = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      mkUser({ name: `Athlete ${i + 1}`, email: `athlete${i + 1}@example.com`, role: 'athlete', sport: 'Running', location: { state: 'MH', district: 'Pune' }, disability: i % 2 === 0, gender: i % 2 === 0 ? 'female' : 'male', verified: true })
    )
  );
  const coaches = await Promise.all(
    Array.from({ length: 3 }).map((_, i) => mkUser({ name: `Coach ${i + 1}`, email: `coach${i + 1}@example.com`, role: 'coach', verified: true }))
  );
  const sponsors = await Promise.all(
    Array.from({ length: 2 }).map((_, i) => mkUser({ name: `Sponsor ${i + 1}`, email: `sponsor${i + 1}@example.com`, role: 'sponsor', verified: true }))
  );
  await mkUser({ name: 'Admin', email: 'admin@example.com', role: 'admin', verified: true });

  await Scholarship.insertMany([
    { title: 'National Sports Scholarship', description: 'Support for top athletes', eligibility: 'National level players', region: 'All India', paraFriendly: true, status: 'open' },
    { title: 'Rural Talent Grant', description: 'For rural athletes', eligibility: 'Rural background', region: 'Rural', paraFriendly: true, status: 'open' },
    { title: 'Women in Sports', description: 'For women athletes', eligibility: 'Female athletes', region: 'All India', paraFriendly: true, status: 'open' },
    { title: 'State Excellence', description: 'For state champions', eligibility: 'State winners', region: 'MH', paraFriendly: false, status: 'open' }
  ]);

  await SponsorshipCampaign.insertMany([
    { ownerId: coaches[0]._id, title: 'Marathon Prep', description: '12-week program', budget: 5000, criteria: '10k under 50m', status: 'open', applicants: [], contracts: [] },
    { ownerId: sponsors[0]._id, title: 'Gear Sponsorship', description: 'Shoes and apparel', budget: 10000, criteria: 'Runners', status: 'open', applicants: [], contracts: [] }
  ]);

  for (const a of athletes) {
    await PerformanceLog.insertMany([
      { userId: a._id, date: new Date(), metrics: { distance: 5, time: 1500 } },
      { userId: a._id, date: new Date(Date.now() - 86400000), metrics: { distance: 3 } }
    ]);
  }

  const conv = await Conversation.create({ type: 'dm', memberIds: [athletes[0]._id, coaches[0]._id] });
  await Message.insertMany([
    { conversationId: conv._id, senderId: athletes[0]._id, content: 'Hi Coach!', attachments: [], readBy: [] },
    { conversationId: conv._id, senderId: coaches[0]._id, content: 'Hello! Let\'s plan.', attachments: [], readBy: [] }
  ]);

  await mongoose.disconnect();
};

run().then(() => {
  console.log('Seed complete');
  process.exit(0);
});
