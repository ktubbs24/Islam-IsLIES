
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ChevronRight, ChevronDown, File, Folder, FolderOpen, Mail, ChevronLeft,
  Home, Cross, Flame, XOctagon, BookOpen, Facebook, Twitter, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

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

const sidebarItems: SidebarItemProps[] = [
  {
    title: "Home",
    path: "/home",
    icon: <Home size={18} />,
    isTopLevel: true,
    children: [
      {
        title: "Welcome",
        path: "/getting-started",
        icon: <File size={18} />,
      },
      {
        title: "The Gospel",
        path: "/gospel",
        icon: <File size={18} />,
      },
      {
        title: "About",
        path: "/about",
        icon: <File size={18} />,
      },
      {
        title: "Newsletter",
        path: "/newsletter",
        icon: <File size={18} />,
      },
      {
        title: "Recent Updates",
        path: "/recent-updates",
        icon: <File size={18} />,
      },
      {
        title: "Support",
        path: "/support",
        icon: <File size={18} />,
      }
    ]
  },
  {
    title: "Blog",
    path: "/blog",
    icon: <Folder size={18} />,
    isTopLevel: true,
    children: [
      {
        title: "Latest Articles",
        path: "/blog/latest",
        icon: <File size={18} />,
      },
      {
        title: "Featured Posts",
        path: "/blog/featured",
        icon: <File size={18} />,
      },
      {
        title: "Categories",
        path: "/blog/categories",
        icon: <Folder size={18} />,
      },
      {
        title: "Archives",
        path: "/blog/archives",
        icon: <Folder size={18} />,
      }
    ]
  },
  {
    title: "Faith in Jesus leads to Salvation",
    path: "/faith-in-jesus-to-salvation",
    icon: <Cross size={18} />,
    isTopLevel: true,
    children: [
      {
        title: "Jesus",
        path: "/jesus",
        icon: <Folder size={18} />,
      },
      {
        title: "Works",
        path: "/works",
        icon: <Folder size={18} />,
      },
      {
        title: "Sheep",
        path: "/sheep",
        icon: <Folder size={18} />,
      },
      {
        title: "Salvation",
        path: "/salvation",
        icon: <Folder size={18} />,
      },
      {
        title: "Scriptures",
        path: "/scriptures",
        icon: <Folder size={18} />,
      }
    ]
  },
  {
    title: "Faith in Mohammad leads to Damnation",
    path: "",
    icon: <Flame size={18} />,
    children: [
      {
        title: "Islam",
        path: "/islam",
        icon: <Folder size={18} />,
      },
      {
        title: "The Quran",
        path: "/quran",
        icon: <Folder size={18} />,
      },
      {
        title: "The Shahada",
        path: "/shahada",
        icon: <Folder size={18} />,
      },
      {
        title: "Mohammad",
        path: "/mohammad",
        icon: <Folder size={18} />,
      }
    ]
  },
  {
    title: "Faith in Allah leads to lies",
    path: "",
    icon: <XOctagon size={18} />,
    children: [
      {
        title: "Allah",
        path: "/allah",
        icon: <Folder size={18} />,
      },
      {
        title: "Satan",
        path: "/satan",
        icon: <Folder size={18} />,
      },
      {
        title: "False Prophets/Teachers",
        path: "/false-prophets",
        icon: <Folder size={18} />,
      }
    ]
  },
  {
    title: "Resources",
    path: "",
    icon: <BookOpen size={18} />,
    children: [
      {
        title: "FAQ",
        path: "/faq",
        icon: <File size={18} />,
      },
      {
        title: "The Bible",
        path: "/bible",
        icon: <Folder size={18} />,
      },
      {
        title: "Types of \"Christians\" to Avoid",
        path: "/christians-to-avoid",
        icon: <Folder size={18} />,
      },
      {
        title: "Common Questions Muslims Ask About Jesus",
        path: "/common-questions",
        icon: <Folder size={18} />,
      },
      {
        title: "Believe in Jesus Christ NOT Christianity",
        path: "/jesus-not-christianity",
        icon: <Folder size={18} />,
      },
      {
        title: "What Can I Do Now To Become Christian",
        path: "/become-christian",
        icon: <Folder size={18} />,
      }
    ]
  }
];

