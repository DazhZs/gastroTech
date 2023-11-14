import Navbar from './components/Navbar';

function PayPage() {
    const placeholders = ['Primer nombre', 'Apellido', 'Email', 'Teléfono', 'Ciudad', 'País', 'Dirección', 'Código postal'];

    return (
        <div className='h-screen'>
            <Navbar />
            <div className="flex">
                <div className="w-1/2 p-4">
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
                <div className="w-1/2 p-4">
                    {/* Aquí puedes agregar el contenido para la sección del lado derecho */}
                </div>
            </div>
        </div>
    );
}

export default PayPage;