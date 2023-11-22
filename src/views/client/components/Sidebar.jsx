import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ onClose }) {
    return (
        <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="fixed top-0 left-0 h-full w-64 bg-custom-black text-white p-6 z-50">
                <h1 className="text-2xl mb-4 text-custom-yellow flex justify-center">Menú</h1>
                <ul>
                    <li className="mb-2">
                        <Link className="text-white hover:text-custom-yellow" to="/desayuno" onClick={onClose}>Desayuno</Link>
                    </li>
                    <li className="mb-2">
                        <Link className="text-white hover:text-custom-yellow" to="/comida" onClick={onClose}>Comida</Link>
                    </li>
                    <li className="mb-2">
                        <Link className="text-white hover:text-custom-yellow" to="/cena" onClick={onClose}>Cena</Link>
                    </li>
                    <li className="mb-2">
                        <Link className="text-white hover:text-custom-yellow" to="/postres" onClick={onClose}>Postres</Link>
                    </li>
                    <li className="mb-2">
                        <Link className="text-white hover:text-custom-yellow" to="/bebidas" onClick={onClose}>Bebidas</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

Sidebar.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Sidebar;