import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import Admin from './components/Admin.tsx';
import './index.css';

const isAdminPage = window.location.pathname === '/admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminPage ? <Admin /> : <App />}
  </StrictMode>,
);
