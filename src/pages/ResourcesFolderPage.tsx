
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";
import FolderView from "@/components/FolderView";

const ResourcesFolderPage = () => {
  const resourcesDocuments = [
    {
      id: 'faq',
      title: 'FAQ',
      path: '/faq',
      description: 'Answers to frequently asked questions about Islam and Christianity.',
      date: '2023-09-15'
    },
    {
      id: 'bible',
      title: 'The Bible',
      path: '/bible',
      description: 'Resources for understanding the Bible.',
      date: '2023-09-10',
      coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'christians-to-avoid',
      title: 'Types of "Christians" to Avoid',
      path: '/christians-to-avoid',
      description: 'Guidance on discerning false teachings within Christianity.',
      date: '2023-09-05'
    },
    {
      id: 'common-questions',
      title: 'Common Questions Muslims Ask About Jesus',
      path: '/common-questions',
      description: 'Addressing typical questions and misconceptions.',
      date: '2023-09-01',
      coverImage: 'https://images.unsplash.com/photo-1478198697312-d2dfe68090f6?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'jesus-not-christianity',
      title: 'Believe in Jesus Christ NOT Christianity',
      path: '/jesus-not-christianity',
      description: 'Understanding the distinction between faith in Jesus and religious systems.',
      date: '2023-08-20'
    },
    {
      id: 'become-christian',
      title: 'What Can I Do Now To Become Christian',
      path: '/become-christian',
      description: 'Practical steps for those seeking to follow Jesus.',
      date: '2023-08-15'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <FolderView 
          title="Resources" 
          description="Access valuable resources, guides, and answers to help you understand the truth about Islam and Christianity." 
          documents={resourcesDocuments}
        />
      </div>
      
      <div className="text-container mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default ResourcesFolderPage;
