
import AppLayout from './layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import CartPage from './features/cart/CartPage';
import HomePage from './features/home/HomePage';
import ProductDetailPage from './features/product/pages/ProductDetailPage/ProductDetailPage';
import LoginPage from './features/auth/pages/LoginPage/LoginPage';
import CreateProductForm from './features/product/pages/ProductFormPage/ProductFormPage';
import { NotFoundPage } from './layout/404';
function App() {
  return (
    <Routes>
      <Route
        element={<AppLayout />}
      >
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetailPage />
          }
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />


      </Route>
      <Route
        path="/admin/products/create"
        element={<CreateProductForm />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App
