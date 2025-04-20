const fs = require('fs');
const path = require('path');

// Where your files are
const CONTENT_DIR = path.join(__dirname, 'public', 'content');

// List of all your files (exact names from the output)
const FILES_TO_CONVERT = [
  'AboutPage.tsx',
  'BibleVsQuranPage.tsx',
  'GospelPage.tsx',
  'GetStartedPage.tsx',
  'HomePage.tsx',
  'JesusDenialPage.tsx',
  'NewsletterPage.tsx',
  'ScriptureAnalysisPage.tsx',
  'SupportPage.tsx'
];

// Convert TSX to Markdown
const convertToMarkdown = (filename) => {
  try {
    // Read TSX file
    const tsxContent = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8');
    
    // Generate folder name (AboutPage.tsx → about)
    const folderName = filename.replace('Page.tsx', '').toLowerCase();
    const outputDir = path.join(CONTENT_DIR, folderName);
    
    // Create folder if needed
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Frontmatter template
    const title = filename.replace('Page.tsx', '');
    const frontmatter = `---
title: "${title}"
layout: "../../layouts/DocsLayout.astro"
lastUpdated: "${new Date().toISOString().split('T')[0]}"
---

<script>
${tsxContent.match(/import {.*?} from ".*?";/g)?.join('\n') || ''}
</script>
`;

    // Convert content
    let mdContent = tsxContent
      .replace(/export default function \w+\(\) {[\s\S]*?return \(/g, '')
      .replace(/\);?[\s\S]*?\}$/g, '')
      .replace(/className=/g, 'class=')
      .replace(/<Link (.*?)>/g, '[Link $1]') // Temporary markdown link
      .replace(/<\/Link>/g, '[/Link]');

    // Combine and save
    fs.writeFileSync(
      path.join(outputDir, 'index.md'),
      frontmatter + mdContent,
      'utf8'
    );

    console.log(`✅ Converted ${filename} → ${folderName}/index.md`);
  } catch (err) {
    console.error(`❌ Failed ${filename}:`, err.message);
  }
};

// Run conversion
FILES_TO_CONVERT.forEach(convertToMarkdown);
console.log('🎉 All done!');