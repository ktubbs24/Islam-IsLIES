
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ChevronRight, ChevronDown, File, Folder, FolderOpen, Mail, ChevronLeft,
  Home, Cross, Flame, XOctagon, BookOpen, Facebook 
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SidebarItemProps {
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarItemProps[];
  level?: number;
}

const sidebarItems: SidebarItemProps[] = [
  {
    title: "Home",
    path: "/",
    icon: <Home size={18} className="sidebar-icon" />,
    children: [
      {
        title: "Welcome",
        path: "/getting-started",
        icon: <File size={18} className="sidebar-icon" />,
      },
      {
        title: "The Gospel",
        path: "/gospel",
        icon: <File size={18} className="sidebar-icon" />,
      },
      {
        title: "About",
        path: "/about",
        icon: <File size={18} className="sidebar-icon" />,
      },
      {
        title: "Blog",
        path: "/blog",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Newsletter",
        path: "/newsletter",
        icon: <File size={18} className="sidebar-icon" />,
      },
      {
        title: "Recent Updates",
        path: "/recent-updates",
        icon: <File size={18} className="sidebar-icon" />,
      },
      {
        title: "Support",
        path: "/support",
        icon: <File size={18} className="sidebar-icon" />,
      }
    ]
  },
  {
    title: "Faith in Jesus leads to Salvation",
    path: "",
    icon: <Cross size={18} className="sidebar-icon" />,
    children: [
      {
        title: "Jesus",
        path: "/jesus",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Works",
        path: "/works",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Sheep",
        path: "/sheep",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Salvation",
        path: "/salvation",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Scriptures",
        path: "/scriptures",
        icon: <Folder size={18} className="sidebar-icon" />,
      }
    ]
  },
  {
    title: "Faith in Mohammad leads to Damnation",
    path: "",
    icon: <Flame size={18} className="sidebar-icon" />,
    children: [
      {
        title: "Islam",
        path: "/islam",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "The Quran",
        path: "/quran",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "The Shahada",
        path: "/shahada",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Mohammad",
        path: "/mohammad",
        icon: <Folder size={18} className="sidebar-icon" />,
      }
    ]
  },
  {
    title: "Faith in Allah leads to lies",
    path: "",
    icon: <XOctagon size={18} className="sidebar-icon" />,
    children: [
      {
        title: "Allah",
        path: "/allah",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Satan",
        path: "/satan",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "False Prophets/Teachers",
        path: "/false-prophets",
        icon: <Folder size={18} className="sidebar-icon" />,
      }
    ]
  },
  {
    title: "Resources",
    path: "",
    icon: <BookOpen size={18} className="sidebar-icon" />,
    children: [
      {
        title: "FAQ",
        path: "/faq",
        icon: <File size={18} className="sidebar-icon" />,
      },
      {
        title: "The Bible",
        path: "/bible",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Types of \"Christians\" to Avoid",
        path: "/christians-to-avoid",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Common Questions Muslims Ask About Jesus",
        path: "/common-questions",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "Believe in Jesus Christ NOT Christianity",
        path: "/jesus-not-christianity",
        icon: <Folder size={18} className="sidebar-icon" />,
      },
      {
        title: "What Can I Do Now To Become Christian",
        path: "/become-christian",
        icon: <Folder size={18} className="sidebar-icon" />,
      }
    ]
  }
];

