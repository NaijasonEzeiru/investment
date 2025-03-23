import Footer from "@/components/footer";
import Header from "@/components/header";
import { Briefcase, Clock, DollarSign, Star } from "lucide-react";
import { useTranslations } from "next-intl";
// import Image from "next/image";

export default function Home() {
  const t = useTranslations("Work");
  return (
    <>
      <Header />
      <main className="py-40 bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          {t("join")}
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16">
          {t("flexible-opportunities")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {t("inspector")}
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {t("remote")}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>$30-50/{t("hour")}</span>
            </div>
            <p className="text-gray-600 mb-4">{t("evaluate")}</p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {t("requirements")}:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  3+ {t("experience")}
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  {t("oriented")}
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  {t("available")}
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {t("curator")}
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {t("flexible")}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>$25-40/{t("hour")}</span>
            </div>
            <p className="text-gray-600 mb-4">{t("review-NFTs")}</p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {t("Requirements")}:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  {t("art-background")}
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  {t("crypto-knowledge")}
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  {t("analytical-skills")}
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {t("moderator")}
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {t("part-time")}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>$20-35/{t("hour")}</span>
            </div>
            <p className="text-gray-600 mb-4">{t("quality")}</p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {t("requirements")}:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  {t("prev-experience")}
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  {t("available-weekdays")}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("flexible-hours")}
              </h3>
              <p>{t("best")}</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("competitive-pay")}
              </h3>
              <p>{t("earn")}</p>
            </div>
            <div className="text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("growth")}</h3>
              <p>{t("advance")}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
