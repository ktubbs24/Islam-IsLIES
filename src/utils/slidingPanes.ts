/**
 * Sliding panes functionality for wiki-style navigation
 */

import { isMobile } from "./utils"; // Assuming isMobile is defined elsewhere

let paneStack: HTMLElement[] = [];

const isRelativeUrl = (url: string): boolean => {
  return url.startsWith("/") && !url.startsWith("//"); // Allow only relative paths
};

export const initSlidingPanes = (navigate?: (url: string) => void): void => {
  document.addEventListener("click", function (event) {
    const target = event.target as HTMLElement;

    // Check if the clicked element is a slide-link or a parent of it
    const linkElement = target.closest("a.slide-link");

    if (linkElement) {
      event.preventDefault();
      const targetUrl = linkElement.getAttribute("href") || "";

      // Validate the URL
      if (!isRelativeUrl(targetUrl)) {
        console.warn("Invalid or unsafe URL:", targetUrl);
        return; // Stop execution if the URL is invalid
      }

      const pageTitle = linkElement.textContent || "";

      if (isMobile()) {
        // Use navigate function if provided, otherwise fallback to window.location
        if (navigate) {
          navigate(targetUrl);
        } else {
          window.location.href = targetUrl;
        }
      } else {
        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("sliding-pane-overlay");
        overlay.setAttribute("role", "presentation"); // Accessibility
        document.body.appendChild(overlay);

        // Create pane
        const newPane = document.createElement("div");
        newPane.classList.add("sliding-pane");
        newPane.setAttribute("role", "dialog"); // Accessibility
        newPane.setAttribute("aria-labelledby", "pane-title");
        newPane.innerHTML = `
          <div class="pane-title-bar">
            <button class="close-pane" aria-label="Close pane">×</button>
            <div id="pane-title" class="vertical-title">${pageTitle}</div>
          </div>
          <iframe src="${targetUrl}" title="${pageTitle}" style="flex-grow: 1;" onerror="this.contentDocument.body.innerHTML = '<p>Content not found</p>';"></iframe>
        `;
        document.body.appendChild(newPane);

        // Add to stack and position it
        const stackLength = paneStack.length;
        newPane.style.zIndex = (stackLength + 100).toString();
        paneStack.push(newPane);

        // Show with animation
        setTimeout(() => {
          overlay.classList.add("is-open");
          newPane.classList.add("is-open");
          disableScroll(); // Disable scrolling when pane is open
        }, 10);

        // Handle close button
        const closeButton = newPane.querySelector(".close-pane");
        closeButton?.addEventListener("click", () => {
          closePane(newPane, overlay);
        });

        // Close on overlay click
        overlay.addEventListener("click", () => {
          closePane(newPane, overlay);
        });

        // Bring pane to front when clicked
        newPane.addEventListener("click", (e) => {
          if (!(e.target as HTMLElement).closest(".close-pane")) {
            paneStack = paneStack.filter((pane) => pane !== newPane);
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

  // Handle Escape key to close the last opened pane
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && paneStack.length > 0) {
      const lastPane = paneStack[paneStack.length - 1];
      const overlay = document.querySelector(".sliding-pane-overlay.is-open");
      if (lastPane && overlay) {
        closePane(lastPane, overlay as HTMLElement);
      }
    }
  });
};

const closePane = (pane: HTMLElement, overlay: HTMLElement) => {
  overlay.classList.remove("is-open");
  pane.classList.remove("is-open");

  setTimeout(() => {
    overlay.remove();
    pane.remove();
    paneStack = paneStack.filter((p) => p !== pane);
    if (paneStack.length === 0) enableScroll(); // Enable scrolling when all panes are closed
  }, 300);

  // Clean up event listeners
  overlay.removeEventListener("click", () => closePane(pane, overlay));
  pane.querySelector(".close-pane")?.removeEventListener("click", () => closePane(pane, overlay));
};

const disableScroll = () => {
  document.body.style.overflow = "hidden";
};

const enableScroll = () => {
  document.body.style.overflow = "";
};