
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Islam IsLIES
          </h1>
          <p className="text-xl text-muted-foreground">
            Revealing Biblical truths about Islam and Jesus Christ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/getting-started"
            className="relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="space-y-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <h3 className="font-bold">Getting Started</h3>
                <p className="text-muted-foreground">
                  Start here to learn about our mission and explore our documentation.
                </p>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-primary">Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4 text-primary" />
              </div>
            </div>
          </Link>
          
          <Link
            to="/biblical-truths/jesus-doesnt-deny-himself"
            className="relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="space-y-2">
                <FileText className="h-8 w-8 text-primary" />
                <h3 className="font-bold">Featured Article</h3>
                <p className="text-muted-foreground">
                  Jesus doesn't deny Himself by saying only God is good
                </p>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-primary">Read now</span>
                <ArrowRight className="ml-1 h-4 w-4 text-primary" />
              </div>
            </div>
          </Link>
        </div>
      </section>
      
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Recent Updates</h2>
          <p className="text-muted-foreground">
            Latest additions and updates to our documentation
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
              className="flex flex-col sm:flex-row gap-4 items-start rounded-lg border p-4 hover:bg-muted/50 transition-colors"
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
    </div>
  );
};

export default Index;
