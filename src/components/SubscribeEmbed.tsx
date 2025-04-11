
import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

const SubscribeEmbed = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const updateIframeTheme = () => {
      if (iframeRef.current) {
        if (theme === 'dark') {
          iframeRef.current.style.background = '#222';
          iframeRef.current.style.border = '1px solid #333';
        } else {
          iframeRef.current.style.background = 'white';
          iframeRef.current.style.border = '1px solid #EEE';
        }
      }
    };
    
    updateIframeTheme();
  }, [theme]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4 text-center">Want to hear when I publish new work?</h3>
      <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
        <iframe 
          ref={iframeRef}
          src="https://islamislies.substack.com/embed" 
          width="100%" 
          height="320" 
          style={{ border: '1px solid #EEE', background: 'white' }}
          frameBorder="0" 
          scrolling="no"
          title="Islam IsLIES Newsletter Subscription"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default SubscribeEmbed;
