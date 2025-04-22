import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, X, ChevronRight, ChevronDown, File, Folder, FolderOpen, Mail, ChevronLeft,
  Home, Cross, Flame, XOctagon, BookOpen, Facebook, Twitter, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { generateSidebarItems } from "./sidebar-auto-generator"; // Import the generator

interface SidebarItemProps {
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarItemProps[];
  level?: number;
  isTopLevel?: boolean;
}

interface SidebarProps {
  onToggle?: (isOpen: boolean) => void;
}

const QuoraIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="social-icon"
  >
    <path d="M11.999 1C5.926 1 1 5.925 1 12c0 6.074 4.926 11 10.999 11 6.075 0 11.001-4.926 11.001-11 0-6.075-4.926-11-11.001-11zm7.473 17.15c-1.044-1.5-2.22-2.931-4.205-2.931-1.045 0-2.438.461-2.438 1.456v.785c-1.155.077-1.452-.153-1.878-1.177C13.937 11.996 11.999 12 11.999 12s-1.937-.004-2.973 4.283c-.425 1.023-.722 1.254-1.878 1.177v-.785c0-.995-1.392-1.456-2.438-1.456-1.984 0-3.161 1.431-4.205 2.931A8.71 8.71 0 0 1 2.264 12c0-5.391 4.344-9.734 9.735-9.734 5.392 0 9.736 4.343 9.736 9.734 0 2.868-1.242 5.44-3.212 7.227l-.051-.077z" />
    <path d="M14.412 10.567h-2.906v1.056h.556v.355c0 .674-.556.983-1.354.983-.796 0-1.354-.309-1.354-.983V9.33c0-.619.367-.983 1.354-.983s1.354.364 1.354.983v.364h1.893c-.06-1.591-1.436-2.545-3.247-2.545-1.893 0-3.339.954-3.339 2.727v2.177c0 1.774 1.446 2.727 3.339 2.727 1.81 0 3.187-.954 3.247-2.545v-1.668z" />
  </svg>
);

