import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../lib/api';

export const Register = () => {
  const { t } = useTranslation('auth');
  const [form, setForm] = useState<any>({ role: 'athlete', disability: false });
  const change = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  const submit = async (e: any) => {
    e.preventDefault();
    await api.post('/auth/register', form);
    alert('Registered. Please login.');
  };
  return (
    <form onSubmit={submit} className="space-y-3 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold">{t('register')}</h2>
      <div className="grid grid-cols-2 gap-3">
        <input className="p-2 rounded bg-slate-800" placeholder={t('name') as string} onChange={(e) => change('name', e.target.value)} />
        <input className="p-2 rounded bg-slate-800" placeholder={t('email') as string} onChange={(e) => change('email', e.target.value)} />
        <input className="p-2 rounded bg-slate-800" placeholder="Phone" onChange={(e) => change('phone', e.target.value)} />
        <input className="p-2 rounded bg-slate-800" placeholder={t('password') as string} type="password" onChange={(e) => change('password', e.target.value)} />
        <select className="p-2 rounded bg-slate-800" onChange={(e) => change('role', e.target.value)}>
          <option value="athlete">Athlete</option>
          <option value="coach">Coach</option>
          <option value="sponsor">Sponsor</option>
        </select>
        <input className="p-2 rounded bg-slate-800" placeholder="Sport" onChange={(e) => change('sport', e.target.value)} />
        <input className="p-2 rounded bg-slate-800" placeholder="State" onChange={(e) => change('location', { ...(form.location || {}), state: e.target.value })} />
        <input className="p-2 rounded bg-slate-800" placeholder="District" onChange={(e) => change('location', { ...(form.location || {}), district: e.target.value })} />
        <input className="p-2 rounded bg-slate-800" placeholder="Category" onChange={(e) => change('category', e.target.value)} />
        <input className="p-2 rounded bg-slate-800" placeholder="Years of experience" type="number" onChange={(e) => change('experienceYears', Number(e.target.value))} />
        <select className="p-2 rounded bg-slate-800" onChange={(e) => change('language', e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
        <label className="flex items-center gap-2"><input type="checkbox" onChange={(e) => change('disability', e.target.checked)} /> Disability</label>
      </div>
      <button className="w-full bg-brand-500 hover:bg-brand-600 rounded p-2">{t('register')}</button>
    </form>
  );
};
