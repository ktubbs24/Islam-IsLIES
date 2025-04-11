
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubscribeEmbed = () => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  // Instead of trying to modify the iframe content directly (which causes cross-origin errors),
  // we'll just set the iframe src with the right parameters and background color
  const iframeSrc = `https://islamislies.substack.com/embed${theme === 'dark' ? '?background=1a1a1a&text=ffffff' : ''}`;

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <p className="mb-4 text-muted-foreground">
            Get the latest updates from Islam IsLIES directly to your inbox. We'll send you new content, responses to common questions, and more.
          </p>
          <a 
            href="https://islamislies.substack.com/"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Want to hear when I publish new work?
            </Button>
          </a>
        </div>
        
        <div className="flex-1 overflow-hidden rounded-lg border">
          <iframe 
            src={iframeSrc}
            width="100%" 
            height="320" 
            style={{ 
              border: "none",
              background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
              borderRadius: '0.5rem'
            }} 
            title="Subscribe to Islam IsLIES"
            frameBorder="0" 
            scrolling="no"
            onLoad={() => setIsLoaded(true)}
            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribeEmbed;
