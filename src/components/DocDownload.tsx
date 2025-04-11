
import { useState, useRef } from "react";
import { FileDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocDownloadProps {
  documentTitle: string;
  contentId: string;
}

const DocDownload = ({ documentTitle, contentId }: DocDownloadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDownload = (format: string) => {
    // In a real app, these would generate actual document downloads
    // For now, we'll just simulate it and show the notification
    
    console.log(`Downloading ${documentTitle} as ${format}`);
    
    // Play sound effect
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Show notification
    setDownloadMessage(true);
    setTimeout(() => {
      setDownloadMessage(false);
    }, 3000);
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <audio ref={audioRef} src="/download-sound.mp3" preload="auto" />
      
      <button 
        onClick={toggleDropdown}
        className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 text-sm font-medium"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FileDown size={18} />
        Download
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-0 mt-[-120px] w-40 rounded-md shadow-lg bg-card border z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {["Markdown (.md)", "Text (.txt)", "PDF (.pdf)", "Word (.docx)"].map((format) => (
              <button
                key={format}
                onClick={() => handleDownload(format)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-muted"
                role="menuitem"
              >
                {format}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Download notification */}
      {downloadMessage && (
        <div className="fixed bottom-10 right-1/2 transform translate-x-1/2 animate-float z-50">
          <div className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full shadow-lg">
            Free to download, no need for credit.
          </div>
        </div>
      )}
    </div>
  );
};

export default DocDownload;
