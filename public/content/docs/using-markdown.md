
---
title: "Using Markdown"
date: "2023-05-15"
updated: "2023-06-25"
author: "Islam IsLIES"
excerpt: "Learn how to format content using Markdown"
slug: "using-markdown"
categories: ["Guides", "Technical"]
tags: ["markdown", "formatting", "content"]
---

# Using Markdown in Truth Seeker Documentation

This guide explains how to use Markdown to format content in our documentation system.

## What is Markdown?

Markdown is a lightweight markup language that allows you to write formatted content using a plain text editor. It's easy to learn and widely used for documentation.

## Basic Formatting

### Headers

```
# Header 1
## Header 2
### Header 3
#### Header 4
```

### Text Styling

```
**Bold text**
*Italic text*
~~Strikethrough~~
```

### Lists

Unordered lists:
```
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
```

Ordered lists:
```
1. First item
2. Second item
3. Third item
```

### Links

```
[Link text](https://example.com)
```

### Images

```
![Alt text](/path/to/image.jpg)
```

### Blockquotes

```
> This is a blockquote
> It can span multiple lines
```

### Code

Inline code: `code`

Code blocks:
````
```javascript
function example() {
  console.log("Hello world");
}
```
````

## Front Matter

All documentation files must include front matter at the top:

```
---
title: "Document Title"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
author: "Author Name"
excerpt: "Brief description"
slug: "custom-url-slug"
categories: ["Category1", "Category2"]
tags: ["tag1", "tag2"]
---
```

## Conclusion

Markdown is a powerful yet simple way to format documentation. By using these basic formatting options, you can create well-structured, readable documents.
