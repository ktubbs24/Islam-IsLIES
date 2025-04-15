import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Facebook, Twitter, MessageSquare } from "lucide-react";

const Footer = () => {
  const [showGospelMessage, setShowGospelMessage] = useState(false);
  
  const handleGospelClick = () => {
    setShowGospelMessage(true);
  };
  
  useEffect(() => {
    let timer;
    if (showGospelMessage) {
      // Keep the message visible for 3-4 minutes
      timer = setTimeout(() => {
        setShowGospelMessage(false);
      }, 240000); // 4 minutes
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showGospelMessage]);
  
  return (
    <footer className="border-t py-8 md:py-10">
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
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 p-4 bg-red-500 text-white rounded-md shadow-lg z-50">
              <p className="text-sm">
                To love and to know the One who is love who made you:
                Believe that Jesus Christ died on the cross for the forgiveness of our sins, was buried in the tomb for 3 days, but after the third day He rose from the grave and is now at the Right Hand of the Father in Heaven.
              </p>
            </div>
          )}
        </div>

        <Link to="/" className="mt-3 hover:opacity-80 transition-opacity">
          <img 
            src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png"
            alt="Islam IsLIES Logo"
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>
        
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
