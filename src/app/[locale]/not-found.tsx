import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <PageLayout title={t("title")}>
      <p className="max-w-[460px]">{t("description")}</p>
    </PageLayout>
  );
}
