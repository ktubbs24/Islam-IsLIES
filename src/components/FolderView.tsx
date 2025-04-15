
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentItem {
  id: string;
  title: string;
  path: string;
  description?: string;
  date?: string;
  coverImage?: string;
}

interface FolderViewProps {
  title: string;
  description?: string;
  documents: DocumentItem[];
}

const FolderView: React.FC<FolderViewProps> = ({ title, description, documents }) => {
  // Sort by newest first if dates are available
  const sortedDocs = [...documents].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const recentDocs = sortedDocs.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight custom-link">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Recent documents */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentDocs.map((doc) => (
            <Link 
              key={doc.id}
              to={doc.path}
              className={cn(
                "flex flex-col group rounded-lg border border-border p-4 hover:border-primary transition-all",
                "hover:shadow-md hover:-translate-y-1"
              )}
            >
              {doc.coverImage && (
                <div className="relative h-32 mb-4 overflow-hidden rounded-md">
                  <img 
                    src={doc.coverImage} 
                    alt={doc.title} 
                    className="object-cover w-full h-full transition-transform group-hover:scale-105" 
                  />
                </div>
              )}
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{doc.title}</h3>
              {doc.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{doc.description}</p>
              )}
              {doc.date && (
                <div className="mt-auto pt-4 flex items-center text-xs text-muted-foreground">
                  <Calendar size={14} className="mr-1" />
                  {new Date(doc.date).toLocaleDateString()}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* All documents */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Documents</h2>
        <div className="border rounded-lg divide-y">
          {sortedDocs.map((doc) => (
            <Link 
              key={doc.id}
              to={doc.path}
              className="flex items-start p-4 hover:bg-muted transition-colors"
            >
              <div className="flex-shrink-0 mr-4">
                <FileText className="text-muted-foreground" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium hover:text-primary transition-colors">{doc.title}</h3>
                {doc.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{doc.description}</p>
                )}
              </div>
              {doc.date && (
                <div className="flex-shrink-0 ml-2 text-xs text-muted-foreground flex items-center">
                  <Calendar size={14} className="mr-1 inline" />
                  {new Date(doc.date).toLocaleDateString()}
                </div>
              )}
              <div className="flex-shrink-0 ml-4">
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderView;
