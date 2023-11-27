import ContainerCard from "./components/ContainerCard";
import { useState, useEffect } from 'react';
import Footer from "./components/Footer";

function CategoryPage1() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/productos');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();

                const productscategoria2 = data.data.filter(product => product.id_categoria === 2);
                const productscategoria8 = data.data.filter(product => product.id_categoria === 8);
                const productscategoria7 = data.data.filter(product => product.id_categoria === 7);


                const filteredProducts = productscategoria2.concat(productscategoria8, productscategoria7);

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

export default CategoryPage1;