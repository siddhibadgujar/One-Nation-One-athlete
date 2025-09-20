import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const colors = ['#47b6ff', '#1e99ff', '#084f96', '#0a417a', '#84d2ff'];

export const Fairness = () => {
  const { data } = useQuery({ queryKey: ['fairness'], queryFn: async () => (await api.get('/admin/fairness')).data });
  const region = (data?.byRegion || []).map((d: any) => ({ name: d.state || 'Unknown', value: d.count }));
  const para = (data?.byPara || []).map((d: any) => ({ name: String(d.disability), value: d.count }));
  const gender = (data?.byGender || []).map((d: any) => ({ name: d.gender || 'Unknown', value: d.count }));
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {[region, para, gender].map((arr, idx) => (
        <div key={idx} className="glass p-3 rounded">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie dataKey="value" data={arr} outerRadius={80} fill="#8884d8" label>
                  {arr.map((_e: any, i: number) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};
