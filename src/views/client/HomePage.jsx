import ContainerCard from "./components/ContainerCard";
import { useState, useEffect } from 'react';
import Footer from "./components/Footer";

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

                const firstProductsByCategory = {};

                data.data.forEach(product => {
                    if (!firstProductsByCategory[product.id_categoria]) {
                        firstProductsByCategory[product.id_categoria] = product;
                    }
                });

                const filteredProducts = Object.values(firstProductsByCategory);

                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="min-h-screen w-full flex flex-col justify-between">
            <div className="mt-8 mb-16 flex-grow">
                <ContainerCard products={products} />
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;