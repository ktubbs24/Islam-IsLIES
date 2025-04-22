
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";

// Define our update types
type UpdateType = "new" | "update";

interface DocUpdate {
  title: string;
  date: string;
  path: string;
  type: UpdateType;
  description: string;
}

const updates: DocUpdate[] = [
  {
    title: "Jesus doesn't deny Himself by saying only God is good",
    date: "2025-04-07",
    path: "/biblical-truths/jesus-doesnt-deny-himself",
    type: "new",
    description: "New analysis of Jesus' conversation with the rich young ruler and its implications for understanding Christ's divinity."
  },
  {
    title: "Bible vs Quran Comparative Study",
    date: "2025-04-05",
    path: "/comparative-studies/bible-vs-quran",
    type: "update",
    description: "Added section on salvation concepts and updated scriptural references."
  },
  {
    title: "Bible vs Quran Comparative Study",
    date: "2025-04-01",
    path: "/comparative-studies/bible-vs-quran",
    type: "new",
    description: "Initial publication comparing key theological differences between Biblical and Quranic teachings."
  },
  {
    title: "About Islam IsLIES",
    date: "2025-04-01",
    path: "/about",
    type: "update",
    description: "Updated mission statement and added new social media links."
  },
  {
    title: "Scripture Analysis of Jesus's Divinity",
    date: "2025-03-30",
    path: "/biblical-truths/scripture-analysis",
    type: "update",
    description: "Added additional scriptural references and expanded apostolic testimony section."
  },
  {
    title: "Scripture Analysis of Jesus's Divinity",
    date: "2025-03-25",
    path: "/biblical-truths/scripture-analysis",
    type: "new",
    description: "Comprehensive examination of Biblical passages affirming Christ's divinity."
  },
  {
    title: "About Islam IsLIES",
    date: "2025-03-15",
    path: "/about",
    type: "new",
    description: "Introduction to the mission and purpose of Islam IsLIES documentation site."
  }
];

const RecentUpdatesPage = () => {
  // Group updates by month
  const groupedUpdates: Record<string, DocUpdate[]> = {};
  
  updates.forEach((update) => {
    const date = new Date(update.date);
    const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!groupedUpdates[month]) {
      groupedUpdates[month] = [];
    }
    
    groupedUpdates[month].push(update);
  });

  return (
    <div className="space-y-8">
      <div>
        <Breadcrumbs title="Recent Updates" />
        <h1 className="text-3xl font-bold tracking-tight mb-2">Recent Updates</h1>
        <p className="text-lg text-muted-foreground">
          The latest additions and changes to our documentation
        </p>
      </div>

      {Object.entries(groupedUpdates).map(([month, monthUpdates]) => (
        <section key={month} className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">{month}</h2>
          <div className="grid gap-4">
            {monthUpdates.map((update, idx) => (
              <Link
                key={`${update.path}-${idx}`}
                to={update.path}
                className="flex flex-col sm:flex-row gap-4 items-start rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-[100px] sm:min-w-[140px]">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{update.date}</span>
                  </div>
                  <span 
                    className={cn(
                      "inline-block mt-2 px-2 py-0.5 text-xs rounded-full",
                      update.type === "new" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {update.type === "new" ? "New" : "Updated"}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1 text-foreground">{update.title}</h3>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                </div>
                <ArrowRight className="hidden sm:block h-5 w-5 text-muted-foreground self-center" />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default RecentUpdatesPage;
