function Navbar() {
    return (
      <nav className="lg:h-20 w-screen bg-black-500 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-full"></div> {/* Logo */}
          <h1 className="text-white ml-2 text-lg font-bold content-center">SazonGrill</h1> {/* Business Name */}
        </div>
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div> {/* User Icon */}
      </nav>
    );
  }
  
  export default Navbar;