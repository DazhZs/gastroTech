import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from './components/CartContext';
import PaymentModal from './components/PaymentModal';
import Footer from './components/Footer';
import Swal from 'sweetalert2';

function PayPage() {
    const navigate = useNavigate();
    const keys = ['nombre', 'apellido', 'correo', 'teléfono', 'ubicación'];
    const { cart, setCart } = useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingPayment, setPendingPayment] = useState(false);
    const precio_total = cart.reduce((total, product) => total + product.precio * (product.quantity || 1), 0).toFixed(2);
    const [cliente, setCliente] = useState({
        id: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        ubicacion: '',
    });


    const handlePaymentClick = async (metodo_pago, precio_total) => {
        if (metodo_pago === 2) {
            setIsModalOpen(true);
            return;
        }

        const productos = cart.map(product => ({
            id: product.id_producto,
            nombre: product.nombre_producto,
            cantidad: product.quantity,
        }));
        console.log('Productos:', productos);

        try {
            const token = localStorage.getItem('token');
            const payload = {
                total: precio_total,
                productos,
                idPago: metodo_pago
            };
            console.log('Payload:', payload);

            const response = await fetch('http://localhost:8080/pedidos-pusher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: 'Pedido realizado',
                    showConfirmButton: true,
                    background: '#202020',
                });
                setCart([]); // Empty the cart
                navigate('/');
            } else {
                console.error('Error:', response.statusText);
                alert('Error al realizar el pedido');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCardButtonClick = () => {
        setIsModalOpen(true);
        setPendingPayment(true);
    };

    const handleCardPayment = async () => {
        setIsModalOpen(false); // Close the card payment modal

        const productos = cart.map(product => ({
            id: product.id_producto,
            nombre: product.nombre_producto,
            cantidad: product.quantity,
        }));

        const payload = {
            total: precio_total,
            productos,
            idPago: 2
        };

        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:8080/pedidos-pusher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: 'Pedido realizado',
                    showConfirmButton: true,
                    background: '#202020',
                });
                setCart([]); // Empty the cart
                navigate('/');
            } else {
                console.error('Error:', response.statusText);
                alert('Error al realizar el pedido');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemoveClick = (indexToRemove) => {
        const newCart = [...cart];
        if (newCart[indexToRemove].quantity > 1) {
            newCart[indexToRemove].quantity -= 1;
            newCart[indexToRemove].totalPrice = newCart[indexToRemove].quantity * newCart[indexToRemove].precio;
        } else {
            newCart.splice(indexToRemove, 1);
        }
        setCart(newCart);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
        if (pendingPayment) {
            handlePaymentClick(2, cart.reduce((total, item) => total + item.precio, 0));
            setPendingPayment(false); // Set pendingPayment to false
        }
    };


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
                    setCliente(data.data);
                } else {
                    console.error('Error al obtener datos del cliente:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener datos del cliente:', error);
            }
        };

        fetchCliente();
    }, []);


    return (
        <div className='min-h-screen w-full flex flex-col justify-between'>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-xl mb-4 text-center">Datos Personales</h2>
                    {keys.map((key, i, arr) => i % 2 === 0 && (
                        <div key={i} className="flex mb-6 mt-6">
                            <input
                                placeholder={key}
                                value={cliente[key] || ''}
                                onChange={e => setCliente({ ...cliente, [key]: e.target.value })}
                                className="w-1/2 p-2 border border-custom-yellow rounded-lg mr-2"
                                disabled={key !== 'ubicacion'} // Deshabilita el campo de entrada si la clave no es 'ubicacion'
                            />
                            <input
                                placeholder={arr[i + 1]}
                                value={cliente[arr[i + 1]] || ''}
                                onChange={e => setCliente({ ...cliente, [arr[i + 1]]: e.target.value })}
                                className="w-1/2 p-2 border border-custom-yellow rounded-lg"
                                disabled={arr[i + 1] !== 'ubicacion'} // Deshabilita el campo de entrada si la clave no es 'ubicacion'
                            />
                        </div>
                    ))}
                    <div className="flex mt-40 space-x-4">
                        <button onClick={() => handlePaymentClick(1, precio_total)} className="w-1/2 p-2 border border-custom-yellow hover:border-yellow-700 bg-custom-black">Pagar con Efectivo</button>
                        <button onClick={handleCardButtonClick} className="w-1/2 p-2 border bg-custom-yellow hover:bg-yellow-600">Pagar en Tarjeta</button>
                        {isModalOpen && (
                            <PaymentModal isOpen={isModalOpen} onPay={handleCardPayment} onClose={handleModalClose} total={Number(precio_total)} />
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 mt-4 md:mt-0">
                    <div className="border border-custom-yellow rounded-lg p-4">
                        <h2 className="text-xl mb-4 text-center">Resumen del pedido</h2>
                        {cart[0] && (
                            <img src={cart[0].imagen}
                                alt="Imagen del pedido"
                                className="w-full max-w-md h-64 object-cover mx-auto mb-4" />
                        )}
                        <ul className="text-center">
                            {cart.map((product, index) => {
                                const totalPrice = product.precio * (product.quantity || 1);
                                return (
                                    <li key={index} className="mb-2 flex justify-between">
                                        <span>- {product.nombre_producto} x {product.quantity || 1}</span>
                                        <span>Precio: ${totalPrice}</span>
                                        <button onClick={() => handleRemoveClick(index)}>Eliminar</button>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="text-center mt-4">
                            <span>Total a pagar: ${precio_total}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default PayPage;