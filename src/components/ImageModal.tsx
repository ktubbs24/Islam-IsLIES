import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal = ({ src, alt, onClose }: ImageModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling on body when modal is open
    document.body.style.overflow = "hidden";

    // Add keyboard event listener for Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    // Focus on the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      // Re-enable scrolling and remove listener when modal closes
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close the modal on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous route
    onClose();
  };

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="image-modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
          aria-label="Close image"
        >
          <X size={24} />
        </button>
        <img
          src={src}
          alt={alt}
          className="rounded-md max-w-full h-auto mx-auto"
        />
      </div>
    </div>
  );
};

export default ImageModal;