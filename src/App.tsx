
import AppLayout from './layout/AppLayout';
import { useCart } from './features/cart/useCart';
function App() {
  const cart = useCart();
  
  return (
    <AppLayout cart={cart}/>
  )
}

export default App
