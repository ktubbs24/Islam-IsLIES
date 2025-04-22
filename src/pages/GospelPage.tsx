
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DocPage from "@/components/DocPage";

const GospelPage = () => {
  return (
    <DocPage
      title="The Gospel of Jesus Christ"
      publishDate="2025-04-01"
      disclaimer="Scripture's message of salvation through faith in Christ."
      tags={["gospel", "salvation", "faith"]}
      excludeNavigation={true}
    >
      <h2>The Gospel According to Scripture</h2>
      
      <p>The word "gospel" means "good news." The gospel of Jesus Christ is the good news that God has provided a way for sinful humans to be reconciled to Him through the perfect life, sacrificial death, and victorious resurrection of His Son.</p>
      
      <h3>The Problem: Sin and Separation</h3>
      
      <blockquote>
        "For all have sinned and fall short of the glory of God." <cite>Romans 3:23</cite>
      </blockquote>
      
      <blockquote>
        "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord." <cite>Romans 6:23</cite>
      </blockquote>
      
      <p>Scripture teaches that every person has violated God's perfect standard. As a result, we deserve God's just punishment, which is spiritual death and eternal separation from Him.</p>
      
      <h3>The Solution: Jesus Christ</h3>
      
      <blockquote>
        "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." <cite>Romans 5:8</cite>
      </blockquote>
      
      <blockquote>
        "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." <cite>John 3:16</cite>
      </blockquote>
      
      <p>Jesus Christ, who is fully God and fully man, lived a sinless life and died on the cross as our substitute, taking upon Himself the punishment we deserve. Three days later, He rose from the dead, demonstrating His victory over sin and death.</p>
      
      <h3>The Response: Faith and Repentance</h3>
      
      <blockquote>
        "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved." <cite>Romans 10:9</cite>
      </blockquote>
      
      <blockquote>
        "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast." <cite>Ephesians 2:8-9</cite>
      </blockquote>
      
      <p>Salvation is received through faith in Jesus Christ. This saving faith involves:</p>
      
      <ol>
        <li><strong>Knowledge</strong> - Understanding who Jesus is and what He has done</li>
        <li><strong>Agreement</strong> - Accepting these truths as factual</li>
        <li><strong>Trust</strong> - Personally relying on Jesus alone for salvation</li>
        <li><strong>Repentance</strong> - Turning from sin toward God</li>
      </ol>
      
      <h3>The Result: New Life in Christ</h3>
      
      <blockquote>
        "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" <cite>2 Corinthians 5:17</cite>
      </blockquote>
      
      <blockquote>
        "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me." <cite>Galatians 2:20</cite>
      </blockquote>
      
      <p>Those who place their faith in Christ are forgiven of their sins, declared righteous before God, adopted into God's family, indwelt by the Holy Spirit, and given eternal life. This new relationship with God transforms how we live.</p>
      
      <h2>How to Receive Christ</h2>
      
      <p>If the Holy Spirit is drawing you to faith in Christ, you can respond to Him right now through prayer. Prayer is simply talking to God. He knows your heart, so what matters is not the exact words but the sincerity of your faith.</p>
      
      <p>You might pray something like this:</p>
      
      <blockquote>
        "Lord Jesus, I confess that I am a sinner in need of Your grace. I believe You died on the cross to pay for my sins and rose from the dead to give me eternal life. I turn from my sin and place my trust in You alone for salvation. Thank You for forgiving my sins and making me a child of God. Help me to follow You as Lord of my life. Amen."
      </blockquote>
    </DocPage>
  );
};

export default GospelPage;
