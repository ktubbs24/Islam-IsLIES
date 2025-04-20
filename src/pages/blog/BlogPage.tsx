
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      
      <p className="mb-6 text-lg">
        This section contains all our blog posts, articles, and resources related to understanding Islam and Christianity.
        Explore different topics and categories below.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Latest Articles</h2>
          <p className="mb-4">Read our most recent content covering important topics in comparative religion.</p>
          <Link to="/blog/latest" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Read Articles <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Featured Posts</h2>
          <p className="mb-4">Discover our most impactful and important writings.</p>
          <Link to="/blog/featured" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Explore Featured <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <p className="mb-4">Browse articles by topic or subject area.</p>
          <Link to="/blog/categories" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Browse Categories <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Archives</h2>
          <p className="mb-4">Access our complete library of past articles and resources.</p>
          <Link to="/blog/archives" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              View Archives <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-10">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default BlogPage;
