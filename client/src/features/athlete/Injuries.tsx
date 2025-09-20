import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { useState } from 'react';

export const Injuries = () => {
  const qc = useQueryClient();
  const list = useQuery({ queryKey: ['injuries'], queryFn: async () => (await api.get('/injuries')).data });
  const [file, setFile] = useState<File | null>(null);

  const create = useMutation({
    mutationFn: async (payload: FormData) => (await api.post('/injuries', payload, { headers: { 'Content-Type': 'multipart/form-data' } })).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['injuries'] })
  });

  const submit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('date', new Date().toISOString());
    fd.append('type', 'sprain');
    fd.append('severity', 'low');
    if (file) fd.append('files', file);
    await create.mutateAsync(fd);
  };

  return (
    <div className="space-y-3">
      <form onSubmit={submit} className="flex gap-2 items-center">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className="bg-brand-500 hover:bg-brand-600 rounded px-4 py-2">Upload</button>
      </form>
      <pre className="bg-slate-900 p-3 rounded">{JSON.stringify(list.data, null, 2)}</pre>
    </div>
  );
};