const SidebarItem = ({ title, path, icon, children, level = 0, isTopLevel = false }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
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
    if (isTopLevel && path) {
      // For top-level folders with paths, we'll let the link navigation happen
      // and not toggle the folder open/close state
      return;
    }
    
    // For all other folders, toggle the open/close state
    setIsOpen(!isOpen);
  };

  if (hasChildren) {
    return (
      <div className="mb-3">
        {isTopLevel && path ? (
          <div className="flex flex-col">
            <Link
              to={path}
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
            </Link>
            
            <button
              onClick={handleClick}
              className={cn(
                "flex w-full items-center justify-between py-2 px-3 rounded-md text-sm",
                "hover:bg-primary/10 hover:text-primary transition-colors duration-200",
                "mt-1"
              )}
              style={{ paddingLeft: `${level * 12 + 20}px` }}
            >
              <span className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Subpages</span>
              </span>
              {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        ) : (
          <button
            onClick={handleClick}
            className={cn(
              "flex w-full items-center justify-between py-2 px-3 rounded-md text-sm",
              "hover:bg-primary/10 hover:text-primary transition-colors duration-200",
              isChildActive && "text-primary font-medium"
            )}
            style={{ paddingLeft: `${level * 12 + 12}px` }}
          >
            <span className="flex items-center gap-2">
              {folderIcon}
              <span className="font-bold">{title}</span>
            </span>
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        )}
        
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
    <Link
      to={path}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm mb-1.5",
        "hover:bg-primary/10 hover:text-primary transition-colors duration-200",
        isActive ? "bg-primary/10 text-primary font-medium" : "text-sidebar-foreground"
      )}
      style={{ paddingLeft: `${level * 12 + 12}px` }}
    >
      <span className="flex items-center gap-2">
        {folderIcon}
        {title}
      </span>
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
    
    // Add class to document to track sidebar state for content width
    if (newState) {
      document.documentElement.classList.remove('sidebar-collapsed');
    } else {
      document.documentElement.classList.add('sidebar-collapsed');
    }
    
    // Call the onToggle callback if provided
    if (onToggle) {
      onToggle(newState);
    }
    
    // Also dispatch a custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent('sidebar-toggle', { 
        detail: { isOpen: newState } 
      })
    );
  };

  // Initialize sidebar width class on mount
  useEffect(() => {
    if (!isOpen) {
      document.documentElement.classList.add('sidebar-collapsed');
    }
    
    // Call the onToggle callback initially
    if (onToggle) {
      onToggle(isOpen);
    }
    
    return () => {
      document.documentElement.classList.remove('sidebar-collapsed');
    };
  }, []);

  return (
    <>
      <div className="grid-background" aria-hidden="true"></div>
      
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-background border hover:bg-muted transition-colors relative"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          
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
          "scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent"
        )}
      >
        <div className="p-4 border-b flex flex-col justify-center items-center">
          <Link to="/" className="mb-2 overflow-hidden rounded-full w-24 h-24 flex items-center justify-center">
            <img 
              src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png" 
              alt="Islam IsLIES Logo" 
              className="w-full h-full object-cover"
            />
          </Link>
          <Link to="/" className="font-bold text-lg hover:text-primary transition-colors">Islam IsLIES</Link>
          
          <div className="flex gap-4 mt-3">
            <a 
              href="https://www.facebook.com/profile.php?id=61555664879743" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
              aria-label="Facebook"
            >
              <Facebook className="social-icon" />
            </a>
            <a 
              href="https://islamislies.substack.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
              aria-label="Substack"
            >
              <svg 
                className="social-icon" 
                viewBox="0 0 25 25" 
                fill="currentColor"
              >
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24H22.54V10.812H1.46zM22.539 1H1.46v2.836h21.08V1z" />
              </svg>
            </a>
            <a 
              href="https://x.com/realKwenelaT" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
              aria-label="Twitter"
            >
              <Twitter className="social-icon" />
            </a>
            <a 
              href="https://www.threads.net/@realkwenelat" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
              aria-label="Threads"
            >
              <MessageSquare className="social-icon" />
            </a>
            <a 
              href="https://www.tiktok.com/@realkwenelat" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
              aria-label="TikTok"
            >
              <svg 
                className="social-icon" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
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
        
        <div className="sticky bottom-0 left-0 right-0 border-t p-3 bg-sidebar">
          <a 
            href="https://islamislies.substack.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-3d flex items-center justify-center gap-2 text-sm text-primary-foreground hover:text-primary-foreground p-2 rounded-md"
            onClick={() => {
              const audio = new Audio('/download-sound.mp3');
              audio.volume = 0.2;
              audio.play().catch(e => console.log('Audio play error:', e));
            }}
          >
            <Mail size={16} />
            Subscribe to updates
          </a>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => toggleSidebar()}
        />
      )}
    </>
  );
};

export default Sidebar;
