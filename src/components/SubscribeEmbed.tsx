
import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubscribeEmbed = () => {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Update iframe background based on theme
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        const bgColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
        iframeDoc.body.style.backgroundColor = bgColor;
      }
    }
  }, [theme]);

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
            ref={iframeRef}
            src="https://islamislies.substack.com/embed" 
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
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribeEmbed;
