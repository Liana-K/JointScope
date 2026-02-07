import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import PlanLayout from './pages/PlanLayout';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Wishlist from './pages/Wishlist';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/plan-layout" element={<PlanLayout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
