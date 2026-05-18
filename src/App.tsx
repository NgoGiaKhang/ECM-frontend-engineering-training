
import AppLayout from './layout/AppLayout';
import ProductGrid from './features/product/components/ProductList/ProductGrid';
import { useCart } from './features/cart/useCart';
function App() {
  const cart = useCart();
  return (
    <AppLayout cart={cart}/>
  )
}

export default App
