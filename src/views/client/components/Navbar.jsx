import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Navbar({ onOpenSidebar }) {
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/cliente', {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.data.nombre);
        } else {
          console.error('Error al obtener datos del cliente:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener datos del cliente:', error);
      }
    };

    fetchCliente();
  }, [localStorage.getItem('token')]);

  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <nav className="md:h-20 w-full bg-custom-black p-4 flex flex-col md:flex-row justify-between items-center border-b-2 border-custom-yellow box-border sticky top-0 z-10">
      <div className="flex items-center mb-4 md:mb-0">
        <button onClick={onOpenSidebar} style={{ background: 'none', border: 'none' }} className='p-0 focus:outline-none hover:opacity-70'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffff" viewBox="0 0 256 256" className="mr-4">
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
          </svg>
        </button>
        <h1 className="font-bold text-2xl h-full flex items-center">
          <Link to="/">
            <span className="text-custom-yellow">Sazon</span><span className="text-white">Grill</span>
          </Link>
        </h1>
      </div>
      <div className="flex items-center ">
        <div className="relative">
          <div onClick={handleClick} className="flex items-center cursor-pointer hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256 " className='mr-1'>
              <path fill="#ffff" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z" />
            </svg>
            <div className='text-white mr-6'>{username ? username : 'Ingreso'}</div>
          </div>
          {dropdownOpen && (
            <div className='absolute top-full right-0 mt-2 w-48 border-none rounded shadow-lg'>
              <div className='py-1'>
                <button onClick={handleLogout} className='block w-full text-left px-3 py-1 bg-custom-yellow text-white hover:bg-yellow-600' style={{ maxWidth: '150px' }}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
        <Link to="/pay" className="hover:opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffff" viewBox="0 0 256 256">
            <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
          </svg>
        </Link>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onOpenSidebar: PropTypes.func.isRequired,
};

export default Navbar;