import { AppRouter } from './routes';
import { UIProvider } from './store/ui';

export const App = () => (
  <UIProvider>
    <AppRouter />
  </UIProvider>
);
