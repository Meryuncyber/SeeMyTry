// src/router.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Sayfalar
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import NotFound from "./pages/NotFound";

// Route Yapısı
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="result" element={<ResultPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
