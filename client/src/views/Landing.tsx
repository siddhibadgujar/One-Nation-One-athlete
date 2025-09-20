import { useTranslation } from 'react-i18next';
import { useUI } from '../store/ui';
import { LandingStadium } from '../components/three/LandingStadium';
import { LandingHero2D } from '../components/three/LandingHero2D';
import { Link } from 'react-router-dom';

export const Landing = () => {
  const { t, i18n } = useTranslation('common');
  const ui = useUI();
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <header className="flex items-center justify-between">
        <div className="text-xl font-semibold">{t('app_name')}</div>
        <div className="flex items-center gap-2">
          <select className="bg-slate-900 p-2 rounded" onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>
          <button onClick={ui.toggle3D} className="px-2 py-1 rounded bg-slate-900">{t('toggle_3d')}</button>
          <button onClick={ui.toggleContrast} className="px-2 py-1 rounded bg-slate-900">{t('high_contrast')}</button>
          <button onClick={ui.toggleLargeFont} className="px-2 py-1 rounded bg-slate-900">{t('large_font')}</button>
          <Link to="/login" className="px-3 py-1 rounded bg-brand-500 hover:bg-brand-600">Login</Link>
        </div>
      </header>
      {ui.enable3D ? <LandingStadium /> : <LandingHero2D />}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded">Inclusive athlete discovery</div>
        <div className="glass p-4 rounded">Performance analytics</div>
        <div className="glass p-4 rounded">Fairness and transparency</div>
      </div>
    </div>
  );
};
