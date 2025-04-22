import React from "react";
import { GetStaticPropsContext } from "next";
import FolderView from "@/components/FolderView";
import SubscribeEmbed from "@/components/SubscribeEmbed";

// Data for each folder
const folderData: Record<
  string,
  { title: string; description: string; documents: any[] }
> = {
  blog: {
    title: "Blog",
    description:
      "Explore our collection of articles, essays, and resources on Islam, Christianity, and comparative religion topics.",
    documents: [
      {
        id: "blog-latest",
        title: "Latest Articles",
        path: "/content/blog/latest",
        description:
          "Read our most recent content covering important topics in comparative religion.",
        date: "2023-06-15",
        coverImage:
          "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "blog-featured",
        title: "Featured Posts",
        path: "/content/blog/featured",
        description: "Discover our most impactful and important writings.",
        date: "2023-06-10",
        coverImage:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "blog-categories",
        title: "Categories",
        path: "/content/blog/categories",
        description: "Browse articles by topic or subject area.",
        date: "2023-06-05",
      },
      {
        id: "blog-archives",
        title: "Archives",
        path: "/content/blog/archives",
        description: "Access our complete library of past articles and resources.",
        date: "2023-06-01",
      },
      {
        id: "blog-article1",
        title: "Understanding Islamic Teachings",
        path: "/content/blog/understanding-islamic-teachings",
        description:
          "A comprehensive analysis of core Islamic doctrines and their implications.",
        date: "2023-05-20",
      },
    ],
  },
  resources: {
    title: "Resources",
    description:
      "Access valuable resources, guides, and answers to help you understand the truth about Islam and Christianity.",
    documents: [
      {
        id: "faq",
        title: "FAQ",
        path: "/content/resources/faq",
        description:
          "Answers to frequently asked questions about Islam and Christianity.",
        date: "2023-09-15",
      },
      {
        id: "bible",
        title: "The Bible",
        path: "/content/resources/bible",
        description: "Resources for understanding the Bible.",
        date: "2023-09-10",
        coverImage:
          "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "christians-to-avoid",
        title: 'Types of "Christians" to Avoid',
        path: "/content/resources/christians-to-avoid",
        description:
          "Guidance on discerning false teachings within Christianity.",
        date: "2023-09-05",
      },
      {
        id: "common-questions",
        title: "Common Questions Muslims Ask About Jesus",
        path: "/content/resources/common-questions",
        description: "Addressing typical questions and misconceptions.",
        date: "2023-09-01",
        coverImage:
          "https://images.unsplash.com/photo-1478198697312-d2dfe68090f6?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "jesus-not-christianity",
        title: "Believe in Jesus Christ NOT Christianity",
        path: "/content/resources/jesus-not-christianity",
        description:
          "Understanding the distinction between faith in Jesus and religious systems.",
        date: "2023-08-20",
      },
      {
        id: "become-christian",
        title: "What Can I Do Now To Become Christian",
        path: "/content/resources/become-christian",
        description: "Practical steps for those seeking to follow Jesus.",
        date: "2023-08-15",
      },
    ],
  },
  "faith-in-allah": {
    title: "Faith In Allah Leads To Lies",
    description: "Explore how faith in Allah leads to spiritual deception and falsehood.",
    documents: [
      {
        id: "allah",
        title: "Allah",
        path: "/content/faith-in-allah/allah",
        description: "Understanding the concept of Allah in Islam.",
        date: "2023-08-15",
        coverImage:
          "https://images.unsplash.com/photo-1629173708824-fbb80836848b?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "satan",
        title: "Satan",
        path: "/content/faith-in-allah/satan",
        description: "The connection between demonic influence and Islamic teachings.",
        date: "2023-08-10",
      },
      {
        id: "false-prophets",
        title: "False Prophets/Teachers",
        path: "/content/faith-in-allah/false-prophets",
        description: "Examining false prophets and teachers throughout history.",
        date: "2023-08-05",
      },
      {
        id: "deception",
        title: "The Great Deception",
        path: "/content/faith-in-allah/deception",
        description: "How Islamic teachings deceive followers.",
        date: "2023-08-01",
        coverImage:
          "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "comparison-god-allah",
        title: "God vs. Allah: A Comparison",
        path: "/content/faith-in-allah/comparison-god-allah",
        description:
          "Key differences between the Biblical God and Islamic concept of Allah.",
        date: "2023-07-20",
      },
    ],
  },
  "faith-in-jesus": {
    title: "Faith In Jesus Leads To Salvation",
    description:
      "Explore how faith in Jesus Christ is the path to salvation, with insights from Scripture and theological explanations.",
    documents: [
      {
        id: "jesus",
        title: "Jesus",
        path: "/content/faith-in-jesus/jesus",
        description:
          "Understand who Jesus is, what He claimed, and why He is central to salvation.",
        date: "2023-03-15",
        coverImage:
          "https://images.unsplash.com/photo-1602736692223-9280cd6e2c65?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "works",
        title: "Works",
        path: "/content/faith-in-jesus/works",
        description: "Explore the relationship between faith and works in salvation.",
        date: "2023-03-10",
      },
      {
        id: "sheep",
        title: "Sheep",
        path: "/content/faith-in-jesus/sheep",
        description:
          "Learn about Jesus as the Good Shepherd and believers as His sheep.",
        date: "2023-03-05",
      },
      {
        id: "salvation",
        title: "Salvation",
        path: "/content/faith-in-jesus/salvation",
        description:
          "Understand the concept of salvation through faith in Jesus Christ.",
        date: "2023-03-01",
        coverImage:
          "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "scriptures",
        title: "Scriptures",
        path: "/content/faith-in-jesus/scriptures",
        description:
          "Examine key Bible verses about faith, salvation, and Jesus Christ.",
        date: "2023-02-20",
      },
    ],
  },
  "faith-in-mohammad": {
    title: "Faith In Mohammad Leads To Damnation",
    description:
      "Analysis of Islamic teachings and why faith in Mohammad leads away from true salvation.",
    documents: [
      {
        id: "islam",
        title: "Islam",
        path: "/content/faith-in-mohammad/islam",
        description: "An overview of Islam and its teachings.",
        date: "2023-07-15",
        coverImage:
          "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "quran",
        title: "The Quran",
        path: "/content/faith-in-mohammad/quran",
        description: "Analysis of the Quran and its contradictions.",
        date: "2023-07-10",
      },
      {
        id: "shahada",
        title: "The Shahada",
        path: "/content/faith-in-mohammad/shahada",
        description:
          "Understand the Islamic declaration of faith and its implications.",
        date: "2023-07-05",
      },
      {
        id: "mohammad",
        title: "Mohammad",
        path: "/content/faith-in-mohammad/mohammad",
        description: "The life and teachings of Mohammad examined critically.",
        date: "2023-07-01",
        coverImage:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "islamic-salvation",
        title: "Salvation in Islam",
        path: "/content/faith-in-mohammad/islamic-salvation",
        description:
          "How Islamic concepts of salvation differ from Christian teachings.",
        date: "2023-06-20",
      },
    ],
  },
  home: {
    title: "Home",
    description:
      "Welcome to the Islam IsLIES documentation. Here you'll find resources and guides to understand the truth about Islam and Christianity.",
    documents: [
      {
        id: "getting-started",
        title: "Welcome",
        path: "/content/home/getting-started",
        description:
          "Begin your journey with an introduction to the site and its purpose.",
        date: "2023-04-01",
      },
      {
        id: "gospel",
        title: "The Gospel",
        path: "/content/home/gospel",
        description: "Learn about the good news of Jesus Christ and salvation.",
        date: "2023-04-05",
      },
      {
        id: "about",
        title: "About",
        path: "/content/home/about",
        description: "Learn more about our mission and the people behind this site.",
        date: "2023-04-10",
      },
      {
        id: "recent-updates",
        title: "Recent Updates",
        path: "/content/home/recent-updates",
        description: "Stay informed with the latest articles and resources.",
        date: "2023-05-01",
      },
      {
        id: "support",
        title: "Support",
        path: "/content/home/support",
        description: "Learn how you can support our mission.",
        date: "2023-05-10",
      },
    ],
  },
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { folder } = context.params as { folder: string };

  // Check if the folder exists in folderData
  const folderMeta = folderData[folder];
  if (!folderMeta) {
    return { notFound: true };
  }

  // Return the folder's metadata
  return {
    props: {
      folder,
      folderMeta,
    },
  };
}

export async function getStaticPaths() {
  const paths = Object.keys(folderData).map((folder) => ({
    params: { folder },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function FolderOverview({
  folder,
  folderMeta,
}: {
  folder: string;
  folderMeta: { title: string; description: string; documents: any[] };
}) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Folder Overview Section */}
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <FolderView
          title={folderMeta.title}
          description={folderMeta.description}
          documents={folderMeta.documents}
        />
      </div>

      {/* Subscribe Section */}
      <div className="text-container mt-10 bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <SubscribeEmbed />
      </div>
    </div>
  );
}