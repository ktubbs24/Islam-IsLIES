
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface SlidingPaneProps {
  url: string;
  title: string;
  index: number;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
}

const SlidingPane: React.FC<SlidingPaneProps> = ({ 
  url, 
  title, 
  index, 
  onClose, 
  onFocus,
  zIndex 
}) => {
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (paneRef.current && paneRef.current.contains(e.target as Node)) {
        onFocus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onFocus]);

  return (
    <div 
      ref={paneRef}
      className="sliding-pane" 
      style={{ 
        left: `${index * 50}%`,
        zIndex: zIndex,
      }}
    >
      <div className="pane-title-bar">
        <button className="close-pane" onClick={onClose}>
          <X size={16} />
        </button>
        <div className="vertical-title">{title}</div>
      </div>
      <iframe src={url} title={title} />
    </div>
  );
};

export default SlidingPane;
