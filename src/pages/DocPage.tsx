
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Hash } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocDownload from "@/components/DocDownload";
import SubscribeEmbed from "@/components/SubscribeEmbed";

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
  prevPage
}: DocPageProps) => {
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Add IDs to headings for TOC
    const content = document.querySelector(".doc-content");
    if (content) {
      const headings = content.querySelectorAll("h2, h3, h4");
      headings.forEach((heading, index) => {
        const h = heading as HTMLElement;
        if (!h.id) {
          h.id = `heading-${index}`;
        }
        
        // Add anchor link to headings
        if (!h.querySelector('.anchor')) {
          const anchor = document.createElement('a');
          anchor.className = 'anchor';
          anchor.href = `#${h.id}`;
          anchor.innerHTML = `<span class="opacity-0 group-hover:opacity-100 ml-2"><Hash size={16} /></span>`;
          h.appendChild(anchor);
          h.classList.add('group');
        }
      });
    }
    
    // Handle wikilinks replacement
    document.querySelectorAll('.doc-content p, .doc-content li').forEach(el => {
      const content = el.innerHTML;
      const wikiLinkPattern = /\[\[(.*?)\]\]/g;
      
      const replacedContent = content.replace(wikiLinkPattern, (match, pageName) => {
        const path = `/${pageName.toLowerCase().replace(/\s+/g, '-')}`;
        return `<a href="${path}" class="custom-link slide-link">${pageName}</a>`;
      });
      
      if (content !== replacedContent) {
        el.innerHTML = replacedContent;
      }
    });
    
    // Attach sliding pane events
    const initSlidingPanes = () => {
      let paneStack: HTMLElement[] = [];

      const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      };

      document.querySelectorAll('a.slide-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const targetUrl = target.href;
          const pageTitle = target.textContent || '';

          if (isMobile()) {
            window.location.href = targetUrl;
          } else {
            const existingPane = document.querySelector('.sliding-pane');
            if (existingPane) {
              existingPane.remove();
            }
            
            const overlay = document.createElement('div');
            overlay.classList.add('sliding-pane-overlay');
            document.body.appendChild(overlay);

            const newPane = document.createElement('div');
            newPane.classList.add('sliding-pane');
            newPane.innerHTML = `
              <div class="pane-title-bar">
                <button class="close-pane">×</button>
                <div class="vertical-title">${pageTitle}</div>
              </div>
              <iframe src="${targetUrl}" title="${pageTitle}" style="flex-grow: 1;"></iframe>
            `;
            document.body.appendChild(newPane);

            setTimeout(() => {
              overlay.classList.add('is-open');
              newPane.classList.add('is-open');
            }, 10);

            newPane.querySelector('.close-pane')!.addEventListener('click', () => {
              overlay.classList.remove('is-open');
              newPane.classList.remove('is-open');
              
              setTimeout(() => {
                overlay.remove();
                newPane.remove();
              }, 300);
            });

            overlay.addEventListener('click', () => {
              overlay.classList.remove('is-open');
              newPane.classList.remove('is-open');
              
              setTimeout(() => {
                overlay.remove();
                newPane.remove();
              }, 300);
            });
          }
        });
        
        // Add hover preview
        link.addEventListener('mouseover', (e) => {
          const target = e.currentTarget as HTMLAnchorElement;
          const targetUrl = target.href;
          const existingPreview = document.querySelector('.preview-pane');
          
          if (existingPreview) {
            existingPreview.remove();
          }
          
          const preview = document.createElement('div');
          preview.classList.add('preview-pane');
          preview.innerHTML = `<iframe src="${targetUrl}" title="Preview"></iframe>`;
          document.body.appendChild(preview);

          // Position the preview near the mouse
          const event = e as MouseEvent;
          preview.style.left = `${event.clientX + 10}px`;
          preview.style.top = `${event.clientY + 10}px`;

          // Handle overflow
          const rect = preview.getBoundingClientRect();
          if (rect.right > window.innerWidth) {
            preview.style.left = `${event.clientX - rect.width - 10}px`;
          }
          if (rect.bottom > window.innerHeight) {
            preview.style.top = `${event.clientY - rect.height - 10}px`;
          }

          target.addEventListener('mouseout', function removePreview() {
            preview.remove();
            target.removeEventListener('mouseout', removePreview);
          });
        });
      });
    };
    
    // Initialize sliding panes
    setTimeout(initSlidingPanes, 500);
  }, [title]);

  // Adjust document width based on sidebar state
  useEffect(() => {
    const handleSidebarChange = () => {
      const documentContainer = document.querySelector('.doc-container');
      if (documentContainer) {
        if (document.documentElement.classList.contains('sidebar-collapsed')) {
          documentContainer.classList.add('sidebar-is-collapsed');
        } else {
          documentContainer.classList.remove('sidebar-is-collapsed');
        }
      }
    };

    // Run initially
    handleSidebarChange();
    
    // Create a mutation observer to watch for class changes on documentElement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleSidebarChange();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-full flex flex-col doc-container transition-all duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div className="flex-1 min-w-0 max-w-5xl">
          <Breadcrumbs title={title} />
          
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight custom-link">{title}</h1>
            
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
                  className="doc-image w-full max-h-[400px] object-cover rounded-lg"
                />
              </div>
            )}
            
            <article className="prose dark:prose-invert w-full doc-content">
              {children}
            </article>
            
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
            
            {/* GitBook-style navigation */}
            {(prevPage || nextPage) && (
              <div className="doc-navigation">
                {prevPage ? (
                  <Link 
                    to={prevPage.path} 
                    className="doc-navigation-link prev"
                  >
                    <ChevronLeft className="mr-2" />
                    <span>{prevPage.title}</span>
                  </Link>
                ) : <div />}
                
                {nextPage && (
                  <Link 
                    to={nextPage.path} 
                    className="doc-navigation-link next"
                  >
                    <span>{nextPage.title}</span>
                    <ChevronRight className="ml-2" />
                  </Link>
                )}
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <DocDownload documentTitle={title} contentId="doc-1" />
            </div>
            
            <div className="mt-8 py-8 border-t">
              <SubscribeEmbed />
            </div>
          </div>
        </div>
        
        <TableOfContents />
      </div>
    </div>
  );
};

export default DocPage;
