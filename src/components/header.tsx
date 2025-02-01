import Link from "next/link";

function Header() {
  return (
    <header className="fixed w-full bg-white backdrop-blur-sm z-40 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer">
            <span className="text-2xl font-bold text-blue-900">CuratedHub</span>
          </div>
          <div className="flex items-center space-x-8">
            <button className="text-gray-600 hover:text-gray-900 ">
              Hotels
            </button>
            <button className="text-gray-600 hover:text-gray-900 ">NFTs</button>
            <button className="text-gray-600 hover:text-gray-900 ">Work</button>
            <button className="text-gray-600 hover:text-gray-900 ">
              About
            </button>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
