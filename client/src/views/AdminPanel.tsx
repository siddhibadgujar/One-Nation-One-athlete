import { Verification } from '../features/admin/Verification';
import { Fairness } from '../features/admin/Fairness';
import { Reports } from '../features/admin/Reports';

export const AdminPanel = () => (
  <div className="max-w-5xl mx-auto p-4 space-y-6">
    <Reports />
    <Fairness />
    <Verification />
  </div>
);
