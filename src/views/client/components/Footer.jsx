import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-custom-yellow text-white p-8">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl text-custom-black">Enlaces útiles</h3>
                        <Link to="/help" className="block mt-2 text-custom-black hover:text-white">Ayuda</Link>
                        <Link to="/about" className="block mt-2 text-custom-black hover:text-white">Sobre nosotros</Link>
                        <Link to="/contact" className="block mt-2 text-custom-black hover:text-white">Contacto</Link>
                    </div>
                    <div>
                        <h3 className="text-xl text-custom-black">Redes sociales</h3>
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="block mt-2 text-custom-black hover:text-white">Facebook</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="block mt-2 text-custom-black hover:text-white">Twitter</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="block mt-2 text-custom-black hover:text-white">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;