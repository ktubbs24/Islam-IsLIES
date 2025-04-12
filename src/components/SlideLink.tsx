
import React from 'react';
import { Link } from 'react-router-dom';
import { useSlidingPanes } from '@/hooks/use-sliding-panes';

interface SlideLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const SlideLink: React.FC<SlideLinkProps> = ({ to, children, className = '', title }) => {
  const { openPane, isMobile } = useSlidingPanes();
  
  const displayTitle = title || (typeof children === 'string' ? children : 'Linked Page');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile()) {
      window.location.href = to;
    } else {
      openPane(to, displayTitle);
    }
  };

  return (
    <Link
      to={to}
      className={`slide-link ${className}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default SlideLink;
