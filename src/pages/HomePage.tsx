
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      
      <p className="mb-6 text-lg">
        Welcome to Islam IsLIES - a documentation site dedicated to providing accurate information about Islam and Christianity.
        This section contains an overview of the site and important information for visitors.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
          <p className="mb-4">Begin your journey with an introduction to the site and its purpose.</p>
          <Link to="/getting-started" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Explore <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">The Gospel</h2>
          <p className="mb-4">Learn about the good news of Jesus Christ and salvation.</p>
          <Link to="/gospel" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Discover <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="mb-4">Learn more about our mission and the people behind this site.</p>
          <Link to="/about" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Learn More <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Recent Updates</h2>
          <p className="mb-4">Stay informed with the latest articles and resources.</p>
          <Link to="/recent-updates" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              View Updates <ChevronRight size={16} />
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

export default HomePage;
