
import React from 'react';
import SlidingPane from './SlidingPane';
import { useSlidingPanes } from '@/hooks/use-sliding-panes';

const SlidingPaneManager: React.FC = () => {
  const { panes, closePane, focusPane } = useSlidingPanes();

  return (
    <>
      {panes.map((pane, index) => (
        <SlidingPane
          key={pane.id}
          url={pane.url}
          title={pane.title}
          index={index}
          zIndex={index + 1}
          onClose={() => closePane(pane.id)}
          onFocus={() => focusPane(pane.id)}
        />
      ))}
    </>
  );
};

export default SlidingPaneManager;
