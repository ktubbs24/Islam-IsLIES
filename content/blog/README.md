
# Blog Content Directory

This directory contains markdown files for the blog section of the website. Each blog post should be a separate markdown file with proper front matter.

## Front Matter Structure

```yaml
---
title: "Blog Post Title Here"
date: "YYYY-MM-DD"
updateDate: "YYYY-MM-DD"  # Optional
excerpt: "A brief excerpt or summary of the blog post"
author: "Author Name"
slug: "/blog/post-slug"
imageSrc: "https://path.to/image.jpg"  # Optional
categories: ["category1", "category2"]
tags: ["tag1", "tag2", "tag3"]
featured: true  # Optional, set to true for featured posts
---
```

## Writing Blog Posts

- Start your content immediately after the front matter.
- Use standard markdown syntax for headings, paragraphs, lists, etc.
- Include images with `![Alt text](../path/to/image.jpg)` or use full URLs.
- Use `<!-- more -->` to indicate where the excerpt should end if it differs from the front matter excerpt.

## Example Blog Post

```markdown
---
title: "Understanding the Trinity"
date: "2025-04-01"
excerpt: "A clear explanation of the Christian doctrine of the Trinity"
author: "Islam IsLIES"
slug: "/blog/understanding-trinity"
categories: ["Theology", "Christianity"]
tags: ["trinity", "doctrine", "apologetics"]
---

This article explores the Christian doctrine of the Trinity, explaining how God can be three persons in one essence.

## Historical Background

The doctrine of the Trinity has been central to Christian theology since...

<!-- more -->

## Biblical Evidence

There are numerous passages in the Bible that support the Trinity...

```

## Organization

You can organize your blog posts in subdirectories by year, category, or any other structure that makes sense for your content management.
