
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PaneInfo {
  url: string;
  title: string;
  id: string;
}

export const useSlidingPanes = () => {
  const [panes, setPanes] = useState<PaneInfo[]>([]);
  const location = useLocation();

  // Reset panes when navigating to a new page
  useEffect(() => {
    setPanes([]);
  }, [location.pathname]);

  const isMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  const openPane = useCallback((url: string, title: string) => {
    if (isMobile()) {
      // Mobile fallback - simply navigate
      window.location.href = url;
      return;
    }

    const paneId = `pane-${Date.now()}`;
    setPanes(prevPanes => {
      // Check if this pane is already open
      const exists = prevPanes.find(p => p.url === url);
      if (exists) {
        // Bring it to front
        return [
          ...prevPanes.filter(p => p.url !== url),
          exists
        ];
      } else {
        // Add new pane
        return [...prevPanes, { url, title, id: paneId }];
      }
    });
  }, [isMobile]);

  const closePane = useCallback((id: string) => {
    setPanes(prevPanes => prevPanes.filter(pane => pane.id !== id));
  }, []);

  const focusPane = useCallback((id: string) => {
    setPanes(prevPanes => {
      const pane = prevPanes.find(p => p.id === id);
      if (!pane) return prevPanes;
      return [...prevPanes.filter(p => p.id !== id), pane];
    });
  }, []);

  return {
    panes,
    openPane,
    closePane,
    focusPane,
    isMobile
  };
};
