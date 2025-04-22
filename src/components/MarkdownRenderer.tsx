import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  // Convert wiki-style links [[text]] to markdown links [text](text)
  const processContent = (content: string) => {
    return content.replace(/\[\[(.*?)\]\]/g, (_, text) => {
      const linkTarget = text.toLowerCase().replace(/\s+/g, "-");
      return `[${text}](/content/${linkTarget})`; // Adjust path to match your app's routing
    });
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith("http") || href?.startsWith("mailto:");
            if (isExternal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors"
                  {...props}
                >
                  {children}
                </a>
              );
            } else if (href) {
              return (
                <Link
                  to={href}
                  className="text-primary hover:underline transition-colors"
                  {...props}
                >
                  {children}
                </Link>
              );
            } else {
              return <span {...props}>{children}</span>;
            }
          },
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            return !props.inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className={`bg-muted px-1 py-0.5 rounded ${className}`}
                {...props}
              >
                {children}
              </code>
            );
          },
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt || "Image"}
              loading="lazy"
              className="rounded-md max-w-full h-auto my-4 mx-auto"
              {...props}
            />
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-300 dark:divide-gray-700"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-3 py-3.5 text-left text-sm font-semibold bg-muted"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-3 py-4 text-sm border-t border-gray-200 dark:border-gray-700"
              {...props}
            >
              {children}
            </td>
          ),
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold mb-6 mt-4" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-semibold mb-4 mt-6" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-semibold mb-3 mt-5" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-lg font-medium mb-2 mt-4" {...props}>
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p className="mb-4 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 mb-4" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 mb-4" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="mb-2" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-primary pl-4 italic my-4"
              {...props}
            >
              {children}
            </blockquote>
          ),
          pre: ({ children, ...props }) => (
            <pre className="mb-4" {...props}>
              {children}
            </pre>
          ),
          hr: (props) => (
            <hr
              className="my-6 border-t border-gray-300 dark:border-gray-700"
              {...props}
            />
          ),
        }}
      >
        {processContent(content)}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;