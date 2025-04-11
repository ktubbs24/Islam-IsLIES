
import { Link } from "react-router-dom";

const FAQPage = () => {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Common questions about Christianity, Jesus, and Biblical truths
          </p>
        </div>
      </section>
      
      <section className="space-y-8">
        <div className="grid gap-6">
          {[
            {
              question: "Did Jesus claim to be God?",
              answer: "Jesus made numerous direct and indirect claims to deity throughout the Gospels.",
              link: "/biblical-truths/jesus-divinity"
            },
            {
              question: "Is the Bible corrupted as Muslims claim?",
              answer: "Historical and textual evidence strongly contradicts the Muslim claim of Biblical corruption.",
              link: "/comparative-studies/bible-vs-quran"
            },
            {
              question: "If Jesus is God, why did He say 'only God is good'?",
              answer: "Jesus wasn't denying His divinity but was challenging the rich young ruler's understanding.",
              link: "/biblical-truths/jesus-doesnt-deny-himself"
            },
            {
              question: "Can Jesus be both God and man?",
              answer: "Scripture affirms that Jesus possesses both a divine and human nature.",
              link: "/biblical-truths/scripture-analysis"
            },
            {
              question: "How can God be one and three at the same time?",
              answer: "The Trinity is one God existing in three persons, distinct but not divided.",
              link: "/biblical-truths/scripture-analysis"
            },
            {
              question: "Why do Christians believe the Bible is God's word?",
              answer: "Multiple evidences including prophecy fulfillment, historical accuracy, and internal consistency.",
              link: "/comparative-studies/bible-vs-quran"
            }
          ].map((item, i) => (
            <div key={i} className="rounded-lg border p-6 hover:bg-muted/50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
              <p className="text-muted-foreground mb-4">{item.answer}</p>
              <Link to={item.link} className="custom-link text-primary">
                Read full answer
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
