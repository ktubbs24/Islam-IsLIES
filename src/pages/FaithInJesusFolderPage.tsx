
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";
import FolderView from "@/components/FolderView";

const FaithInJesusFolderPage = () => {
  const faithInJesusDocuments = [
    {
      id: 'jesus',
      title: 'Jesus',
      path: '/jesus',
      description: 'Understand who Jesus is, what He claimed, and why He is central to salvation.',
      date: '2023-03-15',
      coverImage: 'https://images.unsplash.com/photo-1602736692223-9280cd6e2c65?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'works',
      title: 'Works',
      path: '/works',
      description: 'Explore the relationship between faith and works in salvation.',
      date: '2023-03-10'
    },
    {
      id: 'sheep',
      title: 'Sheep',
      path: '/sheep',
      description: 'Learn about Jesus as the Good Shepherd and believers as His sheep.',
      date: '2023-03-05'
    },
    {
      id: 'salvation',
      title: 'Salvation',
      path: '/salvation',
      description: 'Understand the concept of salvation through faith in Jesus Christ.',
      date: '2023-03-01',
      coverImage: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'scriptures',
      title: 'Scriptures',
      path: '/scriptures',
      description: 'Examine key Bible verses about faith, salvation, and Jesus Christ.',
      date: '2023-02-20'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <FolderView 
          title="Faith In Jesus Leads To Salvation" 
          description="Explore how faith in Jesus Christ is the path to salvation, with insights from Scripture and theological explanations." 
          documents={faithInJesusDocuments}
        />
      </div>
      
      <div className="text-container mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default FaithInJesusFolderPage;
