
---
title: "Using Markdown Content System"
slug: "using-markdown"
date: "2025-04-18"
updateDate: "2025-04-18"
author: "Islam IsLIES"
excerpt: "Guide to using the Markdown content system for this website."
tags: ["markdown", "documentation", "guide"]
categories: ["docs"]
---

# Using the Markdown Content System

This guide explains how to use the Markdown content system that's been implemented for this website.

## Directory Structure

The content is organized into two main directories:

- **`/content/blog/`** - Contains all blog posts
- **`/content/docs/`** - Contains all documentation pages

## Creating New Content

To create new content, simply create a new Markdown file in the appropriate directory. Each file should have:

### Front Matter

The front matter is YAML metadata at the beginning of the file, enclosed between triple-dashes:

```yaml
---
title: "Your Title Here"
slug: "url-friendly-title"
date: "YYYY-MM-DD"
updateDate: "YYYY-MM-DD"
author: "Your Name"
excerpt: "A brief description of the content"
coverImage: "/path/to/image.jpg"
tags: ["tag1", "tag2", "tag3"]
categories: ["category1", "category2"]
---
```

### Required Front Matter Fields

- **title** - The title of the document
- **slug** - URL-friendly version of the title (used in the URL)
- **date** - Publication date in YYYY-MM-DD format

### Optional Front Matter Fields

- **updateDate** - Last updated date in YYYY-MM-DD format
- **author** - Author name
- **excerpt** - Brief summary (if not provided, will be automatically generated from content)
- **coverImage** - Path to the featured image
- **tags** - Array of tags for categorization
- **categories** - Array of categories
- **disclaimer** - Optional disclaimer text to display

### Content

After the front matter, write your content using standard Markdown syntax:

```markdown
# Main Heading

## Subheading

Regular paragraph text with **bold**, *italic*, or ~~strikethrough~~.

- Bullet point
- Another bullet point

1. Numbered item
2. Another numbered item

[Link text](https://example.com)

![Alt text for image](path/to/image.jpg)

> This is a blockquote

```

## URL Structure

The URLs for your content will be based on the directory and the slug:

- Blog posts: `/blog/[slug]`
- Documentation: `/docs/[slug]`

For example, a blog post with slug "welcome-post" would be available at `/blog/welcome-post`.

## Special Features

### Internal Links

You can create wiki-style internal links using double brackets:

```markdown
Check out the [[Getting Started]] guide.
```

This will be converted to a link to `/getting-started`.

### Code Blocks

````markdown
```javascript
// This is a code block with syntax highlighting
function example() {
  return "Hello, world!";
}
```
````

## Images

Images can be included directly in your Markdown:

```markdown
![Alt text](path/to/image.jpg)
```

For best results, store images in the `/public/images/` directory and reference them like:

```markdown
![Alt text](/images/your-image.jpg)
```

## Publishing New Content

After creating your Markdown file:

1. Place it in the appropriate directory (`/content/blog/` or `/content/docs/`)
2. The system will automatically load and render it at the corresponding URL

## Navigation

The system will automatically generate navigation between documents in the same section. On each document page, "Previous" and "Next" links will appear at the bottom to navigate through the content.

## Downloading Content

Each document page includes a "Download Document" button that allows users to download the content as a text file.
