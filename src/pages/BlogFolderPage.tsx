
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";
import FolderView from "@/components/FolderView";

const BlogFolderPage = () => {
  const blogDocuments = [
    {
      id: 'blog-latest',
      title: 'Latest Articles',
      path: '/blog/latest',
      description: 'Read our most recent content covering important topics in comparative religion.',
      date: '2023-06-15',
      coverImage: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'blog-featured',
      title: 'Featured Posts',
      path: '/blog/featured',
      description: 'Discover our most impactful and important writings.',
      date: '2023-06-10',
      coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'blog-categories',
      title: 'Categories',
      path: '/blog/categories',
      description: 'Browse articles by topic or subject area.',
      date: '2023-06-05'
    },
    {
      id: 'blog-archives',
      title: 'Archives',
      path: '/blog/archives',
      description: 'Access our complete library of past articles and resources.',
      date: '2023-06-01'
    },
    {
      id: 'blog-article1',
      title: 'Understanding Islamic Teachings',
      path: '/blog/understanding-islamic-teachings',
      description: 'A comprehensive analysis of core Islamic doctrines and their implications.',
      date: '2023-05-20'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <FolderView 
          title="Blog" 
          description="Explore our collection of articles, essays, and resources on Islam, Christianity, and comparative religion topics." 
          documents={blogDocuments}
        />
      </div>
      
      <div className="text-container mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default BlogFolderPage;
