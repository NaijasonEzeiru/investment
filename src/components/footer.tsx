import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CuratedHub</h3>
            <p className="text-gray-400">
              Revolutionizing ratings across industries
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  NFTs
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white">
                  Remote Work
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about-us" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 CuratedHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
