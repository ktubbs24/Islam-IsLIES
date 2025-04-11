
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
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
      });
    }
  }, [title]);

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div className="flex-1 min-w-0 max-w-5xl">
          <Breadcrumbs title={title} />
          
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
            
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
                  className="doc-image w-full max-h-[400px] object-cover rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 hover:shadow-primary/20"
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
            
            {(prevPage || nextPage) && (
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  {prevPage ? (
                    <Link 
                      to={prevPage.path} 
                      className="flex items-center group text-sm"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      <span className="custom-link">Previous: {prevPage.title}</span>
                    </Link>
                  ) : <div />}
                  
                  {nextPage && (
                    <Link 
                      to={nextPage.path} 
                      className="flex items-center group text-sm"
                    >
                      <span className="custom-link">Next: {nextPage.title}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
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
