
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, FileText, Tag } from "lucide-react";
import SubscribeEmbed from "@/components/SubscribeEmbed";
import ImageModal from "@/components/ImageModal";
import { Button } from "@/components/ui/button";

const popularTags = [
  { name: "jesus-divinity", count: 2 },
  { name: "scripture-analysis", count: 3 },
  { name: "blog-threads", count: 1 },
];

const Index = () => {
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    // Ensure page scrolls to top on load/navigation
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-12">
      <section className="space-y-8">
        <div className="overflow-hidden rounded-xl shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10"></div>
          <div className="logo-container logo-hover-glow w-full">
            <div className="circular-logo-container mx-auto" style={{ maxWidth: "300px", aspectRatio: "1/1" }}>
              <img 
                src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png"
                alt="Islam IsLIES banner" 
                className="w-full h-full object-cover cursor-pointer hover-glow-effect circular-logo"
                onClick={() => setShowImageModal(true)}
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-10 lg:col-span-8">
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
                  Islam IsLIES
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xl text-muted-foreground">
            Islam IsLIES — let no one tell you otherwise
            Showcasing the lies of Islam and the many lies that are taught by Satan through his prophet Mohammad that keeps people from being saved through having faith in Jesus Christ that He:
            Died on the cross for the forgiveness of our sins was buried in the tomb for three days but after the third day Jesus rose from the grave and is now at the Right Hand of the Father in Heaven.
            Jesus says when you believe in this gospel which is the power of God then you will never perish and have everlasting life through having faith in Him alone....
            <Link to="/about" className="custom-link ml-1">
              Learn more about my mission <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/getting-started"
            className="page-link-button homepage-box relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="space-y-2">
                <BookOpen className="h-8 w-8 text-primary homepage-icon" />
                <h3 className="font-bold">Welcome</h3>
                <p className="text-muted-foreground">
                  Start here to learn about my mission and explore my documentation.
                </p>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-primary">Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4 text-primary homepage-icon" />
              </div>
            </div>
          </Link>
          
          <Link
            to="/biblical-truths/jesus-doesnt-deny-himself"
            className="page-link-button homepage-box relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="space-y-2">
                <FileText className="h-8 w-8 text-primary homepage-icon" />
                <h3 className="font-bold">Featured Post</h3>
                <p className="text-muted-foreground">
                  Jesus doesn't deny Himself by saying only God is good
                </p>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-primary">Read now</span>
                <ArrowRight className="ml-1 h-4 w-4 text-primary homepage-icon" />
              </div>
            </div>
          </Link>
        </div>
      </section>
      
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Tag className="h-6 w-6 homepage-icon" />
            Topics
          </h2>
          <p className="text-muted-foreground">
            Browse documents by topic
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {popularTags.map((tag, i) => (
            <Link
              key={i}
              to={`/tags/${tag.name}`}
              className="px-4 py-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2"
            >
              <span>{tag.name.replace('-', '/')}</span>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-background">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Recent Updates</h2>
          <p className="text-muted-foreground">
            Latest additions and updates to my documentation
          </p>
        </div>
        
        <div className="grid gap-6">
          {[
            {
              title: "Jesus doesn't deny Himself by saying only God is good",
              date: "April 7, 2025",
              description: "Analyzing the rich young ruler's encounter with Jesus and its true meaning.",
              path: "/biblical-truths/jesus-doesnt-deny-himself"
            },
            {
              title: "Bible vs Quran Comparative Study",
              date: "April 1, 2025",
              description: "Examining the key differences between Biblical and Quranic teachings.",
              path: "/comparative-studies/bible-vs-quran"
            },
            {
              title: "Scripture Analysis of Jesus's Divinity",
              date: "March 25, 2025",
              description: "A deep dive into Biblical verses affirming the divinity of Christ.",
              path: "/biblical-truths/scripture-analysis"
            }
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="flex flex-col sm:flex-row gap-4 items-start rounded-lg border p-4 hover:bg-muted/50 transition-colors page-link-button homepage-box"
            >
              <div className="min-w-[120px] text-sm text-muted-foreground">
                {item.date}
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/recent-updates"
            className="custom-link inline-flex items-center"
          >
            View all updates
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="border-t pt-8">
        <SubscribeEmbed />
      </div>

      {showImageModal && (
        <ImageModal 
          src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png"
          alt="Islam IsLIES Logo"
          onClose={() => setShowImageModal(false)}
        />
      )}

      <style jsx>{`
        .homepage-box {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .homepage-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 15px rgba(45, 166, 95, 0.5);
        }
        
        .homepage-box:hover .homepage-icon {
          filter: drop-shadow(0 0 5px rgba(45, 166, 95, 0.7));
          transform: scale(1.1);
        }
        
        .homepage-icon {
          transition: all 0.3s ease;
        }
        
        .hover-glow-effect {
          transition: all 0.3s ease;
        }
        
        .hover-glow-effect:hover {
          filter: drop-shadow(0 0 15px rgba(45, 166, 95, 0.8));
        }
        
        .circular-logo-container {
          border-radius: 50%;
          overflow: hidden;
          display: block;
        }
        
        .circular-logo {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Index;
