import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
          <Button variant="link" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
