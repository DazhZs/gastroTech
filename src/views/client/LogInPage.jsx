import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const loginData = {
            correo: username,
            contraseña: password,
        };

        fetch("http://localhost:8080/auth/login-cliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "inicio de sesion exitoso") {
                    localStorage.setItem("token", data.token);
                    navigate("/");
                } else {
                    alert("Usuario o contraseña incorrectas");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <section className="h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            <h4 className="mb-12 mt-1 pb-1 text-3xl font-semibold">
                                                Sazon Grill
                                            </h4>
                                        </div>

                                        <form>
                                            <div className="mb-4 flex flex-col">
                                                <label htmlFor="email">Correo:</label>
                                                <input className="rounded text-white px-2 p-2"
                                                    type="text"
                                                    id="username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-4 flex flex-col">
                                                <label htmlFor="password">Contraseña:</label>
                                                <input className="rounded text-white px-2 p-2"
                                                    type="password"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <button
                                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white bg-custom-yellow hover:bg-yellow-600"
                                                    type="button"
                                                    onClick={handleLogin}
                                                >
                                                    Iniciar sesión
                                                </button>
                                                <Link to="/signin" className="inline-block w-full text-center mt-4 text-sm text-white hover:text-custom-yellow">
                                                    Crear cuenta
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-custom-yellow">
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-2xl font-semibold">
                                            Tu delivery favorito
                                        </h4>
                                        <p className="text-base">
                                            Bienvenido - Tu Comida Favorita en un Solo Clic.
                                            <br />
                                            <br />
                                            En SazonGrill, nos enorgullece ofrecer una experiencia de entrega única que combina la conveniencia con la excelencia culinaria.
                                            Con un catálogo diverso de restaurantes locales, estamos aquí para satisfacer todos tus antojos y deleitar tu paladar desde la comodidad de tu hogar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginAdmin;