import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Modal from './Modal';

function ContainerCard({ products }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleCardClick = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4">
            {products.map((product, index) => (
                <Card key={index} name={product.name} price={product.price} imageUrl={product.imageUrl} onCardClick={handleCardClick} />
            ))}
            {modalData && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                    <img src={modalData.imageUrl} alt={modalData.name} />
                    <h2 style={{ color: 'white' }}>{modalData.name}</h2>
                    <p style={{ color: 'white' }}>Precio: ${modalData.price}</p>
                </Modal>
            )}
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