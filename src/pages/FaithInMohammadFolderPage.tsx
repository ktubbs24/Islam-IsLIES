
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";
import FolderView from "@/components/FolderView";

const FaithInMohammadFolderPage = () => {
  const faithInMohammadDocuments = [
    {
      id: 'islam',
      title: 'Islam',
      path: '/islam',
      description: 'An overview of Islam and its teachings.',
      date: '2023-07-15',
      coverImage: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'quran',
      title: 'The Quran',
      path: '/quran',
      description: 'Analysis of the Quran and its contradictions.',
      date: '2023-07-10'
    },
    {
      id: 'shahada',
      title: 'The Shahada',
      path: '/shahada',
      description: 'Understand the Islamic declaration of faith and its implications.',
      date: '2023-07-05'
    },
    {
      id: 'mohammad',
      title: 'Mohammad',
      path: '/mohammad',
      description: 'The life and teachings of Mohammad examined critically.',
      date: '2023-07-01',
      coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'islamic-salvation',
      title: 'Salvation in Islam',
      path: '/islamic-salvation',
      description: 'How Islamic concepts of salvation differ from Christian teachings.',
      date: '2023-06-20'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <FolderView 
          title="Faith In Mohammad Leads To Damnation" 
          description="Analysis of Islamic teachings and why faith in Mohammad leads away from true salvation."
          documents={faithInMohammadDocuments}
        />
      </div>
      
      <div className="text-container mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default FaithInMohammadFolderPage;
