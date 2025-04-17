
import React from 'react';
import { MarkdownContent } from '../utils/markdownUtils';
import DocPage from '../components/DocPage';

interface MarkdownRendererProps {
  markdown: MarkdownContent;
  prevPage?: {
    title: string;
    path: string;
  };
  nextPage?: {
    title: string;
    path: string;
  };
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown, prevPage, nextPage }) => {
  const { frontMatter, content } = markdown;
  
  return (
    <DocPage
      title={frontMatter.title}
      publishDate={frontMatter.date}
      updateDate={frontMatter.updateDate}
      imageSrc={frontMatter.imageSrc}
      disclaimer={frontMatter.disclaimer}
      tags={frontMatter.tags}
      prevPage={prevPage}
      nextPage={nextPage}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} className="markdown-content" />
    </DocPage>
  );
};

export default MarkdownRenderer;
