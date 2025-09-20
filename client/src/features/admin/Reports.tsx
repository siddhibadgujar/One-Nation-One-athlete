import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export const Reports = () => {
  const { data } = useQuery({ queryKey: ['reports'], queryFn: async () => (await api.get('/admin/reports')).data });
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="glass p-3 rounded"><div className="text-sm opacity-70">Users</div><div className="text-2xl font-bold">{data?.users || 0}</div></div>
      <div className="glass p-3 rounded"><div className="text-sm opacity-70">Logs</div><div className="text-2xl font-bold">{data?.logs || 0}</div></div>
    </div>
  );
};
