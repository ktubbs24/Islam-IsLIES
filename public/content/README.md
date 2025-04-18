
# Content Directory

This directory contains all markdown content for the website.

## Directory Structure

```
content/
├── blog/
│   ├── post-1.md
│   ├── post-2.md
│   └── ...
├── docs/
│   ├── getting-started.md
│   ├── using-markdown.md
│   └── ...
```

## Front Matter Format

Each markdown file should include front matter at the top, formatted as YAML between triple dashes:

```markdown
---
title: "Post Title"
date: "2023-06-15"
updated: "2023-07-01"
author: "Author Name"
excerpt: "A brief summary of the content"
slug: "custom-url-slug"
featuredImage: "/path/to/image.jpg"
categories: ["Category1", "Category2"]
tags: ["tag1", "tag2", "tag3"]
---

Content starts here...
```

### Required Front Matter Fields

- `title`: The title of the post or document
- `date`: Publication date in YYYY-MM-DD format

### Optional Front Matter Fields

- `updated`: Last updated date in YYYY-MM-DD format
- `author`: Author name
- `excerpt`: Brief summary used in previews
- `slug`: Custom URL slug (defaults to filename if not provided)
- `featuredImage`: Path to featured image
- `categories`: Array of categories
- `tags`: Array of tags

## Markdown Content

After the front matter, write your content using standard Markdown syntax.

## File Naming Conventions

- Use lowercase letters
- Replace spaces with hyphens
- Use descriptive names
- Example: `getting-started-with-markdown.md`

## Images and Assets

Store images in the public directory and reference them using absolute paths:

```markdown
![Alt text](/images/my-image.jpg)
```
