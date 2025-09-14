import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-6 mb-2">
        {t("errors.notFound.title")}
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        {t("errors.notFound.message")}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/")}>{t("common.backToHome")}</Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          {t("common.goBack")}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
