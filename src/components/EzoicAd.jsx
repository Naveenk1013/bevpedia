import { useEffect, useRef } from 'react';

/**
 * EZOIC AD PLACEMENT COMPONENT
 * 
 * Renders a single Ezoic ad placeholder and manages its lifecycle.
 * 
 * Usage:
 *   <EzoicAd placeholderId={101} />
 * 
 * Props:
 *   placeholderId - The numeric placement ID from your Ezoic dashboard
 *   style         - Optional container styles (do NOT style the inner div)
 * 
 * Important:
 *   - Do NOT add padding/margin to the placeholder div itself
 *   - Ezoic manages the ad sizing; empty space is normal when no ad loads
 *   - Replace example IDs (101, 102, etc.) with real IDs from your dashboard
 */
const EzoicAd = ({ placeholderId, style = {} }) => {
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Guard: only call once per mount and only if ezstandalone exists
    if (hasLoaded.current) return;
    
    if (window.ezstandalone && window.ezstandalone.cmd) {
      window.ezstandalone.cmd.push(function () {
        window.ezstandalone.showAds(placeholderId);
      });
      hasLoaded.current = true;
    }

    return () => {
      // Cleanup: destroy the placeholder when the component unmounts
      hasLoaded.current = false;
      if (window.ezstandalone && window.ezstandalone.destroyPlaceholders) {
        try {
          window.ezstandalone.destroyPlaceholders(placeholderId);
        } catch (e) {
          // Silently ignore if ezstandalone isn't ready
        }
      }
    };
  }, [placeholderId]);

  return (
    <div style={{ textAlign: 'center', margin: '1.5rem 0', ...style }}>
      <div id={`ezoic-pub-ad-placeholder-${placeholderId}`}></div>
    </div>
  );
};

export default EzoicAd;
