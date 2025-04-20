
import React from "react";
import DocPage from "../docs/DocPage";
import SubscribeEmbed from "@/components/SubscribeEmbed";

const NewsletterPage = () => {
  return (
    <DocPage
      title="Newsletter"
      publishDate="2025-04-10"
      tags={["newsletters"]}
    >
      <h2>Stay Updated with Islam IsLIES</h2>
      
      <p>
        Our newsletter provides regular updates on new content, Biblical analysis, 
        and responses to common questions about Islam and Christianity. Subscribe to receive:
      </p>
      
      <ul>
        <li>New document notifications</li>
        <li>Deep dives into Biblical passages</li>
        <li>Clear explanations of common misunderstandings</li>
        <li>Comparative studies between Biblical and Islamic teachings</li>
        <li>Resources for further study and understanding</li>
      </ul>
      
      <h3>Recent Newsletter Examples</h3>
      
      <div className="space-y-6 my-8">
        <div className="border rounded-lg p-4 bg-muted/30">
          <h4 className="text-lg font-medium mb-2">March 2025: Understanding Jesus's Divinity</h4>
          <p>
            In this issue, we explored five key Biblical passages that clearly establish 
            Jesus's divine nature, addressing common misinterpretations in Islamic teachings.
            We also answered reader questions about specific verses from John's Gospel.
          </p>
        </div>
        
        <div className="border rounded-lg p-4 bg-muted/30">
          <h4 className="text-lg font-medium mb-2">February 2025: Comparative Study: The Nature of God</h4>
          <p>
            This newsletter compared how God is portrayed in both Biblical and Quranic texts,
            highlighting the consistent revelation of God's triune nature throughout Scripture
            and addressing misconceptions about monotheism in Christianity.
          </p>
        </div>
        
        <div className="border rounded-lg p-4 bg-muted/30">
          <h4 className="text-lg font-medium mb-2">January 2025: Scripture Preservation Through History</h4>
          <p>
            We examined the historical evidence for the reliable transmission of Biblical texts,
            discussing manuscript evidence, archaeological findings, and addressing Islamic claims
            about corruption of the Bible.
          </p>
        </div>
      </div>
      
      <h3>Subscribe Today</h3>
      <p>
        Don't miss our valuable insights and resources. Subscribe to our newsletter below and
        join thousands of readers seeking to deepen their understanding of Biblical truth.
      </p>
      
      <div className="my-8">
        <SubscribeEmbed />
      </div>
    </DocPage>
  );
};

export default NewsletterPage;
