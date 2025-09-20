import { useUI } from '../store/ui';
import { ProgressAvatar } from '../components/three/ProgressAvatar';
import { ProgressAvatar2D } from '../components/three/ProgressAvatar2D';
import { Profile } from '../features/athlete/Profile';
import { Performance } from '../features/athlete/Performance';
import { Injuries } from '../features/athlete/Injuries';
import { Resources } from '../features/athlete/Resources';
import { TrainingCalendar } from '../features/athlete/Calendar';

export const AthleteDashboard = () => {
  const ui = useUI();
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2 glass p-3 rounded">
          <div className="font-semibold mb-2">Progress</div>
          {ui.enable3D ? <ProgressAvatar /> : <ProgressAvatar2D />}
        </div>
        <div className="glass p-3 rounded">
          <div className="font-semibold mb-2">Badges</div>
          <div className="text-sm opacity-70">Coming soon</div>
        </div>
      </div>
      <TrainingCalendar />
      <Profile />
      <Performance />
      <Injuries />
      <Resources />
    </div>
  );
};
