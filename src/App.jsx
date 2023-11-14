import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './views/client/homePage';
import AdminDashboard from './views/admin/AdminDashboard';
import PayPage from './views/client/PayPage';
import Navbar from './views/client/components/Navbar';
import Sidebar from './views/client/components/Sidebar';

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
          <Route path="/" element={<HomePage />} />
          <Route path="/pay" element={<PayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;