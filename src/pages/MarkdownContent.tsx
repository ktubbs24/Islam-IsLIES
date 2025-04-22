
import React from 'react';
import DocPage from '@/components/DocPage';

const MarkdownContent = () => {
  return (
    <DocPage
      title="Writing Content in Markdown"
      publishDate="2025-04-16"
      updateDate="2025-04-17"
      tags={["documentation", "markdown", "workflow"]}
    >
      <div className="space-y-6">
        <h2 id="overview">Content Directory Structure</h2>
        <p>
          The website is configured to use Markdown files for all content. This approach separates content from presentation,
          making it easier to write, maintain, and update your documentation and blog posts.
        </p>
        
        <p>
          Content is organized into the following directory structure:
        </p>
        
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`content/
├── blog/
│   ├── post1.md
│   ├── post2.md
│   └── categories/
│       └── special-topic/
│           └── post3.md
└── docs/
    ├── biblical-truths/
    │   ├── jesus-divinity.md
    │   └── scripture-analysis.md
    ├── comparative-studies/
    │   └── bible-vs-quran.md
    └── getting-started.md
`}
        </pre>
        
        <h2 id="front-matter">Front Matter</h2>
        <p>
          Every Markdown file must begin with front matter, which is metadata about the content enclosed in triple dashes. 
          This metadata is used to generate the page title, URL, publication date, and other information.
        </p>
        
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`---
title: "Document Title Here"
date: "2025-04-16"
updateDate: "2025-04-17"  # Optional
excerpt: "A brief summary of the document"
author: "Author Name"  # Optional
slug: "/path-to-document"  # Optional, defaults to file path
imageSrc: "https://path.to/image.jpg"  # Optional
categories: ["category1", "category2"]  # Optional
tags: ["tag1", "tag2", "tag3"]  # Optional
disclaimer: "Optional disclaimer text"  # Optional
---`}
        </pre>
        
        <h3>Front Matter Fields</h3>
        <ul>
          <li><strong>title</strong> (required): The title of the document or blog post</li>
          <li><strong>date</strong> (required): The publication date in YYYY-MM-DD format</li>
          <li><strong>updateDate</strong> (optional): The last updated date in YYYY-MM-DD format</li>
          <li><strong>excerpt</strong> (optional): A brief summary that will be displayed in list views</li>
          <li><strong>author</strong> (optional): The author's name</li>
          <li><strong>slug</strong> (optional): The URL path for the document (defaults to the file path)</li>
          <li><strong>imageSrc</strong> (optional): URL to an image to be displayed at the top of the document</li>
          <li><strong>categories</strong> (optional): An array of categories the content belongs to</li>
          <li><strong>tags</strong> (optional): An array of tags related to the content</li>
          <li><strong>disclaimer</strong> (optional): A disclaimer text to be displayed below the title</li>
          <li><strong>featured</strong> (optional, boolean): For blog posts, whether the post should be featured</li>
        </ul>
        
        <h2 id="writing-content">Writing Content</h2>
        <p>
          After the front matter, write your content using standard Markdown syntax:
        </p>
        
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`# Heading 1

## Heading 2

### Heading 3

Normal paragraph text. **Bold text** and *italic text*.

- Bullet point list item 1
- Bullet point list item 2
  - Nested bullet point

1. Numbered list item 1
2. Numbered list item 2

[Link text](https://example.com)

![Image alt text](https://path.to/image.jpg)

> Blockquote text

\`\`\`javascript
// Code block
function example() {
  return "Hello, world!";
}
\`\`\`

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`}
        </pre>
        
        <h2 id="file-organization">File Organization</h2>
        <p>
          Organize your Markdown files in a way that reflects your desired URL structure:
        </p>
        
        <ul>
          <li><code>content/docs/getting-started.md</code> → <code>/getting-started</code></li>
          <li><code>content/docs/biblical-truths/jesus-divinity.md</code> → <code>/biblical-truths/jesus-divinity</code></li>
          <li><code>content/blog/important-post.md</code> → <code>/blog/important-post</code></li>
        </ul>
        
        <p>
          You can override the default URL by specifying a <code>slug</code> in the front matter.
        </p>
        
        <h2 id="linking">Linking Between Pages</h2>
        <p>
          Use relative or absolute paths when linking to other documents:
        </p>
        
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`[Link to another document in the same directory](./another-document)

[Link to a document in a different directory](../different-directory/document)

[Link with absolute path](/blog/important-post)`}
        </pre>
        
        <h2 id="publishing">Publishing Workflow</h2>
        <p>
          When you create or update a Markdown file:
        </p>
        
        <ol>
          <li>Add it to the appropriate location in the <code>content</code> directory</li>
          <li>Ensure the front matter is complete and correctly formatted</li>
          <li>Write your content using Markdown syntax</li>
          <li>The website will automatically process the file and generate the corresponding page</li>
        </ol>
        
        <h2 id="conclusion">Conclusion</h2>
        <p>
          Using Markdown for your content provides a clean separation between content and presentation, making it easier to 
          focus on writing without worrying about the technical details of the website. The front matter system allows you to 
          include all necessary metadata while keeping your content files clean and organized.
        </p>
      </div>
    </DocPage>
  );
};

export default MarkdownContent;
