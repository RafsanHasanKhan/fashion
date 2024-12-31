import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Ensure index.css is configured correctly
import { RouterProvider } from 'react-router-dom';

import Routes from './routers/Routes.jsx'; // Ensure the file contains a valid `createBrowserRouter` setup
import AuthProvider from './auth/AuthProvider/AuthProvider.jsx'; // Path to AuthProvider

// Ensure the 'root' element exists in your HTML (e.g., <div id="root"></div>)
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes} />{' '}
        {/* `Routes` must be a valid router object */}
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
