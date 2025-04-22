
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";

const FaithInJesusPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Faith in Jesus Leads to Salvation</h1>
      
      <p className="mb-6 text-lg">
        This section explores the central Christian belief that faith in Jesus Christ is the path to salvation.
        Learn about key concepts, Bible verses, and theological explanations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Jesus</h2>
          <p className="mb-4">Understand who Jesus is, what He claimed, and why He is central to salvation.</p>
          <Link to="/jesus" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Learn about Jesus <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Works</h2>
          <p className="mb-4">Explore the relationship between faith and works in salvation.</p>
          <Link to="/works" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Understand Works <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Sheep</h2>
          <p className="mb-4">Learn about Jesus as the Good Shepherd and believers as His sheep.</p>
          <Link to="/sheep" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Explore Teachings <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Salvation</h2>
          <p className="mb-4">Understand the concept of salvation through faith in Jesus Christ.</p>
          <Link to="/salvation" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Discover Salvation <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Scriptures</h2>
          <p className="mb-4">Examine key Bible verses about faith, salvation, and Jesus Christ.</p>
          <Link to="/scriptures" className="inline-flex items-center">
            <Button variant="outline" className="flex items-center gap-2 button-custom">
              Read Scriptures <ChevronRight size={16} />
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

export default FaithInJesusPage;
