
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Facebook, Twitter, MessageSquare } from "lucide-react";

const QuoraIcon = () => (
  <svg 
    className="social-icon" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    width="24"
    height="24"
  >
    <path d="M12.004 3C7.138 3 3 7.036 3 12c0 4.963 4.038 9 8.902 9 .199 0 .4-.006.6-.019 1.286-1.275 2.248-2.814 2.8-4.531-.288.058-.585.088-.886.088-1.82 0-3.253-1.416-3.253-3.273a3.25 3.25 0 0 1 1.023-2.583 3.25 3.25 0 0 1 2.389-1.017c1.023 0 1.954.391 2.656 1.035.705.644 1.137 1.535 1.137 2.523 0 .493-.1 1.006-.297 1.526-.644 1.784-2.103 3.352-4.05 4.522.49.1.995.15 1.505.15 4.864 0 8.807-4.037 8.807-9S16.776 3 11.9 3h.104Z"/>
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
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm group transition-colors text-center"
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

        <a href="/" className="mt-3 hover:opacity-80 transition-opacity logo-container logo-hover-glow" onClick={handleLogoClick}>
          <img 
            src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png"
            alt="Islam IsLIES Logo"
            className="w-20 h-20 rounded-full object-cover"
            loading="lazy"
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
        
        .logo-hover-glow {
          transition: all 0.3s ease;
        }
        
        .logo-hover-glow:hover {
          filter: drop-shadow(0 0 10px rgba(45, 166, 95, 0.7));
          transform: translateY(-3px);
        }
        
        .logo-container {
          position: relative;
          display: inline-block;
          overflow: hidden;
          border-radius: 50%;
        }
        `}
      </style>
    </footer>
  );
};

export default Footer;
