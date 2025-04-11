
import { Facebook, Youtube, Mail, Heart, Twitter } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [showGospelMessage, setShowGospelMessage] = useState(false);
  
  return (
    <footer className="border-t py-8 md:py-10">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="mb-3">
          <a 
            href="https://islamislies.substack.com/" 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 shadow-md hover:shadow-lg border-b-2 border-primary-foreground/20 active:translate-y-0.5 active:shadow-sm transition-all duration-150"
          >
            <Mail size={16} />
            Want to hear when I publish new work?
          </a>
        </div>
        
        <p className="text-sm text-muted-foreground text-center mb-3">
          &copy; 2025 Islam IsLIES. All rights reserved.
        </p>
        
        <div className="relative">
          <button
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm"
            onMouseEnter={() => setShowGospelMessage(true)}
            onMouseLeave={() => setShowGospelMessage(false)}
            onClick={() => setShowGospelMessage(!showGospelMessage)}
          >
            <Heart size={16} className="text-red-500 drop-shadow-md" />
            Written in love by Kwenela by the One who is Love
          </button>
          
          {showGospelMessage && (
            <div className="absolute bottom-full mb-2 w-72 md:w-96 p-4 bg-red-500 text-white rounded-md shadow-lg z-10 animate-float">
              <p className="text-sm">
                To love and to know the One who is love who made you:
                Believe that Jesus Christ died on the cross for the forgiveness of our sins, was buried in the tomb for 3 days, but after the third day He rose from the grave and is now at the Right Hand of the Father in Heaven.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <a 
            href="https://youtube.com/@islamislies?feature=shared" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="YouTube Channel"
          >
            <Youtube size={20} className="social-icon" />
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=61555664879743&name=xhp_nt__fb__action__open_user" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook Page"
          >
            <Facebook size={20} className="social-icon" />
          </a>
          <a 
            href="https://twitter.com/islamislies" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter Page"
          >
            <Twitter size={20} className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
