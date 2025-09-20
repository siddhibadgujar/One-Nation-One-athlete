import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';

export const Sponsorships = () => {
  const qc = useQueryClient();
  const list = useQuery({ queryKey: ['campaigns'], queryFn: async () => (await api.get('/sponsorships')).data });
  const create = useMutation({
    mutationFn: async () => (await api.post('/sponsorships', { title: 'New Campaign', description: 'Desc', budget: 1000 })).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['campaigns'] })
  });
  return (
    <div className="space-y-3">
      <button className="bg-brand-500 hover:bg-brand-600 rounded px-3 py-1" onClick={() => create.mutate()}>Create</button>
      <pre className="bg-slate-900 p-3 rounded">{JSON.stringify(list.data, null, 2)}</pre>
    </div>
  );
};
