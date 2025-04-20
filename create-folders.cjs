const fs = require('fs');
const path = require('path');

// Base directory
const baseDir = path.join(__dirname, 'public', 'content');

// Folder structure
const structure = {
  Home: {
    files: ['welcome.md', 'gospel.md', 'about.md'],
    subfolders: ['Newsletter', 'Recent-Updates'],
  },
  Blog: {
    subfolders: ['Latest-Articles', 'Featured-Posts', 'Categories', 'Archives'],
  },
  Docs: {
    subfolders: {
      'Faith-in-Jesus-leads-to-Salvation': ['Jesus', 'Works', 'Sheep', 'Salvation', 'Scriptures'],
      'Faith-in-Mohammad-leads-to-Damnation': ['Islam', 'The-Quran', 'The-Shahada', 'Mohammad', 'Islamic-Salvation'],
      'Faith-in-Allah-leads-to-lies': [
        'Allah',
        'Satan',
        'False-Prophets_Teachers',
        'The-Great-Deception',
        'God-vs.-Allah_-A-Comparison',
      ],
    },
  },
  Resources: {
    markdownFiles: [
      'FAQ.md',
      'The-Bible.md',
      'Types-of-Christians-To-Avoid.md',
      'Common-Questions-Muslims-Ask-About-Jesus.md',
      'Believe-in-Jesus-Christ-NOT-Christianity.md',
      'What-Can-I-Do-Now-To-Become-Christian.md',
    ],
  },
};

// Function to create folders and files
function createStructure(base, structure) {
  Object.keys(structure).forEach((key) => {
    const currentPath = path.join(base, key);
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath, { recursive: true });
    }

    const { files = [], subfolders = [], markdownFiles = [] } = structure[key];

    // Create files
    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
      }
    });

    // Create subfolders
    if (Array.isArray(subfolders)) {
      subfolders.forEach((subfolder) => {
        const subfolderPath = path.join(currentPath, subfolder);
        if (!fs.existsSync(subfolderPath)) {
          fs.mkdirSync(subfolderPath, { recursive: true });
        }
      });
    } else {
      Object.keys(subfolders).forEach((subfolder) => {
        const subfolderPath = path.join(currentPath, subfolder);
        if (!fs.existsSync(subfolderPath)) {
          fs.mkdirSync(subfolderPath, { recursive: true });
        }
        subfolders[subfolder].forEach((nestedFolder) => {
          const nestedFolderPath = path.join(subfolderPath, nestedFolder);
          if (!fs.existsSync(nestedFolderPath)) {
            fs.mkdirSync(nestedFolderPath, { recursive: true });
          }
        });
      });
    }

    // Create markdown files as subfolders
    markdownFiles.forEach((markdownFile) => {
      const folderName = markdownFile.replace('.md', '');
      const folderPath = path.join(currentPath, folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      const filePath = path.join(folderPath, markdownFile);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
      }
    });
  });
}

// Create the folder structure
createStructure(baseDir, structure);

console.log('Folder structure created successfully!');