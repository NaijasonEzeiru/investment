import { Briefcase, Link, Shield, Star } from "lucide-react";
import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Image from "next/image";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import HomeCard from "@/components/homeCard";
import HomeProducts from "@/components/homeProducts";
import TestimonialCard from "@/components/testimonialCard";
// import Image from "next/image";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("IndexPage");
  const keys = ["emmaWilliams", "sarahJohnson", "michaelChen"] as const;
  const futureKeys = [
    "rating",
    "blockchain",
    "earnings",
    "integration",
  ] as const;
  const futureSVGs = [
    <Star className="size-12 text-primary mb-6" key="rating" />,
    <Shield className="size-12 text-primary mb-6" key="blockchain" />,
    <Briefcase className="size-12 text-primary mb-6" key="earnings" />,
    <Link className="size-12 text-primary mb-6" key="integration" />,
  ] as const;

  return (
    <>
      <Header />
      <main className="">
        <Hero
          title={t("heroTitle")}
          desc={t("heroDescription")}
          completed={t("heroCompleted")}
          listed={t("heroRated")}
          rated={t("heroUsers")}
          started={t("heroStarted")}
          users={t("heroListed")}
        />
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("innovation")}
              </h2>
              <p className="text-xl text-gray-600">{t("experience")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {futureKeys.map((key, i) => (
                <HomeCard
                  key={key}
                  content={t(`${key}.content`)}
                  heading={t(`${key}.heading`)}
                >
                  {futureSVGs[i]}
                </HomeCard>
              ))}
            </div>
          </div>
        </section>
        <HomeProducts featured={t("featured")} />
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("trusted")}
              </h2>
              <p className="text-xl text-gray-600">{t("see")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {keys.map((key) => (
                <TestimonialCard
                  key={key}
                  content={t(`${key}.content`)}
                  name={t(`${key}.name`)}
                  position={t(`${key}.position`)}
                >
                  <Image
                    src={t(`${key}.imgSrc`)}
                    alt={t(`${key}.name`)}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                </TestimonialCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
