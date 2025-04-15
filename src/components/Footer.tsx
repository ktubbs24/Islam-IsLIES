
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Facebook } from "lucide-react";

const Footer = () => {
  const [showGospelMessage, setShowGospelMessage] = useState(false);
  
  return (
    <footer className="border-t py-8 md:py-10 bg-background">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="mb-3">
          <a 
            href="https://islamislies.substack.com/" 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
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
          <button
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm group transition-colors"
            onMouseEnter={() => setShowGospelMessage(true)}
            onMouseLeave={() => setShowGospelMessage(false)}
            onClick={() => setShowGospelMessage(true)}
          >
            <Heart 
              size={16} 
              className="text-red-500 drop-shadow-md heart-beat heart-drip group-hover:scale-110 transition-transform" 
            />
            Made in love by Kwenela by the One who is Love
          </button>
          
          {showGospelMessage && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 p-4 bg-red-500 text-white rounded-md shadow-lg z-50 animate-float">
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
        
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="flex items-center gap-4">
            <a 
              href="https://facebook.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 hover:scale-110 transition-transform" />
              <span className="block text-xs mt-1">Facebook</span>
            </a>
            
            <a 
              href="https://islamislies.substack.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Substack"
            >
              <svg 
                className="w-5 h-5 hover:scale-110 transition-transform" 
                viewBox="0 0 25 25" 
                fill="currentColor"
              >
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24H22.54V10.812H1.46zM22.539 1H1.46v2.836h21.08V1z" />
              </svg>
              <span className="block text-xs mt-1">Substack</span>
            </a>
            
            <a 
              href="https://x.com/realKwenelaT" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter/X"
            >
              <svg 
                className="w-5 h-5 hover:scale-110 transition-transform" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M13.73 11.152l5.964-7.152h-1.399l-5.186 6.205-4.149-6.205h-4.733l6.271 9.364-6.271 7.496h1.399l5.494-6.55 4.391 6.55h4.733l-6.514-9.708zm-3.291 1.08l-.637-.922-5.097-7.344h2.656l4.116 5.926.636.922 5.361 7.744h-2.656l-4.379-6.326z" />
              </svg>
              <span className="block text-xs mt-1">Twitter</span>
            </a>
            
            <a 
              href="https://www.threads.net/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Threads"
            >
              <svg 
                className="w-5 h-5 hover:scale-110 transition-transform" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M15.907 0h1.686v6.945C15.846 6.776 13.747 6.518 12 6.518c-3.333 0-6.222 1.924-6.222 5.539v3.375c0 3.614 2.889 5.538 6.222 5.538 1.748 0 3.85-.258 5.593-.428V24H15.907V7.559h4.111V6.28H15.907V0zM12 19.688c-2.438 0-4.537-1.487-4.537-4.258v-3.374c0-2.771 2.099-4.258 4.537-4.258 1.543 0 3.658.223 5.593.4V20.09c-1.938.176-4.051.399-5.593.399V19.688zM0 10.22h11.392v1.28H0v-1.28zm0 4.258h9.195v1.28H0v-1.28z" />
              </svg>
              <span className="block text-xs mt-1">Threads</span>
            </a>
            
            <a 
              href="https://www.tiktok.com/@realkwenelat" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="TikTok"
            >
              <svg 
                className="w-5 h-5 hover:scale-110 transition-transform" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298.002.595.042.88.12V9.4a6.17 6.17 0 0 0-1-.08A6.29 6.29 0 0 0 0 15.62a6.29 6.29 0 0 0 10.86 4.33 6.33 6.33 0 0 0 1.8-4.42V7.62a8.16 8.16 0 0 0 6.93 2.15V6.69a4.85 4.85 0 0 1-1.84.12z" />
              </svg>
              <span className="block text-xs mt-1">TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
