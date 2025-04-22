
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      
      <div className="text-container mb-8 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <p className="mb-6 text-lg">
          <strong>Islam IsLIES — let no one tell you otherwise</strong>
        </p>
        <p className="mb-6">
          Showcasing the lies of Islam and the many lies that are taught by Satan through his prophet Mohammad that keeps people from being saved through having faith in Jesus Christ that He:
        </p>
        <p className="mb-6">
          Died on the cross for the forgiveness of our sins was buried in the tomb for three days but after the third day Jesus rose from the grave and is now at the Right Hand of the Father in Heaven.
        </p>
        <p className="mb-6">
          Jesus says when you believe in this gospel which is the power of God then you will never perish and have everlasting life through having faith in Him alone....
        </p>
        <div className="text-right">
          <Link to="/about" className="inline-flex items-center text-primary hover:underline">
            Learn more about Islam IsLIES <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
          <p className="mb-4">Begin your journey with an introduction to the site and its purpose.</p>
          <Link to="/getting-started" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Explore <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-3">The Gospel</h2>
          <p className="mb-4">Learn about the good news of Jesus Christ and salvation.</p>
          <Link to="/gospel" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Discover <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="mb-4">Learn more about our mission and the people behind this site.</p>
          <Link to="/about" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Learn More <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-3">Recent Updates</h2>
          <p className="mb-4">Stay informed with the latest articles and resources.</p>
          <Link to="/recent-updates" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              View Updates <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="text-container mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default HomePage;
