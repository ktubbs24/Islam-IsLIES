
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";
import FolderView from "@/components/FolderView";

const HomeFolderPage = () => {
  const homeDocuments = [
    {
      id: 'getting-started',
      title: 'Welcome',
      path: '/getting-started',
      description: 'Begin your journey with an introduction to the site and its purpose.',
      date: '2023-04-01'
    },
    {
      id: 'gospel',
      title: 'The Gospel',
      path: '/gospel',
      description: 'Learn about the good news of Jesus Christ and salvation.',
      date: '2023-04-05'
    },
    {
      id: 'about',
      title: 'About',
      path: '/about',
      description: 'Learn more about our mission and the people behind this site.',
      date: '2023-04-10'
    },
    {
      id: 'recent-updates',
      title: 'Recent Updates',
      path: '/recent-updates',
      description: 'Stay informed with the latest articles and resources.',
      date: '2023-05-01'
    },
    {
      id: 'support',
      title: 'Support',
      path: '/support',
      description: 'Learn how you can support our mission.',
      date: '2023-05-10'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <FolderView 
          title="Home" 
          description="Welcome to the Islam IsLIES documentation. Here you'll find resources and guides to understand the truth about Islam and Christianity." 
          documents={homeDocuments}
        />
      </div>
      
      <div className="text-container mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default HomeFolderPage;
