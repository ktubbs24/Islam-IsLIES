
import React from 'react';
import DocPage from '@/components/DocPage';
import BlogArchives from '@/components/BlogArchives';

// Sample blog data - this would be replaced with actual content from your markdown files
const samplePosts = [
  {
    content: "<p>This is the content of the first blog post...</p>",
    frontMatter: {
      title: "Understanding Islamic Teachings vs Biblical Truth",
      date: "2025-04-10",
      excerpt: "A comparative study of Islamic teachings and Biblical truths.",
      author: "Islam IsLIES",
      slug: "/blog/understanding-islamic-teachings",
      tags: ["islam", "bible", "comparative-studies"]
    }
  },
  {
    content: "<p>This is the content of the second blog post...</p>",
    frontMatter: {
      title: "The History of Islamic Deception",
      date: "2025-03-15",
      excerpt: "Examining how Islam has historically misrepresented its teachings.",
      author: "Islam IsLIES",
      slug: "/blog/history-islamic-deception",
      tags: ["islam", "history", "deception"]
    }
  },
  {
    content: "<p>This is the content of the third blog post...</p>",
    frontMatter: {
      title: "Why Muslims Need Jesus",
      date: "2025-02-20",
      excerpt: "The essential message of salvation that Muslims need to hear.",
      author: "Islam IsLIES",
      slug: "/blog/why-muslims-need-jesus",
      tags: ["salvation", "jesus", "evangelism"]
    }
  },
  {
    content: "<p>This is the content of the fourth blog post...</p>",
    frontMatter: {
      title: "Analyzing Quranic Contradictions",
      date: "2025-01-05",
      excerpt: "A thorough examination of internal contradictions in the Quran.",
      author: "Islam IsLIES",
      slug: "/blog/quranic-contradictions",
      tags: ["quran", "contradictions", "analysis"]
    }
  },
  {
    content: "<p>This is the content of the fifth blog post...</p>",
    frontMatter: {
      title: "Mohammad vs Jesus: Examining Their Lives",
      date: "2024-12-12",
      excerpt: "A comparative study of the lives and teachings of Mohammad and Jesus.",
      author: "Islam IsLIES",
      slug: "/blog/mohammad-vs-jesus",
      tags: ["jesus", "mohammad", "comparative-studies"]
    }
  }
];

const BlogArchivesPage = () => {
  return (
    <DocPage
      title="Blog Archives"
      publishDate="2025-01-01"
      updateDate="2025-04-15"
      excludeNavigation={true}
    >
      <BlogArchives posts={samplePosts} />
    </DocPage>
  );
};

export default BlogArchivesPage;
