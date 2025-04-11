
import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal = ({ src, alt, onClose }: ImageModalProps) => {
  useEffect(() => {
    // Disable scrolling on body when modal is open
    document.body.style.overflow = "hidden";
    
    // Add keyboard event listener for Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    
    return () => {
      // Re-enable scrolling and remove listener when modal closes
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div 
      className="image-modal-overlay"
      onClick={onClose}
    >
      <img 
        src={src} 
        alt={alt} 
        className="image-modal-content"
        onClick={(e) => e.stopPropagation()}
      />
      <button 
        className="image-modal-close"
        onClick={onClose}
        aria-label="Close image"
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default ImageModal;
