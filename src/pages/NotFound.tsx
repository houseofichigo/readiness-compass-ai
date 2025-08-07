import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // Track 404 route access for analytics
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">{t("errors.pageNotFound")}</p>
        <Button asChild variant="outline" className="flex items-center gap-2 mx-auto">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            {t("errors.goHome")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
