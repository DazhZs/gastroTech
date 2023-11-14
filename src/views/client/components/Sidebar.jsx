function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6">
            <h1 className="text-2xl mb-4">Menú</h1>
            <ul>
                <li className="mb-2">
                    <a href="#link1">Link 1</a>
                </li>
                <li className="mb-2">
                    <a href="#link2">Link 2</a>
                </li>
                <li className="mb-2">
                    <a href="#link3">Link 3</a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;