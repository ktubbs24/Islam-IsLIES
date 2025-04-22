
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";
import FolderView from "@/components/FolderView";

const FaithInAllahFolderPage = () => {
  const faithInAllahDocuments = [
    {
      id: 'allah',
      title: 'Allah',
      path: '/allah',
      description: 'Understanding the concept of Allah in Islam.',
      date: '2023-08-15',
      coverImage: 'https://images.unsplash.com/photo-1629173708824-fbb80836848b?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'satan',
      title: 'Satan',
      path: '/satan',
      description: 'The connection between demonic influence and Islamic teachings.',
      date: '2023-08-10'
    },
    {
      id: 'false-prophets',
      title: 'False Prophets/Teachers',
      path: '/false-prophets',
      description: 'Examining false prophets and teachers throughout history.',
      date: '2023-08-05'
    },
    {
      id: 'deception',
      title: 'The Great Deception',
      path: '/deception',
      description: 'How Islamic teachings deceive followers.',
      date: '2023-08-01',
      coverImage: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'comparison-god-allah',
      title: 'God vs. Allah: A Comparison',
      path: '/comparison-god-allah',
      description: 'Key differences between the Biblical God and Islamic concept of Allah.',
      date: '2023-07-20'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <FolderView 
          title="Faith In Allah Leads To Lies" 
          description="Explore how faith in Allah leads to spiritual deception and falsehood." 
          documents={faithInAllahDocuments}
        />
      </div>
      
      <div className="text-container mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default FaithInAllahFolderPage;
