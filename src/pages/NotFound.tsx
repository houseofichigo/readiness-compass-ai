import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { t } from "@/i18n";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 errors only in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('not_found.title')}</h1>
        <p className="text-xl text-gray-600 mb-4">{t('not_found.message')}</p>
        <a
          href="/"
          aria-label={t('not_found.return_home')}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          {t('not_found.return_home')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
