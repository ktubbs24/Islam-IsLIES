
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="grid-background" aria-hidden="true"></div>
      
      <Link to="/" className="mb-6 overflow-hidden rounded-full w-48 h-48 flex items-center justify-center logo-animate">
        <img 
          src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png" 
          alt="Islam IsLIES Logo" 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </Link>
      
      <h1 className="text-7xl font-bold mb-4">404</h1>
      
      <p className="text-xl mb-8">Page Not Found</p>
      
      <Link to="/">
        <Button 
          className="button-custom text-lg px-8 py-6" 
          size="lg"
        >
          <Home className="mr-2" size={20} />
          Home
        </Button>
      </Link>
      
      <style jsx>{`
        .logo-animate {
          transition: transform 0.5s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .logo-animate:hover {
          transform: translateY(-10px) rotateY(10deg);
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2), 0 0 20px rgba(var(--primary-rgb), 0.6);
        }
      `}</style>
    </div>
  );
};

export default NotFound;
