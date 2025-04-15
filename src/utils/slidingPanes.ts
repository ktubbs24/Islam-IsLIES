
/**
 * Sliding panes functionality for wiki-style navigation
 */

let paneStack: HTMLElement[] = [];

export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const initSlidingPanes = (): void => {
  document.addEventListener('click', function(event) {
    const target = event.target as HTMLElement;
    
    // Check if the clicked element is a slide-link or a parent of it
    const linkElement = target.closest('a.slide-link');
    
    if (linkElement) {
      event.preventDefault();
      const targetUrl = linkElement.getAttribute('href') || '';
      const pageTitle = linkElement.textContent || '';

      if (isMobile()) {
        window.location.href = targetUrl;
      } else {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.classList.add('sliding-pane-overlay');
        document.body.appendChild(overlay);
        
        // Create pane
        const newPane = document.createElement('div');
        newPane.classList.add('sliding-pane');
        newPane.innerHTML = `
          <div class="pane-title-bar">
            <button class="close-pane">×</button>
            <div class="vertical-title">${pageTitle}</div>
          </div>
          <iframe src="${targetUrl}" title="${pageTitle}" style="flex-grow: 1;"></iframe>
        `;
        document.body.appendChild(newPane);

        // Add to stack and position it
        const stackLength = paneStack.length;
        newPane.style.zIndex = (stackLength + 100).toString();
        paneStack.push(newPane);
        
        // Show with animation
        setTimeout(() => {
          overlay.classList.add('is-open');
          newPane.classList.add('is-open');
        }, 10);

        // Handle close button
        newPane.querySelector('.close-pane')?.addEventListener('click', () => {
          overlay.classList.remove('is-open');
          newPane.classList.remove('is-open');
          
          setTimeout(() => {
            overlay.remove();
            newPane.remove();
            paneStack = paneStack.filter(pane => pane !== newPane);
          }, 300);
        });

        // Close on overlay click
        overlay.addEventListener('click', () => {
          overlay.classList.remove('is-open');
          newPane.classList.remove('is-open');
          
          setTimeout(() => {
            overlay.remove();
            newPane.remove();
            paneStack = paneStack.filter(pane => pane !== newPane);
          }, 300);
        });

        // Bring pane to front when clicked
        newPane.addEventListener('click', (e) => {
          if (!(e.target as HTMLElement).closest('.close-pane')) {
            paneStack = paneStack.filter(pane => pane !== newPane);
            paneStack.push(newPane);
            
            // Update z-index for all panes
            paneStack.forEach((pane, index) => {
              pane.style.zIndex = (index + 100).toString();
            });
          }
        });
      }
    }
  });
};

export const initHoverPreviews = (): void => {
  let previewTimeout: number | null = null;
  let currentPreview: HTMLElement | null = null;
  
  document.addEventListener('mouseover', function(event) {
    const target = event.target as HTMLElement;
    const linkElement = target.closest('a.slide-link');
    
    if (linkElement) {
      // Clear any existing timeout
      if (previewTimeout) {
        clearTimeout(previewTimeout);
      }
      
      // Set a small delay before showing preview
      previewTimeout = window.setTimeout(() => {
        if (currentPreview) {
          currentPreview.remove();
          currentPreview = null;
        }
        
        const targetUrl = linkElement.getAttribute('href') || '';
        const preview = document.createElement('div');
        preview.classList.add('preview-pane');
        preview.innerHTML = `<iframe src="${targetUrl}" title="Preview"></iframe>`;
        document.body.appendChild(preview);
        currentPreview = preview;

        // Position the preview near the mouse
        const rect = linkElement.getBoundingClientRect();
        preview.style.left = `${rect.right + 10}px`;
        preview.style.top = `${rect.top}px`;

        // Handle overflow
        const previewRect = preview.getBoundingClientRect();
        if (previewRect.right > window.innerWidth) {
          preview.style.left = `${rect.left - previewRect.width - 10}px`;
        }
        if (previewRect.bottom > window.innerHeight) {
          preview.style.top = `${rect.bottom - previewRect.height}px`;
        }
      }, 300);
    }
  });

  document.addEventListener('mouseout', function(event) {
    const target = event.target as HTMLElement;
    const linkElement = target.closest('a.slide-link');
    
    if (linkElement) {
      // Clear the timeout when moving away
      if (previewTimeout) {
        clearTimeout(previewTimeout);
        previewTimeout = null;
      }
      
      // Remove the preview after a short delay
      setTimeout(() => {
        if (currentPreview) {
          const preview = currentPreview;
          preview.style.opacity = '0';
          
          setTimeout(() => {
            if (preview === currentPreview) {
              currentPreview = null;
            }
            preview.remove();
          }, 200);
        }
      }, 300);
    }
  });
};
