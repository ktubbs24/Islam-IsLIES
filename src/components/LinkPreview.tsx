
import React, { useState, useEffect } from 'react';

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
}

const LinkPreview = ({ href, children }: LinkPreviewProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);

  const handleMouseEnter = async (e: React.MouseEvent) => {
    // Only proceed if it's an internal link
    if (href.startsWith('/')) {
      setShowPreview(true);
      setLoading(true);
      setPreviewPosition({
        x: e.clientX + 20,
        y: e.clientY + 20,
      });

      try {
        // In a real implementation, you'd fetch the content of the target page
        // For demo purposes, we'll just simulate a fetch with a timeout
        setTimeout(() => {
          const route = href.substring(1); // Remove leading slash
          const title = route.charAt(0).toUpperCase() + route.slice(1).replace(/-/g, ' ');
          
          setPreviewContent(`
            <div>
              <h3 class="text-lg font-medium mb-2">${title}</h3>
              <p class="text-sm text-muted-foreground">Preview of the content from ${title} page...</p>
              <p class="text-sm mt-2">This is a placeholder for actual content that would be fetched from the page.</p>
            </div>
          `);
          setLoading(false);
        }, 300);
      } catch (error) {
        console.error("Error fetching preview content:", error);
        setPreviewContent("<p>Failed to load preview</p>");
        setLoading(false);
      }
    }
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    setPreviewContent(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showPreview) {
      // Update position based on mouse movement with a bit of offset
      let x = e.clientX + 20;
      
      // Prevent preview from going off screen to the right
      const viewportWidth = window.innerWidth;
      const previewWidth = 300; // Approximate width of preview
      if (x + previewWidth > viewportWidth) {
        x = e.clientX - previewWidth - 20;
      }

      setPreviewPosition({
        x: x,
        y: e.clientY + 20,
      });
    }
  };

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="inline-block relative"
      >
        {children}
      </span>

      {showPreview && (
        <div
          className="fixed z-50 bg-card border rounded-md shadow-lg p-4 w-[300px] max-h-[200px] overflow-auto"
          style={{
            left: `${previewPosition.x}px`,
            top: `${previewPosition.y}px`,
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-[100px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: previewContent || '' }} />
          )}
        </div>
      )}
    </>
  );
};

export default LinkPreview;
