
import { Facebook, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; 2025 Islam IsLIES. All rights reserved.
        </p>
        
        <div className="flex items-center gap-4 md:order-3">
          <a 
            href="https://youtube.com/@islamislies?feature=shared" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="YouTube Channel"
          >
            <Youtube size={20} />
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=61555664879743&name=xhp_nt__fb__action__open_user" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook Page"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://open.substack.com/pub/islamislies?r=3ve08u&utm_medium=ios" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Substack Newsletter"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 3h17v3.5h-17V3zm0 7h17v3.5h-17V10zm0 7h17v3.5h-17V17z" fill="currentColor" />
            </svg>
          </a>
        </div>

        <div className="md:order-2">
          <a 
            href="https://islamislies.substack.com/" 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-primary/80 hover:bg-primary text-primary-foreground px-3 py-1.5 rounded text-sm transition-colors"
          >
            <Mail size={16} />
            Want to hear when I publish new work?
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
