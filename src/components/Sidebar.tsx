import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, ChevronRight, ChevronDown, File, Folder, FolderOpen, ChevronLeft 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

// Sidebar data source (replace with your actual folder structure)
const folderData = {
  blog: { title: "Blog", path: "/content/blog" },
  resources: { title: "Resources", path: "/content/resources" },
  "faith-in-allah": { title: "Faith In Allah", path: "/content/faith-in-allah" },
  "faith-in-jesus": { title: "Faith In Jesus", path: "/content/faith-in-jesus" },
  "faith-in-mohammad": { title: "Faith In Mohammad", path: "/content/faith-in-mohammad" },
  home: { title: "Home", path: "/content/home" },
};

interface SidebarItemProps {
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarItemProps[];
  level?: number;
}

const SidebarItem = ({ title, path, icon, children, level = 0 }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;
  const hasChildren = children && children.length > 0;

  const folderIcon = hasChildren
    ? isOpen
      ? <FolderOpen size={20} />
      : <Folder size={20} />
    : <File size={20} />;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="mb-3">
      <button
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between py-2 px-3 rounded-md text-sm",
          "hover:bg-primary/10 hover:text-primary transition-colors duration-200",
          isActive && "text-primary font-medium"
        )}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        <span className="flex items-center gap-2">
          {folderIcon}
          <span>{title}</span>
        </span>
        {hasChildren && (
          <span>
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </span>
        )}
      </button>
      {isOpen && hasChildren && (
        <div className="mt-1 pl-4 border-l border-sidebar-border ml-6">
          {children.map((child, idx) => (
            <SidebarItem key={idx} {...child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.documentElement.classList.add("sidebar-collapsed");
    } else {
      document.documentElement.classList.remove("sidebar-collapsed");
    }
  };

  const sidebarItems = Object.entries(folderData).map(([key, value]) => ({
    title: value.title,
    path: value.path,
  }));

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-md bg-background border hover:bg-muted transition-colors relative text-lg"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft size={28} /> : <Menu size={28} />}
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
          <a href="/" className="font-bold text-lg hover:text-primary transition-colors">
            Islam IsLIES
          </a>
        </div>

        <div className="p-2 overflow-y-auto h-[calc(100vh-280px)]">
          {sidebarItems.map((item, idx) => (
            <SidebarItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;