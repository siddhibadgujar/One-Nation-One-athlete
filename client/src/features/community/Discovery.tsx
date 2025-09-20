import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export const Discovery = () => {
  const { data } = useQuery({ queryKey: ['users'], queryFn: async () => (await api.get('/users')).data, gcTime: 1000 * 60 });
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input placeholder="Sport" className="p-2 rounded bg-slate-800" />
        <input placeholder="State" className="p-2 rounded bg-slate-800" />
        <label className="flex items-center gap-2"><input type="checkbox" /> Para-friendly</label>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {(data || []).map((u: any) => (
          <div key={u._id} className="glass p-3 rounded">
            <div className="font-semibold">{u.name}</div>
            <div className="text-sm opacity-75">{u.sport || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
