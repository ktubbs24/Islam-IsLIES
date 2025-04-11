
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarItemProps[];
  level?: number;
}

const sidebarItems: SidebarItemProps[] = [
  {
    title: "Getting Started",
    path: "/getting-started",
    icon: <File size={18} />,
  },
  {
    title: "Biblical Truths",
    path: "",
    icon: <Folder size={18} />,
    children: [
      {
        title: "Jesus & Divinity",
        path: "/biblical-truths/jesus-divinity",
        icon: <File size={18} />,
      },
      {
        title: "Jesus Doesn't Deny Himself",
        path: "/biblical-truths/jesus-doesnt-deny-himself",
        icon: <File size={18} />,
      },
      {
        title: "Scripture Analysis",
        path: "/biblical-truths/scripture-analysis",
        icon: <File size={18} />,
      }
    ]
  },
  {
    title: "Comparative Studies",
    path: "",
    icon: <Folder size={18} />,
    children: [
      {
        title: "Bible vs Quran",
        path: "/comparative-studies/bible-vs-quran",
        icon: <File size={18} />,
      }
    ]
  },
  {
    title: "Recent Updates",
    path: "/recent-updates",
    icon: <File size={18} />,
  },
  {
    title: "About",
    path: "/about",
    icon: <File size={18} />,
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
    (isOpen ? <FolderOpen size={18} /> : <Folder size={18} />) : 
    icon;

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between py-2 px-3 rounded-md text-sm",
            "hover:bg-muted transition-colors duration-200",
            isChildActive && "text-primary font-medium"
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
          <div className="mt-1">
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
        "flex items-center py-2 px-3 rounded-md text-sm mb-1",
        "hover:bg-muted transition-colors duration-200",
        isActive && "bg-primary/10 text-primary font-medium"
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
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-background border hover:bg-muted transition-colors relative"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
          
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
          "fixed top-0 left-0 bottom-0 z-40 w-64 bg-sidebar border-r",
          "sidebar-transition overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Islam IsLIES</h2>
          <ThemeToggle />
        </div>
        
        <div className="p-2 overflow-y-auto h-[calc(100vh-60px)]">
          {sidebarItems.map((item, idx) => (
            <SidebarItem key={idx} {...item} />
          ))}
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
