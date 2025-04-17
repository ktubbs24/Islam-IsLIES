
# Documentation Content Directory

This directory contains markdown files for the documentation section of the website. Each markdown file should include proper front matter at the beginning.

## Front Matter Structure

```yaml
---
title: "Document Title Here"
date: "YYYY-MM-DD"
updateDate: "YYYY-MM-DD"  # Optional
excerpt: "A brief excerpt about the document"
author: "Author Name"
slug: "/path-to-document"
imageSrc: "https://path.to/image.jpg"  # Optional
categories: ["category1", "category2"]  # Optional
tags: ["tag1", "tag2", "tag3"]  # Optional
disclaimer: "Optional disclaimer text"  # Optional
---
```

## File Organization

Organize your markdown files in subdirectories that match your desired URL structure. For example:

- `biblical-truths/jesus-divinity.md` would have the URL `/biblical-truths/jesus-divinity`
- `comparative-studies/bible-vs-quran.md` would have the URL `/comparative-studies/bible-vs-quran`

## Adding Links

Use standard markdown syntax for links to other documents:

```markdown
[Link to another document](../path/to/document)
```

For external links:

```markdown
[External Link](https://example.com)
```