const SidebarItem = ({ title, path, icon, children, level = 0 }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === path;
  const hasChildren = children && children.length > 0;
  
  // Check if any child page is active
  const isChildActive = hasChildren && children?.some(
    child => location.pathname === child.path || 
    child.children?.some(grandchild => location.pathname === grandchild.path)
  );
  
  // Auto-expand if child is active
  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive, location.pathname]);
  
  // Update folder icon based on state
  const folderIcon = hasChildren ? 
    (isOpen ? <FolderOpen size={18} className="sidebar-icon" /> : <Folder size={18} className="sidebar-icon" />) : 
    icon;

  if (hasChildren) {
    return (
      <div className="mb-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between py-2 px-3 rounded-md text-sm",
            "hover:bg-sidebar-accent transition-colors duration-200",
            isChildActive && "text-sidebar-primary font-medium",
            "sidebar-folder" // Added class for folder styling
          )}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
        >
          <span className="flex items-center gap-2">
            {folderIcon}
            {title}
          </span>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
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
    <Link
      to={path}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm mb-1.5",
        "hover:bg-sidebar-accent transition-colors duration-200",
        isActive ? "bg-sidebar-primary/10 text-sidebar-primary font-medium" : "text-sidebar-foreground",
        "sidebar-doc" // Added class for document styling
      )}
      style={{ paddingLeft: `${level * 12 + 12}px` }}
    >
      <span className="flex items-center gap-2">
        {icon}
        {title}
      </span>
    </Link>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if user has seen the hint before
    const hasSeenHint = localStorage.getItem('sidebar-hint-seen');
    if (hasSeenHint) {
      setShowHint(false);
    } else {
      // Hide hint after 10 seconds
      const timer = setTimeout(() => {
        setShowHint(false);
        localStorage.setItem('sidebar-hint-seen', 'true');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (showHint) {
      setShowHint(false);
      localStorage.setItem('sidebar-hint-seen', 'true');
    }
  };

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
          
          {/* Hint arrow */}
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
          "fixed top-0 left-0 bottom-0 z-40 w-72 bg-sidebar border-r", // Increased width to 18rem (72)
          "sidebar-transition overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent"
        )}
        style={{ 
          background: `${
            document.documentElement.classList.contains('dark') ? 
            'linear-gradient(to bottom, hsl(var(--sidebar-background)), hsl(var(--sidebar-background)))' : 
            'linear-gradient(to bottom, #ffffff, #f1f1f1)'
          }`
        }}
      >
        <div className="p-4 border-b flex flex-col justify-center items-center">
          <Link to="/" className="mb-2 overflow-hidden rounded-full w-28 h-28 flex items-center justify-center"> {/* Increased logo size */}
            <img 
              src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png" 
              alt="Islam IsLIES Logo" 
              className="w-full h-full object-cover"
            />
          </Link>
          <Link to="/" className="font-bold text-lg hover:text-primary transition-colors">Islam IsLIES</Link>
          
          <div className="flex gap-5 mt-4"> {/* Increased gap and icon size */}
            <a 
              href="https://islamislies.substack.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
            >
              <svg 
                className="social-icon" 
                width="24" 
                height="24" 
                viewBox="0 0 25 25" 
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24H22.54V10.812H1.46zM22.539 1H1.46v2.836h21.08V1z" />
              </svg>
            </a>
            <a 
              href="https://x.com/realKwenelaT" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
            >
              <svg 
                className="social-icon" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <path d="M13.73 11.152l5.964-7.152h-1.399l-5.186 6.205-4.149-6.205h-4.733l6.271 9.364-6.271 7.496h1.399l5.494-6.55 4.391 6.55h4.733l-6.514-9.708zm-3.291 1.08l-.637-.922-5.097-7.344h2.656l4.116 5.926.636.922 5.361 7.744h-2.656l-4.379-6.326z" />
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
            >
              <Facebook className="social-icon" strokeWidth={1.5} />
            </a>
            <a 
              href="https://www.threads.net/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
            >
              <svg 
                className="social-icon" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <path d="M15.907 0h1.686v6.945C15.846 6.776 13.747 6.518 12 6.518c-3.333 0-6.222 1.924-6.222 5.539v3.375c0 3.614 2.889 5.538 6.222 5.538 1.748 0 3.85-.258 5.593-.428V24H15.907V7.559h4.111V6.28H15.907V0zM12 19.688c-2.438 0-4.537-1.487-4.537-4.258v-3.374c0-2.771 2.099-4.258 4.537-4.258 1.543 0 3.658.223 5.593.4V20.09c-1.938.176-4.051.399-5.593.399V19.688zM0 10.22h11.392v1.28H0v-1.28zm0 4.258h9.195v1.28H0v-1.28z" />
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@realkwenelat" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
            >
              <svg 
                className="social-icon" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298.002.595.042.88.12V9.4a6.17 6.17 0 0 0-1-.08A6.29 6.29 0 0 0 0 15.62a6.29 6.29 0 0 0 10.86 4.33 6.33 6.33 0 0 0 1.8-4.42V7.62a8.16 8.16 0 0 0 6.93 2.15V6.69a4.85 4.85 0 0 1-1.84.12z" />
              </svg>
            </a>
          </div>
          
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="p-2 overflow-y-auto h-[calc(100vh-280px)] scrollbar-thin">
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
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-3 rounded-md hover:bg-primary/90 transition-colors text-sm shadow-md shadow-primary/20 hover:shadow-lg border-b-2 border-primary-foreground/20 active:translate-y-0.5 active:shadow-sm"
            onClick={() => {
              const audio = new Audio('/download-sound.mp3');
              audio.volume = 0.2;
              audio.play().catch(e => console.log('Audio play error:', e));
            }}
          >
            <Mail size={16} />
            Want to hear when I publish new work?
          </a>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
