import { useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();


  return (
    <>
      <SEO
        title="404 Not Found | House of Ichigo"
        description="Page not found on AI Readiness Assessment"
        canonical={typeof window !== 'undefined' ? window.location.href : 'https://www.ai.houseofichigo.com/404'}
        robots="noindex, nofollow"
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
