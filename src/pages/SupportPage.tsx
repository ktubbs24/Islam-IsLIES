
import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Heart, Coffee } from 'lucide-react';
import DocPage from '@/components/DocPage';

const SupportPage = () => {
  return (
    <DocPage
      title="Support Our Mission"
      publishDate="2025-04-01"
      updateDate="2025-04-15"
      excludeNavigation={true}
      tags={["support", "donate", "mission"]}
    >
      <div className="space-y-8">
        <p className="lead-text">
          Your support helps us continue our mission to share the truth about Jesus Christ and expose the lies of Islam. Every contribution, whether financial or through prayer, makes a significant impact.
        </p>
        
        <h2 className="mt-8">Ways to Support</h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="support-card">
            <div className="icon-container">
              <DollarSign size={28} className="support-icon" />
            </div>
            <h3>Financial Support</h3>
            <p>Your generous donations help cover website hosting costs, resource development, translation efforts, and outreach initiatives.</p>
            <a href="#" className="support-button">
              Donate Now
            </a>
          </div>
          
          <div className="support-card">
            <div className="icon-container">
              <Heart size={28} className="support-icon" />
            </div>
            <h3>Prayer Support</h3>
            <p>Please pray for our team, for those seeking truth, for the persecuted Christians in Muslim-majority nations, and for Muslims to find Christ.</p>
            <Link to="/prayer-requests" className="support-button">
              Prayer Requests
            </Link>
          </div>
          
          <div className="support-card">
            <div className="icon-container">
              <Coffee size={28} className="support-icon" />
            </div>
            <h3>Buy Me a Coffee</h3>
            <p>A simple way to show your support is through a one-time "coffee" donation that helps fuel our ongoing work.</p>
            <a href="#" className="support-button">
              Buy a Coffee
            </a>
          </div>
        </div>
        
        <h2 className="mt-12">Where Your Support Goes</h2>
        
        <ul className="support-list">
          <li>Website maintenance and expansion</li>
          <li>Creation of new content exposing Islamic deception</li>
          <li>Development of resources for Muslims seeking truth</li>
          <li>Support for converts from Islam facing persecution</li>
          <li>Outreach initiatives to Muslim communities</li>
          <li>Translation of materials into languages spoken in Muslim-majority regions</li>
        </ul>
        
        <div className="testimonial-section">
          <h3>Impact of Your Support</h3>
          <blockquote>
            "Your resources helped me see the truth about Jesus after years of being deceived by Islamic teachings. Thank you for being a light in the darkness."
            <cite>— Former Muslim from Pakistan</cite>
          </blockquote>
        </div>
        
        <h2 className="mt-12">Financial Transparency</h2>
        <p>We are committed to complete transparency in how we use donations. A detailed breakdown of our expenditures is available upon request to donors. All funds go directly toward ministry work, with no excessive administrative costs.</p>
        
        <div className="contact-section">
          <h3>Questions About Supporting?</h3>
          <p>If you have any questions about donating or other ways to support our mission, please don't hesitate to <Link to="/contact" className="contact-link">contact us</Link>.</p>
        </div>
      </div>

      <style>
        {`
        .lead-text {
          font-size: 1.2rem;
          line-height: 1.8;
        }
        
        .support-card {
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .support-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 15px rgba(45, 166, 95, 0.2);
        }
        
        .icon-container {
          width: 60px;
          height: 60px;
          background: rgba(45, 166, 95, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: #2DA65F;
        }
        
        .support-icon {
          transition: transform 0.3s ease;
        }
        
        .support-card:hover .support-icon {
          transform: scale(1.2);
        }
        
        .support-card h3 {
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .support-button {
          margin-top: auto;
          padding: 0.75rem 1.5rem;
          background: rgba(45, 166, 95, 0.1);
          color: #2DA65F;
          border-radius: 0.25rem;
          text-align: center;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
          margin-top: 1rem;
          font-weight: 500;
        }
        
        .support-button:hover {
          background: rgba(45, 166, 95, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(45, 166, 95, 0.15);
        }
        
        .support-list {
          list-style-type: none;
          padding-left: 0;
        }
        
        .support-list li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.75rem;
        }
        
        .support-list li:before {
          content: "✓";
          color: #2DA65F;
          position: absolute;
          left: 0;
        }
        
        .testimonial-section {
          background: rgba(45, 166, 95, 0.05);
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 2rem 0;
          border-left: 4px solid #2DA65F;
        }
        
        .testimonial-section blockquote {
          font-style: italic;
          margin: 0;
          padding: 0;
          border: none;
        }
        
        .testimonial-section cite {
          display: block;
          margin-top: 0.75rem;
          font-weight: 500;
        }
        
        .contact-section {
          background: var(--card);
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-top: 2rem;
        }
        
        .contact-link {
          color: #2DA65F;
          text-decoration: underline;
          transition: all 0.3s ease;
        }
        
        .contact-link:hover {
          color: #228a4e;
        }
        `}
      </style>
    </DocPage>
  );
};

export default SupportPage;
