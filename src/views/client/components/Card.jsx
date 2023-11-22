import PropTypes from 'prop-types';

function Card({ nombre_producto, precio, imagen, descripcion, onCardClick }) {
    return (
        <div className="flex flex-col h-full relative transform transition-all duration-500 ease-in-out hover:scale-105 backface-hidden translate-z-0" onClick={() => onCardClick({ nombre_producto, descripcion, precio, imagen })}>
            <div className="h-32 bg-center bg-cover mb-4 relative" style={{ backgroundImage: `url("${imagen}")` }}>
                <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>
            <div className="flex flex-col justify-between h-auto">
                <div>
                    <h3 className="font-bold text-lg mb-2">{nombre_producto}</h3>
                    <p className="text-sm">Precio: ${precio}</p>
                </div>
                <button className="bg-custom-yellow mt-2 py-0 px-8 rounded self-end hover:bg-yellow-700">Ver</button>
            </div>
        </div>
    );
}

Card.propTypes = {
    id_producto: PropTypes.number.isRequired,
    nombre_producto: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default Card;