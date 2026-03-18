import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';

// State Providers
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LanguageProvider } from './context/LanguageContext';

// Components
import MainLayout from './components/MainLayout';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

const NotFound = () => <h1 className="text-2xl font-bold text-red-500">404 - Page Not Found</h1>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <ProductsList /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrapping in Redux and Context Providers */}
    <Provider store={store}>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </Provider>
  </StrictMode>
);