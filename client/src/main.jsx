import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Ensure index.css is configured correctly
import { RouterProvider } from 'react-router-dom';

import Routes from './routers/Routes.jsx'; // Ensure the file contains a valid `createBrowserRouter` setup
import AuthProvider from './auth/AuthProvider/AuthProvider.jsx'; // Path to AuthProvider

// Ensure the 'root' element exists in your HTML (e.g., <div id="root"></div>)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Routes} /> {/* `Routes` must be a valid router object */}
    </AuthProvider>
  </StrictMode>
);
