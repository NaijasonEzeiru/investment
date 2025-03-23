import Footer from "@/components/footer";
import Header from "@/components/header";
import { Briefcase, Clock, DollarSign, Star } from "lucide-react";
// import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main className="py-40 bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Join Our Remote Workforce
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16">
          Flexible opportunities to earn while contributing to our rating
          ecosystem
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Hotel Quality Inspector
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Remote
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>$30-50/hour</span>
            </div>
            <p className="text-gray-600 mb-4">
              Evaluate hotel properties and provide detailed quality
              assessments.
            </p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Requirements:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  3+ years hospitality experience
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  Detail-oriented
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  Available weekends
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                NFT Art Curator
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Flexible
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>$25-40/hour</span>
            </div>
            <p className="text-gray-600 mb-4">
              Review and rate digital artworks, provide market insights.
            </p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Requirements:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  Art background
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  Crypto knowledge
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  Strong analytical skills
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Rating System Moderator
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Part-time
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>$20-35/hour</span>
            </div>
            <p className="text-gray-600 mb-4">
              Ensure rating quality and maintain platform standards.
            </p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Requirements:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  Previous moderation experience
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  Available weekdays
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
              <p>Work when it suits you best</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Competitive Pay</h3>
              <p>Earn based on your contributions</p>
            </div>
            <div className="text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Growth Opportunities
              </h3>
              <p>Advance your career with us</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
