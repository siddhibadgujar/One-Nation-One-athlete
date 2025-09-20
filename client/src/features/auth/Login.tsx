import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { t } = useTranslation('auth');
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async (e: any) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    const role = data.user.role as string;
    nav(role === 'admin' ? '/admin' : role === 'athlete' ? '/athlete' : '/community');
  };
  return (
    <form onSubmit={submit} className="space-y-3 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold">{t('login')}</h2>
      <input className="w-full p-2 rounded bg-slate-800" placeholder={t('email') as string} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full p-2 rounded bg-slate-800" placeholder={t('password') as string} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-brand-500 hover:bg-brand-600 rounded p-2">{t('login')}</button>
    </form>
  );
};
