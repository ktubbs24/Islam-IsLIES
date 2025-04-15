
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="grid-background opacity-10" aria-hidden="true"></div>
      
      <Link 
        to="/"
        className="mb-8 transform transition-transform hover:scale-110 hover:rotate-3 duration-300"
      >
        <img 
          src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png"
          alt="Truth Seeker Logo"
          className="w-48 h-48 rounded-full shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-shadow duration-300"
        />
      </Link>

      <h1 className="text-6xl md:text-7xl font-bold mb-4">404</h1>
      <p className="text-2xl text-muted-foreground mb-8">Page Not Found</p>
      
      <Button
        asChild
        className="btn-3d inline-flex items-center gap-2 px-6 py-3 text-lg"
      >
        <Link to="/">
          <Home className="w-5 h-5 mr-2" />
          Return Home
          <ChevronRight className="w-5 h-5 ml-1" />
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
