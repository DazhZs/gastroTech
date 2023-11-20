function PayPage() {
    const placeholders = ['Primer nombre*', 'Apellido*', 'Email', 'Teléfono*', 'Ciudad*', 'País*', 'Dirección*', 'Código postal*'];

    return (
        <div className='h-screen'>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4">
                    {placeholders.map((placeholder, i, arr) => i % 2 === 0 && (
                        <div key={i} className="flex mb-6">
                            <input placeholder={placeholder} className="w-1/2 p-2 border border-custom-yellow rounded-lg mr-2" />
                            <input placeholder={arr[i + 1]} className="w-1/2 p-2 border border-custom-yellow rounded-lg" />
                        </div>
                    ))}
                    <div className="flex mt-40">
                        <button className="w-1/2 p-2 border border-custom-yellow mr-2">Regresar</button>
                        <button className="w-1/2 p-2 border bg-custom-yellow">Pagar</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 mt-4 md:mt-0">
                    <div className="border border-custom-yellow rounded-lg p-4">
                        <h2 className="text-xl mb-4 text-center">Resumen del pedido</h2>
                        <img src="https://images.unsplash.com/photo-1541592391523-5ae8c2c88d10?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Imagen del pedido"
                            className="w-full max-w-md h-64 object-cover mx-auto mb-4" />
                        <ul className="text-center">
                            <li className="mb-2">- 1 Pizza</li>
                            <li className="mb-2">- 2 Hamburguesas</li>
                            {/* Agrega más elementos de la lista aquí según sea necesario */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayPage;