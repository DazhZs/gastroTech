import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Modal from './Modal';

function ContainerCard({ products }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleCardClick = (product) => {
        console.log('Product:', product);
        setModalData(product);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4">
            {products.map((product, index) => (
                <Card
                    key={index}
                    id_producto={product.id_producto}
                    nombre_producto={product.nombre_producto}
                    precio={Number(product.precio)}
                    imagen={product.imagen}
                    descripcion={product.descripcion}
                    onCardClick={() => handleCardClick(product)}
                />
            ))}
            {modalData && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose} product={modalData}>
                    <div className="flex justify-center items-center">
                        <img src={modalData.imagen} className="object-contain" />
                    </div>
                    <br />
                    <h2 className='text-xl'>{modalData.nombre_producto}</h2>
                    <br />
                    <p className='text-sm'>{modalData.descripcion}</p>
                    <br />
                    <p className='text-sm'>Precio: ${modalData.precio}</p>
                </Modal>
            )}
        </div>
    );
}

ContainerCard.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id_producto: PropTypes.number,
            nombre_producto: PropTypes.string,
            precio: PropTypes.number,
            imagen: PropTypes.string,
            descripcion: PropTypes.string,
        })
    ).isRequired,
};

export default ContainerCard;