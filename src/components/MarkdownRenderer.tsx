import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import remarkFootnotes from 'remark-footnotes';
import 'remark-footnotes/dist/styles.css';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  return (
    <div className="markdown-rendered">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkFootnotes]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = (className || '').match(/language-(?<lang>[\w-]+)/);
            return !inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                language={match.groups?.lang}
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
        }}
      >
        {markdown}
      </ReactMarkdown>
      <style>
        {`
    .markdown-rendered {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }
    
    .markdown-rendered img {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      margin: 1rem 0;
    }
    
    .markdown-rendered h1,
    .markdown-rendered h2,
    .markdown-rendered h3,
    .markdown-rendered h4,
    .markdown-rendered h5,
    .markdown-rendered h6 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
      line-height: 1.25;
    }
    
    .markdown-rendered h1 {
      font-size: 2rem;
    }
    
    .markdown-rendered h2 {
      font-size: 1.5rem;
    }
    
    .markdown-rendered h3 {
      font-size: 1.25rem;
    }
    
    .markdown-rendered p {
      margin: 1rem 0;
      line-height: 1.7;
    }
    
    .markdown-rendered a {
      color: var(--primary);
      text-decoration: underline;
      text-decoration-thickness: 0.1em;
      text-underline-offset: 0.1em;
      transition: all 0.2s ease;
    }
    
    .markdown-rendered a:hover {
      color: var(--primary-dark, #1a7f37);
    }
    
    .markdown-rendered ul,
    .markdown-rendered ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }
    
    .markdown-rendered li {
      margin: 0.5rem 0;
      line-height: 1.7;
    }
    
    .markdown-rendered blockquote {
      margin: 1.5rem 0;
      padding: 0.5rem 1rem;
      border-left: 3px solid var(--primary);
      background-color: var(--background-alt, #f6f8fa);
      font-style: italic;
      color: var(--muted-foreground);
    }
    
    .markdown-rendered code:not([class*="language-"]) {
      font-family: monospace;
      font-size: 0.9em;
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      background-color: var(--muted);
      color: var(--foreground);
    }
    
    .markdown-rendered pre {
      background-color: var(--background-alt, #f6f8fa);
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;
    }
    
    .markdown-rendered pre code {
      background-color: transparent;
      padding: 0;
      font-size: 0.9em;
      line-height: 1.5;
    }
    
    .markdown-rendered table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      overflow-x: auto;
      display: block;
    }
    
    .markdown-rendered table th,
    .markdown-rendered table td {
      padding: 0.75rem;
      text-align: left;
      border: 1px solid var(--border);
    }
    
    .markdown-rendered table th {
      background-color: var(--muted);
      font-weight: 600;
    }
    
    .markdown-rendered hr {
      margin: 2rem 0;
      border: 0;
      height: 1px;
      background-color: var(--border);
    }
    
    .markdown-rendered .footnotes {
      margin-top: 3rem;
      font-size: 0.9em;
      color: var(--muted-foreground);
      border-top: 1px solid var(--border);
      padding-top: 1rem;
    }
  `}
      </style>
    </div>
  );
};

export default MarkdownRenderer;
