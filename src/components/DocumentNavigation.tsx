import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DocumentNavigationProps {
  prevDoc?: {
    path: string;
    title: string;
  };
  nextDoc?: {
    path: string;
    title: string;
  };
}

const DocumentNavigation: React.FC<DocumentNavigationProps> = ({
  prevDoc,
  nextDoc,
}) => {
  if (!prevDoc && !nextDoc) return null;

  return (
    <div className="page-navigation">
      {prevDoc && (
        <Link to={prevDoc.path} className="page-navigation-link prev">
          <ArrowLeft />
          <div>
            <div className="label">Previous</div>
            <div className="title">{prevDoc.title}</div>
          </div>
        </Link>
      )}
      
      {nextDoc && (
        <Link to={nextDoc.path} className="page-navigation-link next">
          <div>
            <div className="label">Next</div>
            <div className="title">{nextDoc.title}</div>
          </div>
          <ArrowRight />
        </Link>
      )}
      
      <style>
        {`
          .page-navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
          }
          
          .page-navigation-link {
            display: flex;
            align-items: center;
            color: var(--foreground);
            text-decoration: none;
            transition: all 0.3s ease;
          }
          
          .page-navigation-link:hover {
            color: var(--primary);
          }
          
          .page-navigation-link svg {
            height: 1rem;
            width: 1rem;
          }
          
          .page-navigation-link .title {
            font-weight: 500;
          }
          
          .page-navigation-link .label {
            font-size: 0.8rem;
            opacity: 0.8;
          }
          
          .page-navigation-link.prev {
            margin-right: auto;
          }
          
          .page-navigation-link.next {
            margin-left: auto;
            text-align: right;
          }
          
          .page-navigation-link.prev .title {
            margin-left: 0.5rem;
          }
          
          .page-navigation-link.next .title {
            margin-right: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default DocumentNavigation;
