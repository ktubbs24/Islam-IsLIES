import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // Convert wiki-style links [[text]] to markdown links [text](text)
  const processContent = (content: string) => {
    return content.replace(/\[\[(.*?)\]\]/g, (_, text) => {
      const linkTarget = text.toLowerCase().replace(/\s+/g, '-');
      return `[${text}](/${linkTarget})`;
    });
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          a: ({ node, href, children, ...props }) => {
            // Check if it's an external link
            const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');

            if (isExternal) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              );
            } else if (href) {
              return (
                <Link to={href} {...props}>
                  {children}
                </Link>
              );
            } else {
              return <span {...props}>{children}</span>;
            }
          },
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !props.inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img: ({ node, src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="rounded-md max-w-full h-auto"
              {...props}
            />
          ),
          table: ({ node, children, ...props }) => (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ node, children, ...props }) => (
            <th className="px-3 py-3.5 text-left text-sm font-semibold bg-muted" {...props}>
              {children}
            </th>
          ),
          td: ({ node, children, ...props }) => (
            <td className="px-3 py-4 text-sm border-t border-gray-200 dark:border-gray-700" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {processContent(content)}
      </ReactMarkdown>

      <style>
        {`
        .markdown-content h1 {
          @apply text-3xl font-bold mb-6 mt-4;
        }

        .markdown-content h2 {
          @apply text-2xl font-semibold mb-4 mt-6;
        }

        .markdown-content h3 {
          @apply text-xl font-semibold mb-3 mt-5;
        }

        .markdown-content h4 {
          @apply text-lg font-medium mb-2 mt-4;
        }

        .markdown-content p {
          @apply mb-4 leading-relaxed;
        }

        .markdown-content ul {
          @apply list-disc pl-6 mb-4;
        }

        .markdown-content ol {
          @apply list-decimal pl-6 mb-4;
        }

        .markdown-content li {
          @apply mb-2;
        }

        .markdown-content a {
          @apply text-primary hover:underline transition-colors;
        }

        .markdown-content blockquote {
          @apply border-l-4 border-primary pl-4 italic my-4;
        }

        .markdown-content pre {
          @apply mb-4;
        }

        .markdown-content code {
          @apply bg-muted px-1 py-0.5 rounded;
        }

        .markdown-content hr {
          @apply my-6 border-t border-gray-300 dark:border-gray-700;
        }

        .markdown-content img {
          @apply my-4 mx-auto;
        }
      `}
      </style>
    </div>
  );
};

export default MarkdownRenderer;