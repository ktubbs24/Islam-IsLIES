
import DocPage from "./DocPage";

const BibleVsQuranPage = () => {
  return (
    <DocPage
      title="Bible vs Quran: A Comparative Study"
      publishDate="2025-04-01"
      updateDate="2025-04-05"
      imageSrc="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
      tags={["comparative-studies", "bible", "quran"]}
    >
      <h2 id="introduction">Introduction</h2>
      <p>
        This document provides a comparative analysis of key theological differences between Biblical teachings and the Quran, with a focus on the person and nature of Jesus Christ. Understanding these differences is essential for meaningful theological dialogue.
      </p>

      <h2 id="jesus-identity">Jesus's Identity and Nature</h2>
      <h3 id="bible-view">Biblical View</h3>
      <p>
        In the Bible, Jesus is clearly presented as divine. This is evident in numerous passages:
      </p>
      <ul>
        <li>Jesus accepts worship (Matthew 14:33, 28:9)</li>
        <li>Jesus forgives sins (Mark 2:5-7)</li>
        <li>Jesus claims equality with God (John 5:18, 10:30)</li>
        <li>Jesus is identified as the Word/Logos who is God (John 1:1-14)</li>
        <li>Thomas confesses Jesus as "My Lord and my God" (John 20:28)</li>
      </ul>
      
      <h3 id="quran-view">Quranic View</h3>
      <p>
        The Quran presents a fundamentally different view of Jesus:
      </p>
      <ul>
        <li>Jesus is considered a prophet and messenger, but not divine</li>
        <li>The Quran explicitly rejects the Trinity (Surah 5:73)</li>
        <li>Jesus is created like Adam (Surah 3:59)</li>
        <li>The Quran denies Jesus's crucifixion (Surah 4:157-158)</li>
      </ul>

      <h2 id="salvation">Concept of Salvation</h2>
      <h3 id="bible-salvation">Biblical Teaching</h3>
      <p>
        The Bible teaches salvation through faith in Jesus Christ:
      </p>
      <ul>
        <li>Salvation is by grace through faith (Ephesians 2:8-9)</li>
        <li>Jesus's sacrificial death atones for sin (Romans 3:25, 1 John 2:2)</li>
        <li>Jesus is the only way to salvation (John 14:6, Acts 4:12)</li>
        <li>Eternal life is a gift, not earned (Romans 6:23)</li>
      </ul>
      
      <h3 id="quran-salvation">Quranic Teaching</h3>
      <p>
        The Quran presents a works-based approach to salvation:
      </p>
      <ul>
        <li>Salvation depends on faith and good works (Surah 23:102-103)</li>
        <li>Allah's judgment weighs deeds on scales (Surah 21:47)</li>
        <li>No concept of substitutionary atonement</li>
        <li>Human sin does not require divine intervention for forgiveness</li>
      </ul>

      <h2 id="scripture">Scripture and Revelation</h2>
      <h3 id="bible-scripture">Biblical Perspective</h3>
      <p>
        The Bible presents itself as:
      </p>
      <ul>
        <li>God-breathed and profitable for teaching (2 Timothy 3:16-17)</li>
        <li>Written by human authors inspired by the Holy Spirit (2 Peter 1:21)</li>
        <li>Historical development over approximately 1,500 years</li>
        <li>Consisting of 66 books written by approximately 40 authors</li>
      </ul>
      
      <h3 id="quran-scripture">Quranic Perspective</h3>
      <p>
        The Quran claims:
      </p>
      <ul>
        <li>To be the literal, uncreated word of Allah</li>
        <li>To have been revealed to Muhammad over 23 years</li>
        <li>To correct and supersede previous revelations</li>
        <li>That previous scriptures (Torah, Gospels) have been corrupted</li>
      </ul>

      <h2 id="conclusion">Conclusion</h2>
      <p>
        These fundamental differences demonstrate why Biblical Christianity and Islam cannot both be true in their core claims about Jesus Christ. The Biblical view of Jesus's divinity, His sacrificial death, and resurrection are non-negotiable elements of Christian faith that are explicitly rejected in Islamic teaching.
      </p>
      
      <p>
        Understanding these differences is crucial for meaningful theological dialogue and for recognizing why Christians cannot accept the Islamic view of Jesus while remaining faithful to Biblical teaching.
      </p>
    </DocPage>
  );
};

export default BibleVsQuranPage;
