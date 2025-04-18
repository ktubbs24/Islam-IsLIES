
import React from "react";

const SubscribeEmbed = () => {
  return (
    <div className="newsletter-signup">
      <h3 className="text-xl font-bold mb-2">Enter your email below if you don't want to miss when I publish new work 👇</h3>
      <p className="text-muted-foreground mb-4">
        <em>Disclaimer: This newsletter will just be for updates sent to you. I don't do sponsorships, affiliates, etc. so don't worry about seeing any junkmail from me.</em>
      </p>
      <div className="w-full max-w-3xl mx-auto">
        <iframe
          src="https://islamislies.substack.com/embed"
          width="100%"
          height="320"
          style={{ border: '1px solid #EEE', background: 'transparent' }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
};

export default SubscribeEmbed;