const SidebarItem = ({ title, path, icon, children, level = 0, isTopLevel = false }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;
  const hasChildren = children && children.length > 0;
  
  const isChildActive = hasChildren && children?.some(
    child => location.pathname === child.path || 
    child.children?.some(grandchild => location.pathname === grandchild.path)
  );
  
  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive, location.pathname]);
  
  const folderIcon = hasChildren ? 
    (isOpen ? <FolderOpen size={20} /> : <Folder size={20} />) : 
    icon ? React.cloneElement(icon as React.ReactElement, { size: 20 }) : <File size={20} />;

  const handleClick = () => {
    if (hasChildren) {
      if (path) {
        navigate(path);
      } else {
        setIsOpen(!isOpen);
      }
    } else {
      navigate(path);
    }
    
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { isOpen: false } }));
      }, 300);
    }
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
      if (path) {
        navigate(path);
      }
    }
  };

  if (hasChildren) {
    return (
      <div className="mb-3 sidebar-item hover:translate-y-[-2px] transition-transform">
        <button
          onClick={handleClick}
          className={cn(
            "flex w-full items-center justify-between py-2 px-3 rounded-md text-sm",
            "hover:bg-primary/10 hover:text-primary transition-colors duration-200",
            (isActive || isChildActive) && "text-primary font-medium"
          )}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
        >
          <span className="flex items-center gap-2">
            {folderIcon}
            <span className="font-bold">{title}</span>
          </span>
          {hasChildren && (
            <span onClick={handleArrowClick}>
              {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </span>
          )}
        </button>
        
        {isOpen && (
          <div className="mt-1 pl-4 border-l border-sidebar-border ml-6">
            {children.map((child, idx) => (
              <SidebarItem
                key={idx}
                {...child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm mb-1.5 w-full text-left sidebar-item hover:translate-y-[-2px] transition-transform",
        "hover:bg-primary/10 hover:text-primary transition-colors duration-200",
        isActive ? "bg-primary/10 text-primary font-medium" : "text-sidebar-foreground"
      )}
      style={{ paddingLeft: `${level * 12 + 12}px` }}
    >
      <span className="flex items-center gap-2">
        {folderIcon}
        {title}
      </span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [sidebarItems, setSidebarItems] = useState<SidebarItemProps[]>([]);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load generated sidebar items
    const generatedItems = generateSidebarItems();
    setSidebarItems(generatedItems);

    const hasSeenHint = localStorage.getItem('sidebar-hint-seen');
    if (hasSeenHint) {
      setShowHint(false);
    } else {
      const timer = setTimeout(() => {
        setShowHint(false);
        localStorage.setItem('sidebar-hint-seen', 'true');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (showHint) {
      setShowHint(false);
      localStorage.setItem('sidebar-hint-seen', 'true');
    }
    
    if (newState) {
      document.documentElement.classList.remove('sidebar-collapsed');
    } else {
      document.documentElement.classList.add('sidebar-collapsed');
    }
    
    if (onToggle) {
      onToggle(newState);
    }
    
    window.dispatchEvent(
      new CustomEvent('sidebar-toggle', { 
        detail: { isOpen: newState } 
      })
    );
  };

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.classList.add('sidebar-collapsed');
    }
    
    if (onToggle) {
      onToggle(isOpen);
    }

    const handleCustomToggle = (event) => {
      if (event.detail && typeof event.detail.isOpen === 'boolean') {
        setIsOpen(event.detail.isOpen);
        
        if (!event.detail.isOpen) {
          document.documentElement.classList.add('sidebar-collapsed');
        } else {
          document.documentElement.classList.remove('sidebar-collapsed');
        }
      }
    };

    window.addEventListener('sidebar-toggle', handleCustomToggle);
    
    return () => {
      document.documentElement.classList.remove('sidebar-collapsed');
      window.removeEventListener('sidebar-toggle', handleCustomToggle);
    };
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    const logoElement = e.currentTarget.querySelector('img');
    if (logoElement) {
      logoElement.classList.add('logo-glow-animation');
      setTimeout(() => {
        logoElement.classList.remove('logo-glow-animation');
        navigate('/');
      }, 500);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className="grid-background" aria-hidden="true"></div>
      
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-md bg-background border hover:bg-muted transition-colors relative text-lg"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft size={28} /> : <Menu size={28} />}
          
          {showHint && !isOpen && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 flex items-center">
              <ChevronRight className="h-5 w-5 text-muted-foreground animate-pulse" />
              <span className="text-xs bg-muted-foreground/10 text-muted-foreground px-2 py-1 rounded">
                Menu
              </span>
            </div>
          )}
        </button>
      </div>
      
      <div 
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40 w-80 bg-sidebar border-r",
          "sidebar-transition overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent"
        )}
      >
        <div className="p-4 border-b flex flex-col justify-center items-center">
          <a href="/" className="mb-2 overflow-hidden rounded-full w-24 h-24 flex items-center justify-center logo-container" onClick={handleLogoClick}>
            <img 
              src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png" 
              alt="Islam IsLIES Logo" 
              className="w-full h-full object-cover logo-image"
              loading="lazy"
            />
          </a>
          <a href="/" className="font-bold text-lg hover:text-primary transition-colors" onClick={handleLogoClick}>Islam IsLIES</a>
          
          <div className="flex gap-4 mt-3">
            {/* Social icons remain unchanged */}
          </div>
        </div>
        
        <div className="p-2 overflow-y-auto h-[calc(100vh-280px)]">
          {sidebarItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <SidebarItem {...item} />
              {idx < sidebarItems.length - 1 && idx % 1 === 0 && (
                <div className="h-px bg-sidebar-border/50 my-4 mx-3"></div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Bottom section remains unchanged */}
      </div>
      
      {/* Rest of the component remains the same */}
    </>
  );
};

export default Sidebar;