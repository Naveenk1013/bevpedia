import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * EZOIC SPA ROUTE-CHANGE HOOK
 * 
 * In a single-page app, Ezoic needs to be told when the page changes
 * so it can refresh ads for the new content. This hook listens to
 * React Router location changes and calls ezstandalone.showAds()
 * on every navigation (except the initial page load).
 * 
 * Usage (in App.jsx):
 *   useEzoicRefresh();
 */
export default function useEzoicRefresh() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial render — Ezoic handles the first page load itself
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // On subsequent route changes, tell Ezoic to refresh all ads
    if (window.ezstandalone && window.ezstandalone.cmd) {
      window.ezstandalone.cmd.push(function () {
        // Calling showAds() with no arguments refreshes all existing placeholders
        window.ezstandalone.showAds();
      });
    }
  }, [location.pathname]);
}
