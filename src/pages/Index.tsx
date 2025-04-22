
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cross, Flame, XOctagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/hooks/use-theme';

const Index = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative flex flex-col items-center justify-center text-center px-4 py-16 md:py-24">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg shadow-primary/10">
            <img 
              src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png" 
              alt="Islam IsLIES Logo" 
              className="w-full h-full object-cover"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Islam <span className="text-primary">Is</span>LIES
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Exposing the truth about Islam and showing the path to salvation through Jesus Christ.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/getting-started">
              <Button size="lg" className="cta-button">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/gospel">
              <Button size="lg" variant="outline" className="cta-button bg-background/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30 hover:text-white">
                Read The Gospel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Islam Is False</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the truth about Islam and why faith in Jesus Christ is the only path to salvation.
            </p>
          </div>

          <div className="grid features-grid gap-8 mb-16">
            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Cross size={24} />
                </div>
                <CardTitle>Faith in Jesus leads to Salvation</CardTitle>
                <CardDescription>
                  Jesus Christ is the way, the truth, and the life. No one comes to the Father except through Him.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  The Bible teaches that salvation comes through faith in Jesus Christ alone, not through works or following false prophets.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/faith-in-jesus-to-salvation" className="w-full">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Flame size={24} />
                </div>
                <CardTitle>Faith in Mohammad leads to Damnation</CardTitle>
                <CardDescription>
                  Mohammad was a false prophet who led millions astray from the true path to salvation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Islam denies the divinity of Jesus, His death on the cross, and His resurrection - the very foundations of salvation.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/faith-in-mohammad-leads-to-damnation" className="w-full">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <XOctagon size={24} />
                </div>
                <CardTitle>Faith in Allah leads to lies</CardTitle>
                <CardDescription>
                  Allah is not the God of the Bible, but a deception created to lead people away from the truth.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  The Islamic concept of Allah contradicts the biblical revelation of God's nature, character, and plan for humanity.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/faith-in-allah-leads-to-lies" className="w-full">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BookOpen size={24} />
                </div>
                <CardTitle>Resources</CardTitle>
                <CardDescription>
                  Access tools and information to help you understand the truth about Islam and Christianity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Find answers to common questions, Bible studies, comparative analyses, and resources for sharing the Gospel with Muslims.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/resources" className="w-full">
                  <Button className="w-full">Browse Resources</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Separator className="my-16" />

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Recent Articles</h2>
            <Tabs defaultValue="latest" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
              <TabsContent value="latest" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Understanding Islamic Teachings</CardTitle>
                      <CardDescription>April 10, 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>A critical analysis of Islamic teachings and their contradictions with biblical truth.</p>
                    </CardContent>
                    <CardFooter>
                      <Link to="/blog/understanding-islamic-teachings" className="w-full">
                        <Button variant="outline" className="w-full">Read Article</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Common Questions Muslims Ask About Jesus</CardTitle>
                      <CardDescription>March 15, 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Addressing the most frequent questions Muslims have about Jesus and Christianity.</p>
                    </CardContent>
                    <CardFooter>
                      <Link to="/common-questions" className="w-full">
                        <Button variant="outline" className="w-full">Read Article</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
                <div className="text-center mt-8">
                  <Link to="/blog">
                    <Button variant="link" className="text-primary">
                      View All Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="featured" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>God vs. Allah: A Comprehensive Comparison</CardTitle>
                      <CardDescription>February 20, 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>An in-depth look at the differences between the Christian God and the Islamic Allah.</p>
                    </CardContent>
                    <CardFooter>
                      <Link to="/comparison-god-allah" className="w-full">
                        <Button variant="outline" className="w-full">Read Article</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>The Historical Reliability of the Bible vs. the Quran</CardTitle>
                      <CardDescription>November 5, 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Examining the historical evidence supporting the Bible and the lack thereof for the Quran.</p>
                    </CardContent>
                    <CardFooter>
                      <Link to="/comparative-studies/bible-vs-quran" className="w-full">
                        <Button variant="outline" className="w-full">Read Article</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
                <div className="text-center mt-8">
                  <Link to="/blog/featured">
                    <Button variant="link" className="text-primary">
                      View All Featured Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Popular Topics</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Link to="/tags/jesus">
                <Badge variant="outline" className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground">Jesus</Badge>
              </Link>
              <Link to="/tags/salvation">
                <Badge variant="outline" className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground">Salvation</Badge>
              </Link>
              <Link to="/tags/islam">
                <Badge variant="outline" className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground">Islam</Badge>
              </Link>
              <Link to="/tags/quran">
                <Badge variant="outline" className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground">Quran</Badge>
              </Link>
              <Link to="/tags/mohammad">
                <Badge variant="outline" className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground">Mohammad</Badge>
              </Link>
              <Link to="/tags/bible">
                <Badge variant="outline" className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground">Bible</Badge>
              </Link>
              <Link to="/tags/comparative-religion">
                <Badge variant="outline" className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground">Comparative Religion</Badge>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/10 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-xl mb-8">
            Stay updated with the latest articles, resources, and information about Islam and Christianity.
          </p>
          <Link to="/newsletter">
            <Button size="lg" className="cta-button">
              Subscribe Now
            </Button>
          </Link>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section {
          min-height: calc(100vh - 80px);
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
        }
        
        .hero-gradient {
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
          backdrop-filter: blur(4px);
        }
        
        .features-grid {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        
        .feature-card {
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
        }
        
        .feature-icon {
          color: hsl(var(--primary));
          background-color: hsl(var(--primary) / 0.1);
        }
        
        .cta-button {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Index;
