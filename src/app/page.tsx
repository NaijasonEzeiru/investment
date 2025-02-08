import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import HomeCard from "@/components/homeCard";
import HomeProducts from "@/components/homeProducts";
import TestimonialCard from "@/components/testimonialCard";
import { Briefcase, Link, Shield, Star } from "lucide-react";
import Image from "next/image";
// import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <Hero />
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Powered by Innovation
              </h2>
              <p className="text-xl text-gray-600">
                Experience the future of ratings and reviews
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <HomeCard
                content="Real-time, transparent rating system powered by verified users"
                heading="Dynamic Star Rating"
              >
                <Star className="size-12 text-blue-600 mb-6" />
              </HomeCard>
              <HomeCard
                content="Immutable records and secure transactions for all ratings"
                heading="Blockchain Security"
              >
                <Shield className="size-12 text-blue-600 mb-6" />
              </HomeCard>
              <HomeCard
                content="Earn rewards by contributing quality ratings and reviews"
                heading="Task-Based Earnings"
              >
                <Briefcase className="size-12 text-blue-600 mb-6" />
              </HomeCard>
              <HomeCard
                content="Seamlessly connect hotels and digital art marketplaces"
                heading="Industry Integration"
              >
                <Link className="size-12 text-blue-600 mb-6" />
              </HomeCard>
            </div>
          </div>
        </section>
        <HomeProducts />
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl text-gray-600">
                See what our users have to say about their experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                content="CuratedHub has transformed how we receive and manage guest feedback. The
        blockchain verification adds a layer of trust that sets us apart."
                name="Sarah Johnson"
                position="Hotel Owner"
              >
                {
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                }
              </TestimonialCard>
              <TestimonialCard
                content="CuratedHub has transformed how we receive and manage guest feedback. The
        blockchain verification adds a layer of trust that sets us apart."
                name="Sarah Johnson"
                position="Hotel Owner"
              >
                {
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                }
              </TestimonialCard>
              <TestimonialCard
                content="CuratedHub has transformed how we receive and manage guest feedback. The
        blockchain verification adds a layer of trust that sets us apart."
                name="Sarah Johnson"
                position="Hotel Owner"
              >
                {
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                }
              </TestimonialCard>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
