import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

const DownloadPDF = ({ contentRef }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!contentRef?.current || isGenerating) return;
    setIsGenerating(true);

    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'IKS_Module_1_Notes.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 900,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      // Clone the content to avoid modifying the live DOM
      const clone = contentRef.current.cloneNode(true);
      
      // Remove interactive-only elements from the clone
      clone.querySelectorAll('.iks-exhibit-nav-btn, .iks-lang-wrapper, .iks-exit-btn, .iks-sidebar-premium').forEach(el => el.remove());
      
      // Make exhibit tracks stack vertically for PDF
      clone.querySelectorAll('.iks-exhibit-track').forEach(track => {
        track.style.display = 'flex';
        track.style.flexDirection = 'column';
        track.style.overflow = 'visible';
        track.style.gap = '20px';
        track.style.padding = '0 20px';
      });
      
      clone.querySelectorAll('.iks-exhibit-card').forEach(card => {
        card.style.flex = 'none';
        card.style.width = '100%';
        card.style.maxWidth = '100%';
      });

      // Temporarily append the clone (hidden) for rendering
      const wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      wrapper.style.width = '900px';
      wrapper.style.background = 'white';
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      await html2pdf().set(opt).from(clone).save();
      
      document.body.removeChild(wrapper);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        className="iks-download-btn"
        onClick={handleDownload}
        disabled={isGenerating}
        aria-label="Download as PDF"
        title="Download as PDF"
      >
        {isGenerating ? (
          <Loader2 size={16} className="iks-spin" />
        ) : (
          <Download size={16} />
        )}
        <span>{isGenerating ? 'Generating…' : 'PDF'}</span>
      </button>

      {/* Full-screen overlay while generating */}
      {isGenerating && (
        <div className="iks-pdf-overlay">
          <div className="iks-pdf-overlay-content">
            <Loader2 size={48} className="iks-spin" style={{ color: 'var(--iks-saffron)' }} />
            <h3 className="iks-display" style={{ fontSize: '2rem', marginTop: '2rem', color: 'var(--iks-ink)' }}>
              Crafting Your Manuscript…
            </h3>
            <p className="iks-mono" style={{ marginTop: '1rem', opacity: 0.5 }}>
              Preparing a beautiful PDF of the entire module
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadPDF;
