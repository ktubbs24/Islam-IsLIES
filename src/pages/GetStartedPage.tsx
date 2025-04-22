import DocPage from "./DocPage";

const GetStartedPage = () => {
  return (
    <DocPage
      title="Welcome to Islam IsLIES"
      publishDate="2025-04-01"
      imageSrc="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    >
      <h2 id="introduction">Introduction</h2>
      <p>
        Welcome to Islam IsLIES, a documentation site dedicated to revealing Biblical truths about Islam and Jesus Christ. Our mission is to provide well-researched, scriptural evidence examining the claims of Islam in light of Biblical teachings.
      </p>
      
      <h2 id="navigate">How to Navigate this Site</h2>
      <p>
        This documentation is organized into several sections:
      </p>
      <ul>
        <li>
          <strong>Biblical Truths</strong>: Articles focused on Biblical teachings about Jesus Christ, His divinity, and His teachings.
        </li>
        <li>
          <strong>Comparative Studies</strong>: Side-by-side analyses of Biblical and Islamic teachings on key theological issues.
        </li>
        <li>
          <strong>Recent Updates</strong>: A chronological listing of our newest content and updates to existing articles.
        </li>
      </ul>
      
      <h2 id="features">Features to Explore</h2>
      <h3 id="features-search">Full-Text Search</h3>
      <p>
        Use the search feature in the top navigation to find specific topics or keywords throughout our documentation.
      </p>
      
      <h3 id="features-download">Document Downloads</h3>
      <p>
        Each document can be downloaded in various formats for offline reading and sharing. Look for the download button at the bottom of each article.
      </p>
      
      <h3 id="features-navigation">Table of Contents</h3>
      <p>
        On desktop, each article includes a table of contents on the right side to help navigate through longer pieces.
      </p>
      
      <h2 id="disclaimer">Important Disclaimer</h2>
      <p>
        Our documentation aims to provide accurate Biblical analysis. We encourage readers to verify all references and conduct their own study of Scripture. This site is not intended to promote hatred but rather to examine theological differences through scriptural analysis.
      </p>
      
      <h2 id="getting-involved">Getting Involved</h2>
      <p>
        We welcome feedback and questions. Follow us on our social media platforms linked in the footer to join the conversation.
      </p>
    </DocPage>
  );
};

export default GetStartedPage;
