
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubscribeEmbed from "@/components/SubscribeEmbed";

interface FolderMeta {
  title: string;
  description: string;
  documents: {
    id: string;
    title: string;
    path: string;
    description: string;
    date?: string;
    coverImage?: string;
  }[];
}

// Mock data for the folders
const folderData: Record<string, FolderMeta> = {
  "faith-in-jesus": {
    title: "Faith In Jesus Leads To Salvation",
    description: "Explore how faith in Jesus Christ is the path to salvation, with insights from Scripture and theological explanations.",
    documents: [
      {
        id: 'jesus',
        title: 'Jesus',
        path: '/jesus',
        description: 'Understand who Jesus is, what He claimed, and why He is central to salvation.',
        date: '2023-03-15',
        coverImage: 'https://images.unsplash.com/photo-1602736692223-9280cd6e2c65?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'works',
        title: 'Works',
        path: '/works',
        description: 'Explore the relationship between faith and works in salvation.',
        date: '2023-03-10'
      },
      {
        id: 'sheep',
        title: 'Sheep',
        path: '/sheep',
        description: 'Learn about Jesus as the Good Shepherd and believers as His sheep.',
        date: '2023-03-05'
      },
      {
        id: 'salvation',
        title: 'Salvation',
        path: '/salvation',
        description: 'Understand the concept of salvation through faith in Jesus Christ.',
        date: '2023-03-01',
        coverImage: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'scriptures',
        title: 'Scriptures',
        path: '/scriptures',
        description: 'Examine key Bible verses about faith, salvation, and Jesus Christ.',
        date: '2023-02-20'
      }
    ]
  },
  "faith-in-mohammad": {
    title: "Faith In Mohammad Leads To Damnation",
    description: "Analysis of Islamic teachings and why faith in Mohammad leads away from true salvation.",
    documents: [
      {
        id: 'islam',
        title: 'Islam',
        path: '/islam',
        description: 'An overview of Islam and its teachings.',
        date: '2023-07-15',
        coverImage: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'quran',
        title: 'The Quran',
        path: '/quran',
        description: 'Analysis of the Quran and its contradictions.',
        date: '2023-07-10'
      },
      {
        id: 'shahada',
        title: 'The Shahada',
        path: '/shahada',
        description: 'Understand the Islamic declaration of faith and its implications.',
        date: '2023-07-05'
      },
      {
        id: 'mohammad',
        title: 'Mohammad',
        path: '/mohammad',
        description: 'The life and teachings of Mohammad examined critically.',
        date: '2023-07-01',
        coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'islamic-salvation',
        title: 'Salvation in Islam',
        path: '/islamic-salvation',
        description: 'How Islamic concepts of salvation differ from Christian teachings.',
        date: '2023-06-20'
      }
    ]
  },
  "faith-in-allah": {
    title: "Faith In Allah Leads To Lies",
    description: "Explore how faith in Allah leads to spiritual deception and falsehood.",
    documents: [
      {
        id: 'allah',
        title: 'Allah',
        path: '/allah',
        description: 'Understanding the concept of Allah in Islam.',
        date: '2023-08-15',
        coverImage: 'https://images.unsplash.com/photo-1629173708824-fbb80836848b?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'satan',
        title: 'Satan',
        path: '/satan',
        description: 'The connection between demonic influence and Islamic teachings.',
        date: '2023-08-10'
      },
      {
        id: 'false-prophets',
        title: 'False Prophets/Teachers',
        path: '/false-prophets',
        description: 'Examining false prophets and teachers throughout history.',
        date: '2023-08-05'
      },
      {
        id: 'deception',
        title: 'The Great Deception',
        path: '/deception',
        description: 'How Islamic teachings deceive followers.',
        date: '2023-08-01',
        coverImage: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'comparison-god-allah',
        title: 'God vs. Allah: A Comparison',
        path: '/comparison-god-allah',
        description: 'Key differences between the Biblical God and Islamic concept of Allah.',
        date: '2023-07-20'
      }
    ]
  },
  "blog": {
    title: "Blog",
    description: "Explore our collection of articles, essays, and resources on Islam, Christianity, and comparative religion topics.",
    documents: [
      {
        id: 'blog-latest',
        title: 'Latest Articles',
        path: '/blog/latest',
        description: 'Read our most recent content covering important topics in comparative religion.',
        date: '2023-06-15',
        coverImage: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'blog-featured',
        title: 'Featured Posts',
        path: '/blog/featured',
        description: 'Discover our most impactful and important writings.',
        date: '2023-06-10',
        coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'blog-categories',
        title: 'Categories',
        path: '/blog/categories',
        description: 'Browse articles by topic or subject area.',
        date: '2023-06-05'
      },
      {
        id: 'blog-archives',
        title: 'Archives',
        path: '/blog/archives',
        description: 'Access our complete library of past articles and resources.',
        date: '2023-06-01'
      },
      {
        id: 'blog-article1',
        title: 'Understanding Islamic Teachings',
        path: '/blog/understanding-islamic-teachings',
        description: 'A comprehensive analysis of core Islamic doctrines and their implications.',
        date: '2023-05-20'
      }
    ]
  },
  "resources": {
    title: "Resources",
    description: "Access valuable resources, guides, and answers to help you understand the truth about Islam and Christianity.",
    documents: [
      {
        id: 'faq',
        title: 'FAQ',
        path: '/faq',
        description: 'Answers to frequently asked questions about Islam and Christianity.',
        date: '2023-09-15'
      },
      {
        id: 'bible',
        title: 'The Bible',
        path: '/bible',
        description: 'Resources for understanding the Bible.',
        date: '2023-09-10',
        coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'christians-to-avoid',
        title: 'Types of "Christians" to Avoid',
        path: '/christians-to-avoid',
        description: 'Guidance on discerning false teachings within Christianity.',
        date: '2023-09-05'
      },
      {
        id: 'common-questions',
        title: 'Common Questions Muslims Ask About Jesus',
        path: '/common-questions',
        description: 'Addressing typical questions and misconceptions.',
        date: '2023-09-01',
        coverImage: 'https://images.unsplash.com/photo-1478198697312-d2dfe68090f6?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 'jesus-not-christianity',
        title: 'Believe in Jesus Christ NOT Christianity',
        path: '/jesus-not-christianity',
        description: 'Understanding the distinction between faith in Jesus and religious systems.',
        date: '2023-08-20'
      },
      {
        id: 'become-christian',
        title: 'What Can I Do Now To Become Christian',
        path: '/become-christian',
        description: 'Practical steps for those seeking to follow Jesus.',
        date: '2023-08-15'
      }
    ]
  },
  "home": {
    title: "Home",
    description: "Welcome to the Islam IsLIES documentation. Here you'll find resources and guides to understand the truth about Islam and Christianity.",
    documents: [
      {
        id: 'getting-started',
        title: 'Welcome',
        path: '/getting-started',
        description: 'Begin your journey with an introduction to the site and its purpose.',
        date: '2023-04-01'
      },
      {
        id: 'gospel',
        title: 'The Gospel',
        path: '/gospel',
        description: 'Learn about the good news of Jesus Christ and salvation.',
        date: '2023-04-05'
      },
      {
        id: 'about',
        title: 'About',
        path: '/about',
        description: 'Learn more about our mission and the people behind this site.',
        date: '2023-04-10'
      },
      {
        id: 'recent-updates',
        title: 'Recent Updates',
        path: '/recent-updates',
        description: 'Stay informed with the latest articles and resources.',
        date: '2023-05-01'
      },
      {
        id: 'support',
        title: 'Support',
        path: '/support',
        description: 'Learn how you can support our mission.',
        date: '2023-05-10'
      }
    ]
  }
};

