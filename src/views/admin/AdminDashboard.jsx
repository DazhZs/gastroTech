import Navbar from "./components/Navbar";

function AdminDashboard() {
  return (
    <div style={{ height: "100vh "}}>
      {/* Navbar */}
      <Navbar/>

      {/* Header */}
      <header className="h-2/6 bg-gray-200 p-4">
        {/* Add your content here */}
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 my-12">
        {/* Card 1 - Pedidos */}
        <div className="w-2/3 bg-white p-4 rounded shadow-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto"></div> {/* Icon */}
          <p className="text-center text-slate-950 mt-2 text-xl font-semibold">Ver Pedidos</p>
          <button
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => {
              // Handle navigation to "Ver Pedidos" page
            }}
          >
            Ir a Ver Pedidos
          </button>
        </div>

        {/* Card 2 - Eliminar */}
        <div className="w-2/3 bg-white p-4 rounded shadow-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto"></div> {/* Icon */}
          <p className="text-center text-slate-950 mt-2 text-xl font-semibold">Eliminar</p>
          <button
            className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => {
              // Handle navigation to "Eliminar" page
            }}
          >
            Ir a Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;