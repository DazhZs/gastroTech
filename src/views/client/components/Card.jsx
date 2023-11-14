import PropTypes from 'prop-types';

function Card({ name, price, imageUrl, onCardClick }) {
    return (
        <div className="flex flex-col h-full relative transform transition-all duration-500 ease-in-out hover:scale-105 backface-hidden translate-z-0" onClick={() => onCardClick({ name, price, imageUrl })}>
            <div className="h-32 bg-center bg-cover mb-4 relative" style={{ backgroundImage: `url("${imageUrl}")` }}>
                <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>
            <div className="flex flex-col justify-between h-auto">
                <div>
                    <h3 className="font-bold text-lg mb-2">{name}</h3>
                    <p className="text-sm">Precio: ${price}</p>
                </div>
                <button className="bg-custom-yellow mt-2 py-0 px-8 rounded self-end hover:bg-yellow-700">Pedir</button>
            </div>
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default Card;