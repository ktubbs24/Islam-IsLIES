
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Facebook, Twitter, MessageSquare } from "lucide-react";

const QuoraIcon = () => (
  <svg 
    className="social-icon" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M11.999 1C5.926 1 1 5.925 1 12c0 6.074 4.926 11 10.999 11 6.075 0 11.001-4.926 11.001-11 0-6.075-4.926-11-11.001-11zm7.473 17.15c-1.044-1.5-2.22-2.931-4.205-2.931-1.045 0-2.438.461-2.438 1.456v.785c-1.155.077-1.452-.153-1.878-1.177C13.937 11.996 11.999 12 11.999 12s-1.937-.004-2.973 4.283c-.425 1.023-.722 1.254-1.878 1.177v-.785c0-.995-1.392-1.456-2.438-1.456-1.984 0-3.161 1.431-4.205 2.931A8.71 8.71 0 0 1 2.264 12c0-5.391 4.344-9.734 9.735-9.734 5.392 0 9.736 4.343 9.736 9.734 0 2.868-1.242 5.44-3.212 7.227l-.051-.077z" />
    <path d="M14.412 10.567h-2.906v1.056h.556v.355c0 .674-.556.983-1.354.983-.796 0-1.354-.309-1.354-.983V9.33c0-.619.367-.983 1.354-.983s1.354.364 1.354.983v.364h1.893c-.06-1.591-1.436-2.545-3.247-2.545-1.893 0-3.339.954-3.339 2.727v2.177c0 1.774 1.446 2.727 3.339 2.727 1.81 0 3.187-.954 3.247-2.545v-1.668z" />
  </svg>
);

const Footer = () => {
  const [showGospelMessage, setShowGospelMessage] = useState(false);
  const navigate = useNavigate();
  const messageRef = useRef<HTMLDivElement>(null);
  
  const handleGospelClick = () => {
    setShowGospelMessage(true);
  };
  
  const handleMessageClick = () => {
    setShowGospelMessage(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (messageRef.current && !messageRef.current.contains(e.target as Node)) {
      setShowGospelMessage(false);
    }
  };
  
  useEffect(() => {
    if (showGospelMessage) {
      document.addEventListener('mousedown', handleOutsideClick);
      
      // If user changes route, hide the message
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [showGospelMessage]);

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
    <footer className="border-t py-12 md:py-16">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="mb-3">
          <a 
            href="https://islamislies.substack.com/" 
            target="_blank"
            rel="noopener noreferrer" 
            className="btn-3d inline-flex items-center gap-2 px-4 py-2 text-sm text-primary-foreground hover:text-primary-foreground"
            onClick={() => {
              const audio = new Audio('/download-sound.mp3');
              audio.volume = 0.2;
              audio.play().catch(e => console.log('Audio play error:', e));
            }}
          >
            <Mail className="w-4 h-4" />
            Want to hear when I publish new work?
          </a>
        </div>
        
        <p className="text-sm text-muted-foreground text-center mb-3">
          &copy; 2025 Islam IsLIES. All rights reserved.
        </p>
        
        <div className="relative flex items-center justify-center">
          <Link
            to="/gospel"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm group transition-colors"
            onMouseEnter={handleGospelClick}
            onClick={handleGospelClick}
          >
            <Heart 
              size={16} 
              className="text-red-500 drop-shadow-md heart-beat heart-drip group-hover:scale-110 transition-transform" 
            />
            Made in love by Kwenela by the One who is Love
          </Link>
          
          {showGospelMessage && (
            <div 
              ref={messageRef}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 p-4 bg-red-500 text-white rounded-md shadow-lg z-50 cursor-pointer"
              onClick={handleMessageClick}
            >
              <p className="text-sm">
                To love and to know the One who is love who made you:
                Believe that Jesus Christ died on the cross for the forgiveness of our sins, was buried in the tomb for 3 days, but after the third day He rose from the grave and is now at the Right Hand of the Father in Heaven.
              </p>
            </div>
          )}
        </div>

        <a href="/" className="mt-3 hover:opacity-80 transition-opacity logo-container" onClick={handleLogoClick}>
          <img 
            src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png"
            alt="Islam IsLIES Logo"
            className="w-16 h-16 rounded-full object-cover"
          />
        </a>
        
        <div className="flex flex-col items-center gap-4 mt-2">
          <div className="flex items-center justify-center flex-wrap gap-6">
            <div className="social-icon-wrapper">
              <a 
                href="https://www.facebook.com/profile.php?id=61555664879743" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="social-icon" />
                <span className="social-icon-name">Facebook</span>
              </a>
            </div>
            
            <div className="social-icon-wrapper">
              <a 
                href="https://islamislies.substack.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Substack"
              >
                <svg 
                  className="social-icon" 
                  viewBox="0 0 25 25" 
                  fill="currentColor"
                >
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24H22.54V10.812H1.46zM22.539 1H1.46v2.836h21.08V1z" />
                </svg>
                <span className="social-icon-name">Substack</span>
              </a>
            </div>
            
            <div className="social-icon-wrapper">
              <a 
                href="https://x.com/realKwenelaT" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter/X"
              >
                <Twitter className="social-icon" />
                <span className="social-icon-name">Twitter</span>
              </a>
            </div>
            
            <div className="social-icon-wrapper">
              <a 
                href="https://www.threads.net/@realkwenelat" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Threads"
              >
                <MessageSquare className="social-icon" />
                <span className="social-icon-name">Threads</span>
              </a>
            </div>
            
            <div className="social-icon-wrapper">
              <a 
                href="https://www.tiktok.com/@realkwenelat" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <svg 
                  className="social-icon" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                <span className="social-icon-name">TikTok</span>
              </a>
            </div>

            <div className="social-icon-wrapper">
              <a 
                href="https://islamislies.quora.com/?ch=17&oid=6637602&share=396067ef&srid=uFFvBu&target_type=tribe" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Quora"
              >
                <QuoraIcon />
                <span className="social-icon-name">Quora</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
        .logo-glow-animation {
          animation: logoPulseGlow 0.5s ease-in-out;
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
        `}
      </style>
    </footer>
  );
};

export default Footer;
