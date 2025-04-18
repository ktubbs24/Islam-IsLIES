import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-text">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn-3d">
        Go back to Home
      </Link>
      
      <style>
        {`
        .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          padding: 2rem;
          text-align: center;
        }
        
        .not-found-code {
          font-size: 8rem;
          font-weight: 800;
          background: linear-gradient(45deg, #2DA65F, #1f7d47);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          padding: 0;
          line-height: 1;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            text-shadow: 0 0 10px rgba(45, 166, 95, 0.2);
          }
          50% {
            text-shadow: 0 0 20px rgba(45, 166, 95, 0.6);
          }
          100% {
            text-shadow: 0 0 10px rgba(45, 166, 95, 0.2);
          }
        }
        
        .not-found-title {
          font-size: 2rem;
          margin: 1rem 0;
        }
        
        .not-found-text {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 1rem auto 2rem;
        }
        
        .not-found-404 {
          max-width: 300px;
          height: auto;
          margin: 2rem;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
            filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
          }
          50% {
            transform: translateY(-10px);
            filter: drop-shadow(0 15px 15px rgba(0, 0, 0, 0.2));
          }
          100% {
            transform: translateY(0px);
            filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
          }
        }
        `}
      </style>
    </div>
  );
};

export default NotFound;
