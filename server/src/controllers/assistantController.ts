import { Request, Response } from 'express';

export const askAssistant = async (req: Request, res: Response) => {
  const { prompt } = req.body || {};
  if (!process.env.OPENAI_API_KEY) return res.json({ answer: 'AI assistant is not configured. This is a stubbed response.' });
  try {
    const { OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt || 'Hello' }] });
    const answer = completion.choices[0]?.message?.content || '';
    res.json({ answer });
  } catch (e) {
    res.json({ answer: 'AI assistant error or not available. This is a stubbed response.' });
  }
};
