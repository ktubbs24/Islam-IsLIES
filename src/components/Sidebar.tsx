import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
        icon: <File size={18} />,
      },
      {
        title: "Archives",
        path: "/blog/archives",
        icon: <File size={18} />,
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
        icon: <File size={18} />,
      },
      {
        title: "Works",
        path: "/works",
        icon: <File size={18} />,
      },
      {
        title: "Sheep",
        path: "/sheep",
        icon: <File size={18} />,
      },
      {
        title: "Salvation",
        path: "/salvation",
        icon: <File size={18} />,
      },
      {
        title: "Scriptures",
        path: "/scriptures",
        icon: <File size={18} />,
      }
    ]
  },
  {
    title: "Faith in Mohammad leads to Damnation",
    path: "/faith-in-mohammad-leads-to-damnation",
    icon: <Flame size={18} />,
    children: [
      {
        title: "Islam",
        path: "/islam",
        icon: <File size={18} />,
      },
      {
        title: "The Quran",
        path: "/quran",
        icon: <File size={18} />,
      },
      {
        title: "The Shahada",
        path: "/shahada",
        icon: <File size={18} />,
      },
      {
        title: "Mohammad",
        path: "/mohammad",
        icon: <File size={18} />,
      },
      {
        title: "Islamic Salvation",
        path: "/islamic-salvation",
        icon: <File size={18} />,
      }
    ]
  },
  {
    title: "Faith in Allah leads to lies",
    path: "/faith-in-allah-leads-to-lies",
    icon: <XOctagon size={18} />,
    children: [
      {
        title: "Allah",
        path: "/allah",
        icon: <File size={18} />,
      },
      {
        title: "Satan",
        path: "/satan",
        icon: <File size={18} />,
      },
      {
        title: "False Prophets/Teachers",
        path: "/false-prophets",
        icon: <File size={18} />,
      },
      {
        title: "The Great Deception",
        path: "/deception",
        icon: <File size={18} />,
      },
      {
        title: "God vs. Allah: A Comparison",
        path: "/comparison-god-allah",
        icon: <File size={18} />,
      }
    ]
  },
  {
    title: "Resources",
    path: "/resources",
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
        icon: <File size={18} />,
      },
      {
        title: "Types of \"Christians\" to Avoid",
        path: "/christians-to-avoid",
        icon: <File size={18} />,
      },
      {
        title: "Common Questions Muslims Ask About Jesus",
        path: "/common-questions",
        icon: <File size={18} />,
      },
      {
        title: "Believe in Jesus Christ NOT Christianity",
        path: "/jesus-not-christianity",
        icon: <File size={18} />,
      },
      {
        title: "What Can I Do Now To Become Christian",
        path: "/become-christian",
        icon: <File size={18} />,
      }
    ]
  }
];

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
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  
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
            <a 
              href="https://islamislies.quora.com/?ch=17&oid=6637602&share=396067ef&srid=uFFvBu&target_type=tribe" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all"
              aria-label="Quora"
            >
              <img 
                src="https://th.bing.com/th/id/R.4eb102d3e2ad0b4f07bb9d236d91e2f1?rik=UCND94zHeXolWw&pid=ImgRaw&r=0"
                alt="Quora"
                className="social-icon w-6 h-6"
              />
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

      <style jsx>{`
        .logo-image {
          transition: filter 0.3s ease;
        }
        
        .logo-image:hover {
          filter: drop-shadow(0 0 15px rgba(45, 166, 95, 0.8));
        }
        
        .logo-container {
          transition: transform 0.3s ease;
        }
        
        .logo-container:hover {
          transform: translateY(-3px);
        }
        
        @keyframes logoPulseGlow {
          0% {
            filter: drop-shadow(0 0 0 rgba(45, 166, 95, 0));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(45, 166, 95, 0.8));
          }
          100% {
            filter: drop-shadow(0 0 0 rgba(45, 166, 95, 0));
          }
        }
        
        .logo-glow-animation {
          animation: logoPulseGlow 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
