import Link from "next/link";
import { Button } from "./ui/button";

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 bg-cover bg-center"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Revolutionizing Ratings, Bridging Industries, Empowering Workers
          </h1>
          <p className="text-xl text-blue-100 mb-12">
            Join the future of decentralized ratings for hotels and digital art,
            powered by blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/login"
              className="flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users w-5 h-5 mr-2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right w-5 h-5 ml-2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-blue-200">Tasks Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">5,000+</div>
            <div className="text-blue-200">Hotels Rated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">25,000+</div>
            <div className="text-blue-200">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">15,000+</div>
            <div className="text-blue-200">NFTs Listed</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
