import { Discovery } from '../features/community/Discovery';
import { Messaging } from '../features/community/Messaging';
import { Sponsorships } from '../features/community/Sponsorships';
import { IndiaMap3D } from '../components/three/IndiaMap3D';
import { IndiaMap2D } from '../components/three/IndiaMap2D';
import { useUI } from '../store/ui';

export const Community = () => {
  const ui = useUI();
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {ui.enable3D ? <IndiaMap3D /> : <IndiaMap2D />}
      <Discovery />
      <Messaging />
      <Sponsorships />
    </div>
  );
};
