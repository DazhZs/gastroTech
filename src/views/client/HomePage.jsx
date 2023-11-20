import ContainerCard from "./components/ContainerCard";
import { useState, useEffect } from 'react';

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/productos');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();

                // Crear un objeto para rastrear el primer producto de cada categoría
                const firstProductsByCategory = {};

                // Filtrar y almacenar el primer producto de cada categoría
                data.data.forEach(product => {
                    if (!firstProductsByCategory[product.id_categoria]) {
                        firstProductsByCategory[product.id_categoria] = product;
                    }
                });

                // Convertir el objeto en un array de productos
                const filteredProducts = Object.values(firstProductsByCategory);

                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="h-screen w-full flex-grow">
            <div className="mt-8">
                <ContainerCard products={products} />
            </div>
        </div>
    );
}

export default HomePage;