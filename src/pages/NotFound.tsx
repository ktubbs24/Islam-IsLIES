
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const logoElement = e.currentTarget.querySelector('img');
    if (logoElement) {
      logoElement.classList.add('logo-glow-animation');
      setTimeout(() => {
        logoElement.classList.remove('logo-glow-animation');
        navigate('/');
      }, 500);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 max-w-md w-full mx-auto text-center">
        <div className="flex justify-center mb-6">
          <a 
            href="/"
            className="logo-container logo-hover-glow block rounded-full overflow-hidden" 
            onClick={handleLogoClick}
          >
            <img 
              src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png"
              alt="Islam IsLIES Logo"
              className="w-48 h-48 object-cover logo-image"
              loading="lazy"
            />
          </a>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found (404)</h1>
        <p className="mb-6">The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline" className="button-custom">
            Go Back
          </Button>
          <Link to="/">
            <Button className="w-full btn-3d">
              <Home className="mr-2 h-4 w-4" /> Return to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .logo-glow-animation {
          animation: logoPulseGlow 0.5s ease-in-out;
        }
        
        .logo-hover-glow:hover {
          filter: drop-shadow(0 0 15px rgba(45, 166, 95, 0.7));
        }
        
        .logo-image:hover {
          filter: drop-shadow(0 0 15px rgba(45, 166, 95, 0.8));
        }
        
        @keyframes logoPulseGlow {
          0% {
            filter: drop-shadow(0 0 0 rgba(45, 166, 95, 0));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(45, 166, 95, 0.8));
            transform: scale(1.1);
          }
          100% {
            filter: drop-shadow(0 0 0 rgba(45, 166, 95, 0));
            transform: scale(1);
          }
        }
      `}} />
    </div>
  );
};

export default NotFound;
