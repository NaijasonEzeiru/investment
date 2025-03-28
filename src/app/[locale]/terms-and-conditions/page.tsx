import { useTranslations } from "next-intl";

import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  const t = useTranslations("Settings");
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 mb-20 bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          {t("terms")}
        </h1>
        <h3 className="text-lg font-semibold">1. {t("hotel-booking")}</h3>
        <p>1.1 {t("minimum-deposit")}</p>
        <p>1.2 {t("after-completing")}</p>
        <h3 className="text-lg font-semibold">2. {t("withdrawals")}</h3>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">2.1 {t("withdrawal-limits")}:</h5>
          <li>
            <span className="font-medium">VIP1 {t("users")}: </span>{" "}
            {t("5,000")} USDT
          </li>
          <li>
            <span className="font-medium">VIP2 {t("users")}: </span>{" "}
            {t("50,000")} USDT
          </li>
          <li>
            <span className="font-medium">VIP4 {t("users")}: </span>
            {t("no-upper")}
          </li>
        </ul>
        <p>2.2 {t("full-withdrawal")}</p>
        <p>2.3 {t("permitted")}</p>
        <p>2.4 {t("withdrawal-application")}</p>
        <h3 className="text-lg font-semibold">3. {t("funds")}</h3>
        <p>3.1 {t("securely-stored")}</p>
        <p>3.2 {t("processed-automatically")}</p>
        <p>3.3 {t("full-responsibility")}</p>
        <h3 className="text-lg font-semibold">4. {t("account-security")}</h3>
        <p>4.1 {t("workbench-account")}</p>
        <p>4.2 {t("password-disclosure")}</p>
        <p>4.3 {t("passwords")}</p>
        <p>4.4 {t("password-reset")}</p>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">4.5 {t("confidentiality-agreement")}:</h5>
          <li>{t("real-time-data")}</li>
          <li>{t("platform-security")}</li>
        </ul>
        <h3 className="text-lg font-semibold">5. {t("orders")}</h3>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">5.1 {t("completed-optimizations")}:</h5>
          <li>
            <span className="font-medium">VIP1 {t("users")}: </span> 0.5% per{" "}
            {t("per-optimization")}
          </li>
          <li>
            <span className="font-medium">VIP2 {t("users")}: </span> 0.6% per{" "}
            {t("per-optimization")}
          </li>
          <li>
            <span className="font-medium">VIP3 {t("users")}: </span> 0.8% per{" "}
            {t("per-optimization")}
          </li>
          <li>
            <span className="font-medium">VIP4 {t("users")}: </span> 1% per{" "}
            {t("per-optimization")}
          </li>
        </ul>
        <p>5.2 {t("credited-immediately")}</p>
        <p>5.3 {t("user-performance")}</p>
        <p>5.4 {t("once-assigned")}</p>
        <p>5.5 {t("protect-user")}</p>
        <h3 className="text-lg font-semibold">6. {t("lucky-orders")}</h3>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">6.2 {t("completed-lucky")}:</h5>
          <li>
            <span className="font-medium">VIP1 {t("users")}: </span> 5%{" "}
            {t("income")}
          </li>
          <li>
            <span className="font-medium">VIP2 {t("users")}: </span> 6%{" "}
            {t("income")}
          </li>
          <li>
            <span className="font-medium">VIP3 {t("users")}: </span> 8%{" "}
            {t("income")}
          </li>
          <li>
            <span className="font-medium">VIP4 {t("users")}: </span> 10%{" "}
            {t("income")}
          </li>
        </ul>
        <p>6.3 {t("optimization-process")}</p>
        <p>6.4 {t("recharge-amounts")}</p>
        <p>6.5 {t("cannot-be-canceled")}</p>
        <h3 className="text-lg font-semibold">7. {t("deposits")}</h3>
        <p>7.1 {t("own-deposit")}</p>
        <p>7.2 {t("balance-displayed")}</p>
        <p>7.3 {t("correct-wallet")}</p>
        <p>7.4 {t("wrong-wallet")}</p>
        <h3 className="text-lg font-semibold">8. {t("merchants")}</h3>
        <p>8.1 {t("every-minute")}</p>
        <p>8.2 {t("merchant-reputation")}</p>
        <p>8.3 {t("client-provides")}</p>
        <h3 className="text-lg font-semibold">9. {t("invitations")}</h3>
        <p>9.1 {t("upgrade-to-VIP3")}</p>
        <p>9.2 {t("completed-all")}</p>
        <p>9.3 {t("consecutive-days")}</p>
        <p>9.4 {t("referral-commission")}</p>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">10. {t("operation-hours")}</h5>
          <li>
            <span className="font-medium">
              {t("platform-operation-hours")}:{" "}
            </span>
            10:00 – 21:59
          </li>
          <li>
            <span className="font-medium">{t("service-hours")}: </span> 10:00 –
            21:59
          </li>
          <li>
            <span className="font-medium">{t("processing-time")}: </span> 10:00
            – 21:59
          </li>
        </ul>
        <h3 className="text-lg font-semibold">11. {t("credit-value")}</h3>
        <p>11.1 {t("credit-deductions")}</p>
        <p>11.2 {t("100%-credit")}</p>
        <h2 className="text-center text-2xl font-semibold pt-7">
          {t("task-rules")}
        </h2>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">1. {t("deposit-method")}</h5>
          <li>{t("extensive-information")}</li>
          <li>{t("transaction-slip")}</li>
          <li> {t("payee’s-name")}</li>
          <li>{t("issues-arise")}</li>
        </ul>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">2. {t("hotel-reservation")}</h5>
          <li>{t("market-fluctuations")}</li>
          <li>{t("assigned-randomly")}</li>
          <li>{t("increased-returns")}</li>
          <li>{t("high-value-orders")}</li>
        </ul>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">3. {t("withdrawal")}</h5>
          <li>
            {t("available")}{" "}
            <span className="font-semibold">10:00 - 21:59</span>.
          </li>
        </ul>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">4. {t("platform-user-mode")}</h5>
          <li>
            {t("invite-new")}{" "}
            <span className="font-semibold">
              120% {t("referral-Commission")}
            </span>
          </li>
        </ul>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">5. {t("operation-hours")}</h5>
          <li>
            {t("platform’s-operation-hours")}{" "}
            <span className="font-semibold">{t("daily")}</span>.
          </li>
        </ul>
        <h3 className="text-lg font-semibold">{t("note")}:</h3>
        <p>{t("further-assistance")}</p>
      </main>
      <Footer />
    </>
  );
}
