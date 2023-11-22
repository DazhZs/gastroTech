import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import PropTypes from 'prop-types';

const PaymentModal = ({ isOpen, onClose, onPay, total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {

            const amount = total;
            const descripcion = 'Pagos de productos de pedidos en linea';
            const pago = 'MXN';
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:8080/pagos', {
                method: 'POST',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    descripcion: descripcion,
                    pago: pago,
                }),
            });

            const { clientSecret } = await response.json();


            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });


            if (error) {
                console.error('Error al confirmar el pago:', error);
                setPaymentError('Error al procesar el pago. Verifica la información de la tarjeta.');
            } else if (paymentIntent.status === 'succeeded') {
                console.log('Pago exitoso');
                setPaymentError(null);
            }
        } catch (error) {
            console.error('Error general:', error);
            setPaymentError('Error al procesar el pago. Inténtalo de nuevo más tarde.');
        }
        onPay();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-middle bg-custom-black rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mx-auto px-4 sm:px-0" onClick={e => e.stopPropagation()}>
                    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full sm:w-96 mx-auto mt-4">
                        <div className="flex flex-col">
                            <label htmlFor="card-element" className="mb-2 font-bold text-lg text-gray-900">Tarjeta de crédito o débito</label>
                            <div className="p-2 border border-gray-300 rounded">
                                <CardElement className="w-full" />
                            </div>
                        </div>
                        <button onClick={handleSubmit} type="submit" disabled={!stripe} className="w-full mt-4 py-2 bg-custom-yellow text-white font-bold rounded hover:bg-yellow-700">
                            Pagar
                        </button>
                    </form>
                    {paymentError && <p className="text-red-500">{paymentError}</p>}
                    <button onClick={onClose} className="w-full mt-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

PaymentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPay: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
};
export default PaymentModal; 