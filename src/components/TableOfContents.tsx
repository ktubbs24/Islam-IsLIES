
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Get all headings inside the article
    const content = document.querySelector(".doc-content");
    if (!content) return;
    
    const elements = Array.from(content.querySelectorAll("h2, h3, h4"));
    
    const items: TOCItem[] = elements
      .filter((el) => el.id) // Only elements with ID
      .map((el) => {
        const level = parseInt(el.tagName.substring(1));
        return {
          id: el.id,
          text: el.textContent || "",
          level,
        };
      });
    
    setHeadings(items);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );
    
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block sticky top-20 w-64 self-start pl-10">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">On this page</h4>
        <ul className="mt-2 text-sm space-y-2">
          {headings.map((heading, idx) => (
            <li 
              key={idx} 
              className={cn(
                heading.level === 2 ? "pl-0" : 
                heading.level === 3 ? "pl-4" : "pl-6"
              )}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  "toc-link block truncate",
                  activeId === heading.id && "active"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
