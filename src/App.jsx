import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './views/client/components/Navbar';
import Sidebar from './views/client/components/Sidebar';
import HomePage from './views/client/HomePage';
import CategoryPage5 from './views/client/CategoryPage5';
import CategoryPage4 from './views/client/CategoryPage4';
import CategoryPage3 from './views/client/CategoryPage3';
import CategoryPage2 from './views/client/CategoryPage2';
import CategoryPage1 from './views/client/CategoryPage1';
import SignInPage from './views/client/SignInPage';
import LogInPage from './views/client/LogInPage';
import PayPage from './views/client/PayPage';
import CartContext from './views/client/components/CartContext';

const stripePromise = loadStripe('pk_test_51NWAB9K41Y6guxcOU54klw98DRpskl2S6miqEZ4fbBxRZSXSzS4vY07bHldwRKeHUieYSNA2VY02VH1rYZRlSaib00RE3XVgIj');

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const onOpenSidebar = () => setIsSidebarOpen(true);
  const onClose = () => setIsSidebarOpen(false);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Router>
        <div className='App'>
          <Navbar onOpenSidebar={onOpenSidebar} />
          {isSidebarOpen && <Sidebar onClose={onClose} />}
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/cena" element={<CategoryPage5 />} />
              <Route path="/desayuno" element={<CategoryPage4 />} />
              <Route path="/comida" element={<CategoryPage3 />} />
              <Route path="/postres" element={<CategoryPage2 />} />
              <Route path="/bebidas" element={<CategoryPage1 />} />
              <Route path="/pay" element={<PayPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Elements>
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;