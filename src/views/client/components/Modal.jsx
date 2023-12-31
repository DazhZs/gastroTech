import PropTypes from 'prop-types';
import { useContext } from 'react';
import CartContext from './CartContext';
import Swal from 'sweetalert2';

function Modal({ isOpen, onClose, children, product }) {
    const { cart, setCart } = useContext(CartContext);

    const handleOrder = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            Swal.fire({
                icon: 'info',
                title: 'Debes iniciar sesión para agregar productos al carrito',
                background: '#202020',
                showConfirmButton: true,
            });
            return;
        }
        console.log('Agregando producto:', product);
        console.log('ID del producto:', product.id_producto);

        const existingProductIndex = cart.findIndex(item => item.id_producto === product.id_producto);

        console.log('existingProductIndex:', existingProductIndex);

        if (existingProductIndex >= 0) {
            console.log('El producto ya está en el carrito, incrementando la cantidad');
            const newCart = [...cart];
            newCart[existingProductIndex].quantity += 1;
            newCart[existingProductIndex].totalPrice = newCart[existingProductIndex].quantity * product.precio;
            setCart(newCart);
        } else {
            console.log('El producto no está en el carrito, agregando el producto con cantidad 1');
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }

        console.log('Estado del carrito después de agregar el producto:', cart);

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500,
            background: '#202020',
        });
        onClose();
    }
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" onClick={onClose}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-custom-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onClick={e => e.stopPropagation()}>

                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto max-h-96">
                        {children}
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-yellow text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleOrder}>
                            Pedir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    product: PropTypes.object.isRequired,
};

export default Modal;