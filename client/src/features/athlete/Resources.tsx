import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export const Resources = () => {
  const { data } = useQuery({ queryKey: ['scholarships'], queryFn: async () => (await api.get('/scholarships')).data });
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {(data || []).map((s: any) => (
        <div key={s._id} className="glass p-3 rounded">
          <div className="font-semibold">{s.title}</div>
          <div className="text-sm opacity-80">{s.description}</div>
          <button className="mt-2 bg-brand-500/80 hover:bg-brand-600 rounded px-3 py-1">Apply</button>
        </div>
      ))}
    </div>
  );
};
