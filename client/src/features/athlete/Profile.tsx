import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export const Profile = () => {
  const me = useQuery({ queryKey: ['me'], queryFn: async () => (await api.get('/auth/me')).data });
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Profile</h2>
      <pre className="bg-slate-900 p-3 rounded">{JSON.stringify(me.data, null, 2)}</pre>
    </div>
  );
};
