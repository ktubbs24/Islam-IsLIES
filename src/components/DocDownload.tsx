
import { useState, useRef, useEffect } from "react";
import { Download, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface DocDownloadProps {
  documentTitle: string;
  contentId: string;
}

const DocDownload = ({ documentTitle, contentId }: DocDownloadProps) => {
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element on mount
  useEffect(() => {
    audioRef.current = new Audio("/download-sound.mp3");
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  const handleDownload = (format: string) => {
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Error playing sound:", err));
    }
    
    // Show notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    
    // Simulate download (in a real app, replace this with actual download logic)
    const content = document.getElementById(contentId)?.innerText || "Content not found";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentTitle.replace(/\s+/g, "-").toLowerCase()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      {showNotification && (
        <div className="absolute -top-12 right-1/2 transform translate-x-1/2 bg-background border border-border shadow-lg rounded-md px-4 py-2 z-10 animate-float flex items-center">
          <Check className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm">Free to download, no need for credit.</span>
        </div>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleDownload("md")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Markdown (.md)</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload("txt")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Text (.txt)</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload("docx")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Word (.docx)</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload("pdf")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>PDF (.pdf)</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DocDownload;
