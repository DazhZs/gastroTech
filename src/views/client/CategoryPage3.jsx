import ContainerCard from "./components/ContainerCard";
import { useState, useEffect } from 'react';

function CategoryPage3() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/productos');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();

                const productscategoria5 = data.data.filter(product => product.id_categoria === 5);

                setProducts(productscategoria5);
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

export default CategoryPage3;