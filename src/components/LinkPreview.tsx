import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface InternalLinkPreviewProps {
  to: string;
  children: React.ReactNode;
}

const InternalLinkPreview: React.FC<InternalLinkPreviewProps> = ({ to, children }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);

  const fetchPreviewData = async (path: string) => {
    setLoading(true);
    try {
      // Replace this with your actual API endpoint or data fetching logic
      const response = await fetch(`/api/preview?path=${path}`);
      if (response.ok) {
        const data = await response.json();
        setPreviewContent(data.summary || `<p>No preview available for ${path}</p>`);
      } else {
        setPreviewContent(`<p>Failed to load preview for ${path}</p>`);
        console.error("Failed to fetch preview:", response.status);
      }
    } catch (error) {
      setPreviewContent(`<p>Error loading preview for ${path}</p>`);
      console.error("Error fetching preview:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = async (e: React.MouseEvent) => {
    if (to.startsWith("/")) {
      setShowPreview(true);
      setPreviewPosition({
        x: e.clientX + 20,
        y: e.clientY + 20,
      });

      // Only fetch if we haven't already loaded it or if it's a new hover
      if (!previewContent && !loading) {
        fetchPreviewData(to);
      }
    }
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    setLoading(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showPreview) {
      let x = e.clientX + 20;
      const viewportWidth = window.innerWidth;
      const previewWidth = 300; // Adjust as needed
      if (x + previewWidth > viewportWidth) {
        x = e.clientX - previewWidth - 20;
      }
      setPreviewPosition({ x, y: e.clientY + 20 });
    }
  };

  return (
    <>
      <Link
        to={to}
        className="inline-block relative"
        aria-describedby="link-preview"
      >
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {children}
        </span>
      </Link>

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
            <div
              dangerouslySetInnerHTML={{
                __html: previewContent || "<p>No preview available</p>",
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default InternalLinkPreview;