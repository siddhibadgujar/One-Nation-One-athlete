import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const queueKey = 'perfQueue';

export const Performance = () => {
  const qc = useQueryClient();
  const logs = useQuery({ queryKey: ['logs'], queryFn: async () => (await api.get('/performance')).data });
  const [distance, setDistance] = useState<number>(0);

  const create = useMutation({
    mutationFn: async (payload: any) => (await api.post('/performance', payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['logs'] })
  });

  const submit = async (e: any) => {
    e.preventDefault();
    const payload = { date: new Date().toISOString(), metrics: { distance } };
    try {
      await create.mutateAsync(payload);
    } catch {
      const q = JSON.parse(localStorage.getItem(queueKey) || '[]');
      q.push(payload);
      localStorage.setItem(queueKey, JSON.stringify(q));
      alert('Offline: queued log');
    }
  };

  useEffect(() => {
    const flush = async () => {
      const q = JSON.parse(localStorage.getItem(queueKey) || '[]');
      if (q.length) {
        try {
          await api.post('/performance/batch', q);
          localStorage.removeItem(queueKey);
          qc.invalidateQueries({ queryKey: ['logs'] });
        } catch {}
      }
    };
    const onOnline = () => flush();
    window.addEventListener('online', onOnline);
    flush();
    return () => window.removeEventListener('online', onOnline);
  }, [qc]);

  const data = useMemo(() => (logs.data || []).map((l: any) => ({ date: new Date(l.date).toLocaleDateString(), distance: l.metrics?.distance || 0 })), [logs.data]);

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="flex gap-2">
        <input type="number" className="p-2 rounded bg-slate-800" placeholder="Distance" value={distance} onChange={(e) => setDistance(parseFloat(e.target.value))} />
        <button className="bg-brand-500 hover:bg-brand-600 rounded px-4">Add</button>
      </form>
      <div className="h-64 glass rounded-xl p-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="distance" stroke="#47b6ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
