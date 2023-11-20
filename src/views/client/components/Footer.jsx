import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-custom-yellow text-white p-8"> {/* Increased padding from p-4 to p-8 */}
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-lg text-custom-black">Enlaces útiles</h3>
                        <Link to="/help" className="block mt-2 text-custom-black">Ayuda</Link>
                        <Link to="/about" className="block mt-2 text-custom-black">Acerca de nosotros</Link>
                        <Link to="/contact" className="block mt-2 text-custom-black">Contacto</Link>
                    </div>
                    <div>
                        <h3 className="text-lg text-custom-black">Redes sociales</h3>
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="block mt-2 text-custom-black">Facebook</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="block mt-2 text-custom-black">Twitter</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="block mt-2 text-custom-black">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;