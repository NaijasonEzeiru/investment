import Link from "next/link";
import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CuratedHub</h3>
            <p className="text-gray-400">{t("revolution")}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("platform")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  {t("hotels")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  {t("NFTs")}
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white">
                  {t("remote")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about-us" className="hover:text-white">
                  {t("about")}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  {t("blog")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  {t("privacy")}
                </a>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 CuratedHub. {t("rights")}.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
