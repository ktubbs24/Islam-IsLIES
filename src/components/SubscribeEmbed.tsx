
import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubscribeEmbed = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    window.open('https://islamislies.substack.com/', '_blank');
  };
  
  return (
    <div className="newsletter-signup">
      <h3 className="text-xl font-bold mb-2">Enter your email below if you don't want to miss when I publish new work 👇</h3>
      <p className="text-muted-foreground mb-4">
        <em>Disclaimer: This newsletter will just be for updates sent to you. I don't do sponsorships, affiliates, etc. so don't worry about seeing any junkmail from me.</em>
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Your email address"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
        <Button type="submit" className="btn-3d flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default SubscribeEmbed;
