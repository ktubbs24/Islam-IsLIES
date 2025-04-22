
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const NotFound = () => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <style>
        {`
          .logo-animation {
            transition: transform 0.5s ease, filter 0.5s ease;
          }
          .logo-animation:hover {
            transform: scale(1.05) rotate(2deg);
            filter: drop-shadow(0 0 15px rgba(45, 166, 95, 0.8));
          }
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% {
              transform: scale(1);
              filter: drop-shadow(0 0 5px rgba(45, 166, 95, 0.5));
            }
            50% {
              transform: scale(1.05);
              filter: drop-shadow(0 0 20px rgba(45, 166, 95, 0.8));
            }
            100% {
              transform: scale(1);
              filter: drop-shadow(0 0 5px rgba(45, 166, 95, 0.5));
            }
          }
        `}
      </style>

      <Link to="/" className="mb-6">
        <img 
          src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png"
          alt="Islam IsLIES Logo"
          className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover logo-animation"
          onMouseOver={(e) => e.currentTarget.classList.add('pulse-animation')}
          onMouseOut={(e) => e.currentTarget.classList.remove('pulse-animation')}
        />
      </Link>
      
      <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
      
      <p className="text-xl mb-8 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <Button 
          className="btn-3d px-8 py-4 text-lg"
          onClick={() => {
            const audio = new Audio('/download-sound.mp3');
            audio.volume = 0.2;
            audio.play().catch(e => console.log('Audio play error:', e));
          }}
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
