
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface DocSummary {
  title: string;
  path: string;
  excerpt: string;
  date: string;
}

// In a real app, this would come from a central data source
const docsByTag: Record<string, DocSummary[]> = {
  "jesus-divinity": [
    {
      title: "Jesus Doesn't Deny Himself",
      path: "/biblical-truths/jesus-doesnt-deny-himself",
      excerpt: "Examining how Jesus' statement about only God being good does not contradict His divinity.",
      date: "April 7, 2025"
    },
    {
      title: "Scripture Analysis of Jesus's Divinity",
      path: "/biblical-truths/scripture-analysis",
      excerpt: "A deep dive into Biblical verses affirming the divinity of Christ.",
      date: "March 25, 2025"
    }
  ],
  "scripture-analysis": [
    {
      title: "Jesus Doesn't Deny Himself",
      path: "/biblical-truths/jesus-doesnt-deny-himself",
      excerpt: "Examining how Jesus' statement about only God being good does not contradict His divinity.",
      date: "April 7, 2025"
    },
    {
      title: "Scripture Analysis of Jesus's Divinity",
      path: "/biblical-truths/scripture-analysis",
      excerpt: "A deep dive into Biblical verses affirming the divinity of Christ.",
      date: "March 25, 2025"
    },
    {
      title: "Bible vs Quran Comparative Study",
      path: "/comparative-studies/bible-vs-quran",
      excerpt: "Examining the key differences between Biblical and Quranic teachings.",
      date: "April 1, 2025"
    }
  ],
  "blog-threads": [
    {
      title: "Jesus Doesn't Deny Himself",
      path: "/biblical-truths/jesus-doesnt-deny-himself",
      excerpt: "Examining how Jesus' statement about only God being good does not contradict His divinity.",
      date: "April 7, 2025"
    }
  ]
};

const TagPage = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const [documents, setDocuments] = useState<DocSummary[]>([]);
  
  useEffect(() => {
    if (tagName) {
      const normalizedTagName = tagName.replace('-', '/');
      const docs = docsByTag[tagName] || [];
      setDocuments(docs);
    }
  }, [tagName]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Documents tagged with "{tagName?.replace('-', '/')}"
          </h1>
          <p className="text-muted-foreground">
            Showing {documents.length} document{documents.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>
      
      {documents.length > 0 ? (
        <div className="grid gap-6">
          {documents.map((doc, i) => (
            <Link
              key={i}
              to={doc.path}
              className="flex flex-col sm:flex-row gap-4 items-start rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="min-w-[120px] text-sm text-muted-foreground">
                {doc.date}
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1 text-foreground">{doc.title}</h3>
                <p className="text-sm text-muted-foreground">{doc.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No documents found with this tag.</p>
        </div>
      )}
    </div>
  );
};

export default TagPage;
