import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './views/client/homePage';
import AdminDashboard from './views/admin/AdminDashboard';
import PayPage from './views/client/PayPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes path="/admin">
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/pay" element={<PayPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;