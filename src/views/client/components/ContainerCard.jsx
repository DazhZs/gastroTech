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
                <Card key={index} nombre_producto={product.nombre_producto} precio={product.precio} imagen={product.imagen} descripcion={product.descripcion} onCardClick={handleCardClick} />
            ))}
            {modalData && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                    <img src={modalData.imagen} />
                    <h2 style={{ color: 'white' }}>{modalData.nombre_producto}</h2>
                    <p style={{ color: 'white' }}>{modalData.descripcion}</p>
                    <p style={{ color: 'white' }}>Precio: ${modalData.precio}</p>
                </Modal>
            )}
        </div>
    );
}

ContainerCard.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            nombre_producto: PropTypes.string,
            precio: PropTypes.number,
            imagen: PropTypes.string,
            descripcion: PropTypes.string,
        })
    ).isRequired,
};

export default ContainerCard;