import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import { useMarkdownContent } from "@/utils/markdownUtils";
import Breadcrumbs from "./Breadcrumbs";
import DocumentNavigation from "./DocumentNavigation";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";

const DocPage: React.FC = () => {
  const { folder, slug } = useParams<{ folder: string; slug: string }>();
  const navigate = useNavigate();

  // Determine the file path based on the folder and slug
  const filePath = `docs/${folder}/${slug}.md`;

  const { content, loading, error } = useMarkdownContent(filePath);

  // Scroll to top on page load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [folder, slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md mb-6 w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-3 w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-3 w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-3 w-5/6"></div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Content</h1>
        <p className="mb-4">We couldn't find the page you were looking for.</p>
        <Button onClick={() => navigate(-1)} variant="default">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Docs", path: "/docs" },
          { label: folder, path: `/docs/${folder}` },
          { label: slug, path: window.location.pathname },
        ]}
        className="mb-4"
      />

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-4">{content.frontmatter?.title || "Untitled"}</h1>

        {content.frontmatter?.date && (
          <div className="text-sm text-muted-foreground mb-6">
            <time dateTime={content.frontmatter.date}>
              Published: {new Date(content.frontmatter.date).toLocaleDateString()}
            </time>
          </div>
        )}

        <MarkdownRenderer content={content.content} />

        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => {
              const blob = new Blob([content.content], { type: "text/markdown" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${slug}.md`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Download
          </Button>
        </div>
      </article>

      <DocumentNavigation />
    </div>
  );
};

export default DocPage;