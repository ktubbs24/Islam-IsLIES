
import { ArrowRight, ArrowLeft, DollarSign, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SupportPage = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-6">Support Our Ministry</h1>
        <p className="text-muted-foreground mb-6">Help us continue sharing Biblical truth.</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Thank you for your interest in supporting our ministry. While all our content is freely available and will always remain so, your financial support helps us continue our mission of revealing Biblical truths and addressing misconceptions about Christianity.</p>
        
        <blockquote>
          "Freely you have received; freely give." <cite>Matthew 10:8</cite>
        </blockquote>
        
        <p>Scripture reminds us that the gospel is a gift that should be freely shared. In keeping with this principle, we do not charge for access to our resources. All downloads and materials are available without cost.</p>
        
        <blockquote>
          "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." <cite>2 Corinthians 9:7</cite>
        </blockquote>
        
        <p>If you feel led to support this ministry financially, we welcome your contribution. Your generosity helps us:</p>
        
        <ul>
          <li>Create new content</li>
          <li>Maintain and improve this website</li>
          <li>Expand our outreach</li>
          <li>Cover operational expenses</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Cash App</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Support us instantly with Cash App using the cashtag below.
            </p>
            <div className="mt-auto">
              <a 
                href="https://cash.app/$Kwenela"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button>
                  Send via Cash App
                </Button>
              </a>
              <p className="mt-2 text-sm text-muted-foreground">
                Cashtag: <span className="font-mono bg-muted px-2 py-1 rounded">$Kwenela</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Buy Me a Coffee</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Show your support by buying me a virtual coffee through Buy Me a Coffee platform.
            </p>
            <div className="mt-auto">
              <a 
                href="https://buymeacoffee.com/realKwenelaT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button>
                  Buy me a coffee
                </Button>
              </a>
              <p className="mt-2 text-sm text-muted-foreground">
                Every contribution helps us continue our work.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
        <h3 className="font-bold mb-3">A Note About Giving</h3>
        <p className="mb-4">
          "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
        </p>
        <p className="mb-0 text-muted-foreground">
          All resources on this site are free and will remain free. Your support is appreciated but never required.
        </p>
      </div>

      <div className="flex justify-between pt-8 mt-8 border-t">
        <Link to="/newsletter" className="flex items-center text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Newsletter</span>
        </Link>
        <Link to="/about" className="flex items-center text-muted-foreground hover:text-primary">
          <span>About</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default SupportPage;
