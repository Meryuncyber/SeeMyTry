import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout';

// Uygulamanın yönlendirme (routing) yapısını tanımlıyoruz.
// createBrowserRouter, tarayıcı URL geçmişini kullanarak yönlendirme yapar.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Bu, `/` ana yolu için varsayılan bileşeni belirtir
        element: <App />,
      },
      // Gelecekte eklenebilecek diğer sayfalar için bir yer tutucu
      // {
      //   path: 'hakkimizda',
      //   element: <div>Hakkımızda sayfası</div>,
      // },
      // {
      //   path: 'iletisim',
      //   element: <div>İletişim sayfası</div>,
      // },
    ],
  },
]);

// RouterProvider bileşeni, tüm uygulamayı yönlendirme bağlamına sarar.
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
