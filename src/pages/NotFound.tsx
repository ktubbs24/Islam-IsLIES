
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronRight, Home } from "lucide-react";

const NotFound = () => {
  const [earthRotating, setEarthRotating] = useState(false);

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      <div className="grid-background opacity-10" aria-hidden="true"></div>
      <div className="stars">
        <div className="custom-navbar flex justify-between items-center p-4">
          <div className="brand-logo">
            <Link to="/">
              <img 
                src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4a1e03-a78a-4508-af5e-9cea2a7dd2d0_1280x1280.png" 
                alt="Logo" 
                width="80px"
                className="rounded-full hover:scale-105 transition-transform"
              />
            </Link>
          </div>
        </div>
        
        <div className="central-body flex flex-col items-center justify-center py-20">
          <div className="text-5xl md:text-7xl font-bold mb-8 text-center">404</div>
          <div className="text-2xl md:text-4xl font-semibold mb-8 text-center text-muted-foreground">Page Not Found</div>
          
          <Link 
            to="/" 
            className="btn-3d px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-all flex items-center gap-2"
          >
            <Home size={20} />
            GO BACK HOME
            <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="objects">
          <img 
            className="object_rocket animate-rocket-movement" 
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzJkYTY1ZiIgZD0iTTguODUsMTUuMnMyLjM0LTUuMjMsMi44LTguMDNDMTEuOSw0Ljc0LDEzLjIxLDMsMTUsMy4yM2MxLjc5LjIzLDIuNTgsMS44NCwyLjQsNC4zNlMxNi4zMSwxNS4yLDE2LjMxLDE1LjJNMTUuMzcsMTBhMiwyLDAsMSwwLTItMkEyLDIsMCwwLDAsMTUuMzcsMTBabTYuMzMsMS40MkwxOC44NCw5LjQybC0yLDIgMi44Niw4LjM2YzAsLjgyLjcxLjU3LDEuNDMuNTcuNzEsMCwxLjQzLjI1LDEuNDMtLjU3Wk03LjUsMTkuNDRBMy45LDMuOSwwLDAsMCw4LjE3LDIyYy43MSwwLDEuNDMuMjUsMS40My0uNTdMMTIuNDYsMTMsOC41LDE3bDIuMzYsLjZNNy4wNSwxNy4xMSwyLDEyLjEyQTEuMjEsMS4yMSwwLDAsMSwyLDEwLjQxTDcuMDUsNS40MnYxMS42OVoiLz48L3N2Zz4=" 
            width="70px"
          />
          
          <div className="earth-moon">
            <img 
              className={`object_earth ${earthRotating ? 'spin-earth-on-hover' : ''}`}
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzJkYTY1ZiIgZD0iTTEyIDJDNi41IDIgMiA2LjUgMiAxMnM0LjUgMTAgMTAgMTAgMTAtNC41IDEwLTEwUzE3LjUgMiAxMiAyem0tMS4yIDEuOGMtLjcuNC0xLjIuOC0xLjggMS4zcy0xLjQgMS42LTIuMiAyLjJjLS41LjQtMSAuOC0xLjMgMS4zLS41LjgtLjcgMS42LS42IDIuOCAwIC4yIDAgLjQuMi42LS4zLjEtLjUuMy0uNy41cy0uMy41LS40LjhjMCAuMi0uMi40LS4zLjZzLS4yLjQtLjIuNmMwIC40LjMuOC41IDEuMS4zLjQuOC42IDEuMi44bC45LjNjLjQuMy45LjYgMS40IDEgLjQuMy44LjYgMS4yLjhzLjkuMiAxLjMuM2MuMiAwIC40LjEuNi4xaC40Yy40IDAgLjgtLjIgMS4yLS40LjQtLjMuOC0uNyAxLjItMSAuMS0uMi4zLS40LjQtLjUgMC0uMi0uMS0uNC0uMS0uNnYtLjhjMC0uNC0uMS0uOC0uMi0xLjIgMC0uNS0uMS0xLS4xLTEuNXYtLjhsLjEtLjZjLjEtLjUuMy0xIC41LTEuNC4xLS41LjItLjguMS0xLjIgMC0uNS0uMS0uOC0uMi0xLjFsLS40LTFjLS4yLS4zLS4zLS41LS41LS43LS4zLS4zLS42LS41LTEtLjgtLjQtLjItLjgtLjUtMS4yLS42aC0uMWMtLjEgMC0uMiAwLS4zLS4yaC0uNmMtLjIgMC0uMyAwLS41LjFzLS4zLjMtLjUuNGMtLjMuMi0uNi40LS44Ljd6Ii8+PC9zdmc+" 
              width="100px"
              onMouseOver={() => setEarthRotating(true)}
            />
          </div>
          
          <div className="box_astronaut absolute top-[60%] right-[20%] animate-move-astronaut">
            <img 
              className="object_astronaut animate-rotate-astronaut" 
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTIxLjQ0IDE3LjU1Yy4yLjQxLjE4LjkzLS4wNyAxLjNhMi41IDIuNSAwIDAgMS0uNzkuOGMtLjU0LjM0LTEuMi40NS0xLjgzLjMyYTIuNTggMi41OCAwIDAgMS0xLjgzLTEuODUgMi4yIDIuMiAwIDAgMS0uMDQtLjdoLjEzYTcuOSA3LjkgMCAwIDEtLjk2LTUuNjUgMTUuOS0uMi41Mi0uNTQuOTQtMS4wMS42NkwtMi4zIDE3Yy0uMyAxLjM4LS4xNyAyLjE3LS4wNCAyLjYzbC4wNC4xOGMuMDUuMTguMTIuMzUuMi41MS4yMy40Ni41Ni44NS45NiAxLjE0YTMgMyAwIDAgMCAxLjgxLjY2YzEuMDkgMCAyLjE3LS40MyAzLjA2LTEuMjEuODktLjc5IDEuNy0xLjkyIDIuMy0zLjI4bC4yNi0uNTkuMTMtLjMzLjAyLS4wNC4xNi4wMy0uMDIuMDRMNS41IDE3LjVsLS4yNi42QzQuMzYgMTkuNTEgMy41MiAyMC42NyAyLjUgMjEuNTdhNy4wNiA3LjA2IDAgMCAxLTMuNzUgMS40M0E0LjI1IDQuMjUgMCAwIDEtMy44IDIyYTQgNCAwIDAgMS0xLjM2LS41MyA0LjI1IDQuMjUgMCAwIDEtMS4yLTFBMy41OCAzLjU4IDAgMCAxLTcgMTkuMTJjLS4xLS4yMy0uMTctLjQ3LS4yMi0uNzJhNiA2IDAgMCAxLS4wNi0uODZsLS4wMi0uMmMtLjEyLS40Ni0uMzctMS40Ni4wMi0zLjA4YTcuNiA3LjYgMCAwIDEgMTAuMjItNC4yMyA3LjggNy44IDAgMCAxIC45IDUuNTZoLjA3YzEuMDcuMSAyLjEuNjYgMi42IDEuNTguMzYuNjguMzggMS40OS4yNSAyLjE4em0tMS44MyAxLjdoLjAyYy40Mi4xLjg3IDAgMS4yNS0uMjNhMS43IDEuNyAwIDAgMCAuNTUtLjU1Yy4xNS0uMjQuMTctLjUyLjA1LS43OGExLjkgMS45IDAgMCAwLTEuODktMS4xMmgtLjExbC42NyAxLjE2LS43LjQtLjY3LTEuMTZjLS40Ny4wOS0uODUuMzUtMS4xLjczYS45OS45OSAwIDAgMCAuMTYgMS4yNWMuMjkuMjQuNy4zNyAxLjA5LjMyek0tLjUyIDEyLjMzbC41LS44N2MuNDgtLjgzIDEuMDctMS41OCAxLjcyLTIuMTRhNS41IDUuNSAwIDAgMSA1LjkxLS43NmMxLjU0LjggMi43NCAyLjQgMy4yIDQuMzZMMTEgMTQuMDh2LjA0bC0uMTYtLjAzdi0uMDRsLS4xOS0xLjJjLS40LTEuNzQtMS40OS0zLjE1LTIuODctMy44NkE0LjYzIDQuNjMgMCAwIDAgMiA5Ljc3Yy0xLjMyLjc4LTIuNDggMi4yNS0zLjEgMy43OGwtLjUuODdjLS4xLjE3LS4yLjMzLS4yOC41YTUuODIgNS44MiAwIDAgMCAzLjMgOC40MyA1Ljk0IDUuOTQgMCAwIDAgNC42LS4yMiA1LjggNS44IDAgMCAwIDIuNjMtNy4yOSA1LjgzIDUuODMgMCAwIDAtMS4xLTEuNzhsLjcyLS4zOGMuNDcuNjMuODQgMS4zNyAxLjA3IDIuMmE2LjggNi44IDAgMCAxLTMuMDcgOC41IDYuODcgNi44NyAwIDAgMS01LjM0LjI2QTYuNzggNi43OCAwIDAgMSLTMuODEgMTMuMzJjLjEtLjIzLjIxLS40NC4zNC0uNjRsLjA2LS4wOXYtLjAxYy4wMy0uMDUuMDYtLjEuMS0uMTUuMDEtLjAyLjAzLS4wNC4wNC0uMDYuMDYtLjEuMS0uMTcuMTctLjI0LjAyLS4wMi4wMy0uMDQuMDQtLjA2LjA4LS4xMS4xNi0uMjIuMjQtLjMybC4wNC0uMDVjLjA2LS4wNy4xMi0uMTMuMTgtLjIuMDItLjAyLjA0LS4wNS4wNi0uMDdzLjA1LS4wNi4wOC0uMDljLjAzLS4wMi4wNS0uMDUuMDgtLjA3em03Ljk1LTguNTRhMi43NiAyLjc2IDAgMSAxIDUuNTMgMCAyLjc2IDIuNzYgMCAwIDEtNS41MyAwem0yLjc2LTExLjRDNC43NC03LjYxIDAgLTIuODcgMCA0LjczYzAgNy42MSA0Ljc0IDEyLjM1IDEyLjM1IDEyLjM1IDcuNiAwIDEyLjM1LTQuNzQgMTIuMzUtMTIuMzVDMjQuNy03LjYxIDE5Ljk1LTcuNjEgMTIuMzUtNy42MXptMCA4LjMyYTIuMDYgMi4wNiAwIDEgMCAwIDQuMTIgMi4wNiAyLjA2IDAgMCAwIDAtNC4xMnoiLz48L3N2Zz4=" 
              width="140px"
            />
          </div>
        </div>
        
        <div className="glowing_stars absolute inset-0 overflow-hidden">
          <div className="star absolute w-2 h-2 bg-white rounded-full animate-[glow-star_2s_infinite_ease-in-out_alternate_1s] opacity-30" style={{ top: '80%', left: '25%' }}></div>
          <div className="star absolute w-2 h-2 bg-white rounded-full animate-[glow-star_2s_infinite_ease-in-out_alternate_3s] opacity-30" style={{ top: '20%', left: '40%' }}></div>
          <div className="star absolute w-2 h-2 bg-white rounded-full animate-[glow-star_2s_infinite_ease-in-out_alternate_5s] opacity-30" style={{ top: '25%', left: '25%' }}></div>
          <div className="star absolute w-2 h-2 bg-white rounded-full animate-[glow-star_2s_infinite_ease-in-out_alternate_7s] opacity-30" style={{ top: '75%', left: '80%' }}></div>
          <div className="star absolute w-2 h-2 bg-white rounded-full animate-[glow-star_2s_infinite_ease-in-out_alternate_9s] opacity-30" style={{ top: '90%', left: '50%' }}></div>
        </div>
        
        {/* SVG Animation */}
        <div className="absolute left-0 right-0 bottom-0 h-20 opacity-30">
          <svg viewBox="0 0 1440 320" className="w-full">
            <path 
              fill="rgba(45, 166, 95, 0.6)" 
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,170.7C960,160,1056,192,1152,213.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-pulse"
            >
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
