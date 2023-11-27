import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SignupForm = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isGmailAddress = (email) => {
        const gmailRegex = /@gmail\.com$/;
        return gmailRegex.test(email);
    };

    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setLocation('');
        setPhone('');
    };

    const handleBack = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !location || !phone) {
            setErrorMessage('Todos los campos deben estar llenos.');
            setTimeout(() => {
                setErrorMessage('');
            }, 1500);
            return;
        }

        if (!isGmailAddress(email)) {
            setErrorMessage('Ingrese una dirección de correo de Gmail válida.');
            setTimeout(() => {
                setErrorMessage('');
            }, 1500);
            return;
        }

        setErrorMessage('');

        const userData = {
            nombre: firstName,
            apellido: lastName,
            correo: email,
            contraseña: password,
            ubicacion: location,
            telefono: phone,
        };

        try {
            const response = await fetch('http://localhost:8080/crear-clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setSuccessMessage('Su cuenta fue creado exitosamente');
                navigate('/login');
                clearFields();

            } else {
                console.error('Error al registrar');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorMessage('');
        }, 1500);

        return () => clearTimeout(timeout);
    }, [errorMessage]);

    useEffect(() => {
        const successTimeout = setTimeout(() => {
            setSuccessMessage('');
        }, 1500);

        return () => clearTimeout(successTimeout);
    }, [successMessage]);

    return (
        <div className="flex items-center justify-center h-screen bg-neutral-200 dark:bg-neutral-700 text-white">
            <div className="bg-custom-black p-4 sm:p-6 rounded-md shadow-md max-w-xl w-full relative">
                <h2 className="text-lg sm:text-3xl mb-4 text-center text-custom-yellow">Nueva cuenta</h2>

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-500 text-white rounded-md text-sm absolute top-0 left-0 right-0 z-10">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-500 text-white rounded-md text-sm absolute top-0 left-0 right-0 z-10">
                        {errorMessage}
                    </div>
                )}

                <div className="mb-4 border-b border-yellow-500 pb-4">
                    <h3 className="text-lg sm:text-xl mb-2 text-custom-yellow">Datos Personales</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm sm:text-base mb-2" htmlFor="firstName">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-2 border border-white rounded-md text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base mb-2" htmlFor="lastName">
                                Apellidos:
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-2 border border-white rounded-md text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4 border-b border-yellow-500 pb-4">
                    <h3 className="text-lg sm:text-xl mb-2 text-custom-yellow">Cuenta</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm sm:text-base mb-2" htmlFor="email">
                                Correo Electrónico:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-white rounded-md text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base mb-2" htmlFor="password">
                                Contraseña:
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-white rounded-md text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4 border-b border-yellow-500 pb-4">
                    <h3 className="text-lg sm:text-xl mb-2 text-custom-yellow">Dirección</h3>
                    <div>
                        <label className="block text-sm sm:text-base mb-2" htmlFor="location">
                            Ubicación:
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-white rounded-md text-white"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg sm:text-xl mb-2 text-custom-yellow">Contacto</h3>
                    <div>
                        <label className="block text-sm sm:text-base mb-2" htmlFor="phone">
                            Teléfono:
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-white rounded-md text-white"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-custom-yellow hover:bg-yellow-600 text-white py-2 px-4 rounded-md mt-4 cursor-pointer w-full"
                >
                    Crear cuenta
                </button>
                <button
                    onClick={handleBack}
                    className="bg-black-400 text-white py-2 px-4 rounded-md mt-4 cursor-pointer w-full"
                >
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default SignupForm;