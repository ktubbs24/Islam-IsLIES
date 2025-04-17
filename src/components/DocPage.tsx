
import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight, ThumbsUp, Share2, ChevronDown, Hash, ArrowUp, Download } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import SubscribeEmbed from "@/components/SubscribeEmbed";
import ImageModal from "@/components/ImageModal";
import { Button } from "@/components/ui/button";
import DocumentNavigation from "@/components/DocumentNavigation";

interface DocPageProps {
  title: string;
  publishDate: string;
  updateDate?: string;
  children: React.ReactNode;
  imageSrc?: string;
  disclaimer?: string;
  tags?: string[];
  nextPage?: {
    title: string;
    path: string;
  };
  prevPage?: {
    title: string;
    path: string;
  };
  excludeNavigation?: boolean;
}

const DocPage = ({ 
  title, 
  publishDate, 
  updateDate, 
  children, 
  imageSrc, 
  disclaimer,
  tags = [],
  nextPage,
  prevPage,
  excludeNavigation = false
}: DocPageProps) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [headings, setHeadings] = useState<{id: string, text: string, level: number}[]>([]);
  const [showTocDropdown, setShowTocDropdown] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    setLiked(true);
    setTimeout(() => {
      setLiked(false);
    }, 3000);
  };

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDownload = () => {
    const content = contentRef.current;
    if (!content) return;
    
    // Generate PDF content
    let docContent = `# ${title}\n\n`;
    docContent += `Published: ${formattedDate(publishDate)}\n`;
    if (updateDate) docContent += `Last Updated: ${formattedDate(updateDate)}\n`;
    docContent += `\n${content.innerText}`;
    
    // Create a Blob with the content
    const blob = new Blob([docContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Add IDs to headings for TOC and extract headings
    const content = contentRef.current;
    if (content) {
      const headingElements = content.querySelectorAll("h2, h3, h4");
      const extractedHeadings: {id: string, text: string, level: number}[] = [];
      
      headingElements.forEach((heading, index) => {
        const h = heading as HTMLElement;
        const id = h.id || `heading-${index}`;
        h.id = id;
        
        // Add anchor link to heading if not already present
        if (!h.querySelector('.anchor')) {
          const anchor = document.createElement('a');
          anchor.href = `#${id}`;
          anchor.className = 'anchor';
          anchor.innerHTML = '<span class="opacity-0 group-hover:opacity-100 ml-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></span>';
          h.appendChild(anchor);
          h.classList.add('group');
        }
        
        // Extract heading data for TOC dropdown
        extractedHeadings.push({
          id,
          text: h.textContent?.replace('#', '').replace(h.querySelector('.anchor')?.textContent || '', '') || '',
          level: parseInt(h.tagName.charAt(1))
        });
      });
      
      setHeadings(extractedHeadings);
    }
    
    // Add scroll event listener for scroll-to-top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [title]);

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div className="flex-1 min-w-0 w-full">
          <Breadcrumbs title={title} />
          
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
              
              <div className="toc-dropdown">
                <button 
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted"
                  onClick={() => setShowTocDropdown(!showTocDropdown)}
                >
                  On this page <ChevronDown size={14} />
                </button>
                {showTocDropdown && (
                  <div className="toc-dropdown-content">
                    <ul className="space-y-1">
                      {headings.map((heading) => (
                        <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
                          <a 
                            href={`#${heading.id}`} 
                            className="toc-item"
                            onClick={() => setShowTocDropdown(false)}
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={publishDate}>
                  Published: {formattedDate(publishDate)}
                </time>
              </div>
              {updateDate && updateDate !== 'n/a' && (
                <div className="flex items-center gap-1">
                  <span>|</span>
                  <Calendar className="h-4 w-4" />
                  <time dateTime={updateDate}>
                    Updated: {formattedDate(updateDate)}
                  </time>
                </div>
              )}
            </div>
            
            {disclaimer && (
              <div className="bg-muted px-4 py-3 rounded-md text-sm italic">
                {disclaimer}
              </div>
            )}
            
            {imageSrc && (
              <div className="my-6">
                <img 
                  src={imageSrc} 
                  alt={`Cover image for ${title}`} 
                  className="doc-image w-full max-h-[400px] object-cover rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 hover:shadow-primary/20 cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                  loading="lazy"
                />
              </div>
            )}
            
            <article className="prose dark:prose-invert w-full doc-content" ref={contentRef}>
              {children}
            </article>
            
            <div className="mt-4 flex items-center justify-between">
              <button 
                className={`like-button ${liked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                <ThumbsUp size={20} />
                <span>Like</span>
                {liked && <span className="thank-you">Thank you!</span>}
              </button>
              
              <div className="social-share-container">
                <button 
                  className="social-share-button"
                  onClick={shareContent}
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
                <div className="social-share-dropdown">
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-share-item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.73 11.152l5.964-7.152h-1.399l-5.186 6.205-4.149-6.205h-4.733l6.271 9.364-6.271 7.496h1.399l5.494-6.55 4.391 6.55h4.733l-6.514-9.708zm-3.291 1.08l-.637-.922-5.097-7.344h2.656l4.116 5.926.636.922 5.361 7.744h-2.656l-4.379-6.326z" />
                    </svg>
                    <span>Share on X/Twitter</span>
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-share-item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                    </svg>
                    <span>Share on Facebook</span>
                  </a>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }}
                    className="social-share-item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy link</span>
                  </button>
                </div>
              </div>
            </div>
            
            {tags.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      to={`/tags/${tag.replace('#', '').replace('/', '-')}`}
                      className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium hover:bg-primary/10 hover:text-primary hover:shadow-sm hover:shadow-primary/20 transition-all"
                    >
                      {tag.replace('#', '')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {!excludeNavigation && (
              <div className="mt-8 pt-6 border-t">
                <DocumentNavigation excludeOn={['/gospel', '/support']} />
              </div>
            )}
            
            {/* Manual navigation for pages that provide prevPage and nextPage props */}
            {(prevPage || nextPage) && (
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {prevPage ? (
                    <Link 
                      to={prevPage.path} 
                      className="page-link-button group flex items-center gap-2 hover:bg-primary/10 transition-all rounded-lg py-2 px-4"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      <span>Previous: {prevPage.title}</span>
                    </Link>
                  ) : <div />}
                  
                  {nextPage && (
                    <Link 
                      to={nextPage.path} 
                      className="page-link-button group flex items-center gap-2 hover:bg-primary/10 transition-all rounded-lg py-2 px-4"
                    >
                      <span>Next: {nextPage.title}</span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleDownload} 
                className="download-button flex items-center gap-2 hover:bg-primary/10 transition-all"
                variant="outline"
              >
                <Download size={16} />
                <span>Download Document</span>
              </Button>
            </div>
            
            <div className="mt-8 py-8 border-t">
              <SubscribeEmbed />
            </div>
          </div>
        </div>
        
        <TableOfContents />
      </div>
      
      {/* Scroll to top button */}
      <button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
      
      {imageSrc && showImageModal && (
        <ImageModal 
          src={imageSrc}
          alt={title}
          onClose={() => setShowImageModal(false)}
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .like-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .like-button:hover {
          background: rgba(45, 166, 95, 0.1);
        }
        
        .like-button.liked {
          color: #2DA65F;
        }
        
        .thank-you {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: #2DA65F;
          color: white;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          opacity: 0;
          animation: fadeInOut 3s forwards;
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, 5px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -5px); }
        }
        
        .social-share-container {
          position: relative;
        }
        
        .social-share-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .social-share-button:hover {
          background: rgba(45, 166, 95, 0.1);
        }
        
        .social-share-dropdown {
          position: absolute;
          right: 0;
          top: 100%;
          width: 220px;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .social-share-container:hover .social-share-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(5px);
        }
        
        .social-share-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: inherit;
          transition: background 0.2s ease;
        }
        
        .social-share-item:hover {
          background: var(--accent);
        }
        
        .toc-dropdown {
          position: relative;
          display: inline-block;
        }
        
        .toc-dropdown-content {
          position: absolute;
          right: 0;
          top: 100%;
          width: 220px;
          max-height: 300px;
          overflow-y: auto;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
        
        .toc-item {
          display: block;
          padding: 0.4rem 0.6rem;
          font-size: 0.875rem;
          border-radius: 0.25rem;
          text-decoration: none;
          color: inherit;
          transition: background 0.2s ease;
        }
        
        .toc-item:hover {
          background: var(--accent);
        }
        
        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }
        
        .scroll-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .download-button {
          transition: all 0.3s ease;
        }
        
        .download-button:hover {
          box-shadow: 0 0 12px rgba(45, 166, 95, 0.5);
          transform: translateY(-2px);
        }
        
        /* Additional styling for markdown content */
        .doc-content h2,
        .doc-content h3,
        .doc-content h4 {
          scroll-margin-top: 100px;
          position: relative;
        }
        
        .doc-content .anchor {
          text-decoration: none;
          color: inherit;
        }
      ` }} />
    </div>
  );
};

export default DocPage;
