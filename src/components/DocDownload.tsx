
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

export interface DocDownloadProps {
  documentTitle: string;
  content?: string;
  contentId?: string;
}

const DocDownload: React.FC<DocDownloadProps> = ({ documentTitle, content, contentId }) => {
  const handleDownload = () => {
    try {
      // Use either provided content or find by contentId
      let downloadContent = content;
      
      if (!downloadContent && contentId) {
        // Logic to retrieve content by ID if needed
        downloadContent = `Content for ${contentId}`; 
      }
      
      if (!downloadContent) {
        throw new Error('No content available for download');
      }

      const blob = new Blob([downloadContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${documentTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: `${documentTitle} is being downloaded as Markdown.`
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the document.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1 text-xs" 
      onClick={handleDownload}
    >
      <Download className="h-3 w-3" />
      <span>Download</span>
    </Button>
  );
};

export default DocDownload;
