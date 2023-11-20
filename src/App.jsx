import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './views/client/HomePage';
import AdminDashboard from './views/admin/AdminDashboard';
import PayPage from './views/client/PayPage';
import Navbar from './views/client/components/Navbar';
import Sidebar from './views/client/components/Sidebar';
import CategoryPage5 from './views/client/CategoryPage5';
import CategoryPage4 from './views/client/CategoryPage4';
import CategoryPage3 from './views/client/CategoryPage3';
import CategoryPage2 from './views/client/CategoryPage2';
import CategoryPage1 from './views/client/CategoryPage1';
import Footer from './views/client/components/Footer';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onOpenSidebar = () => setIsSidebarOpen(true);
  const onClose = () => setIsSidebarOpen(false);

  return (
    <Router>
      <div className='App'>
        <Navbar onOpenSidebar={onOpenSidebar} />
        {isSidebarOpen && <Sidebar onClose={onClose} />}
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/category5" element={<CategoryPage5 />} />
          <Route path="/category4" element={<CategoryPage4 />} />
          <Route path="/category3" element={<CategoryPage3 />} />
          <Route path="/category2" element={<CategoryPage2 />} />
          <Route path="/category1" element={<CategoryPage1 />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;