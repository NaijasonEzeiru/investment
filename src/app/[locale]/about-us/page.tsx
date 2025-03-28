import Footer from "@/components/footer";
import Header from "@/components/header";
import { Globe, Shield, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Page() {
  const t = useTranslations("AboutUs");
  return (
    <>
      <Header />
      <main className="py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          {t("about")}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center">
          {t("revolutionizing")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t("our-mission")}
            </h3>
            <p className="text-gray-600 mb-8">{t("create")}</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <Shield className="lucide lucide-globe w-8 h-8 text-blue-600 mr-3" />
                <span className="text-gray-900">{t("trusted")}</span>
              </div>
              <div className="flex items-center">
                <Globe className="lucide lucide-globe w-8 h-8 text-blue-600 mr-3" />
                <span className="text-gray-900">{t("global-reach")}</span>
              </div>
              <div className="flex items-center">
                <Users className="lucide lucide-globe w-8 h-8 text-blue-600 mr-3" />
                <span className="text-gray-900">{t("community-driven")}</span>
              </div>
              <div className="flex items-center">
                <Zap className="lucide lucide-globe w-8 h-8 text-blue-600 mr-3" />
                <span className="text-gray-900">{t("fast")}</span>
              </div>
            </div>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
            alt="Team collaboration"
            className="rounded-lg shadow-lg w-full h-full"
            width={576}
            height={432}
          />
        </div>
        <div className="bg-gray-50 rounded-2xl p-12 mb-24">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t("impact")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">{t("hotels-rated")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15K+</div>
              <div className="text-gray-600">{t("NFTs-listed")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <div className="text-gray-600">{t("remote-workers")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$2M+</div>
              <div className="text-gray-600">{t("paid-to-workers")}</div>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {t("join-us")}
        </h3>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">{t("a-rater")}</button>
          <button className="btn-secondary border-gray-300">
            {t("partner")}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
