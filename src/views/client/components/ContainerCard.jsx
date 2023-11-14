import PropTypes from 'prop-types';
import Card from "./Card";

function ContainerCard({ products }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4">
            {products.map((product, index) => (
                <Card key={index} name={product.name} price={product.price} imageUrl={product.imageUrl} />
            ))}
        </div>
    );
}

ContainerCard.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            imageUrl: PropTypes.string
        })
    ).isRequired,
};

export default ContainerCard;