const FolderOverview: React.FC = () => {
  const { folder } = useParams<{ folder: string }>();
  const [folderMeta, setFolderMeta] = useState<FolderMeta | null>(null);

  useEffect(() => {
    if (folder && folderData[folder]) {
      setFolderMeta(folderData[folder]);
    } else {
      console.error("Folder not found:", folder);
    }
  }, [folder]);

  if (!folder || !folderMeta) {
    return <div className="p-8 text-center">Loading folder content...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: "Home", path: "/" },
          { label: folderMeta.title, path: `/content/${folder}` }
        ]} 
      />
      
      {/* Use the FolderView component to display content */}
      <div className="bg-card/30 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{folderMeta.title}</h1>
        <p className="text-lg mb-8 text-muted-foreground">{folderMeta.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {folderMeta.documents.map((doc) => (
            <div key={doc.id} className="bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {doc.coverImage && (
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={doc.coverImage}
                    alt={doc.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                {doc.date && (
                  <p className="text-xs text-muted-foreground mb-3">
                    {new Date(doc.date).toLocaleDateString()}
                  </p>
                )}
                <a
                  href={doc.path}
                  className="text-primary hover:underline font-medium text-sm inline-flex items-center"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg">
        <SubscribeEmbed />
      </div>
    </div>
  );
};

export default FolderOverview;
