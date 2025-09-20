import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Landing } from '../views/Landing';
import { Login } from '../features/auth/Login';
import { Register } from '../features/auth/Register';
import { AthleteDashboard } from '../views/AthleteDashboard';
import { Community } from '../views/Community';
import { AdminPanel } from '../views/AdminPanel';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/athlete', element: <AthleteDashboard /> },
  { path: '/community', element: <Community /> },
  { path: '/admin', element: <AdminPanel /> },
  { path: '*', element: <Navigate to="/" /> }
]);

export const AppRouter = () => <RouterProvider router={router} />;
