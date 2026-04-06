import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';




export default function SponsorshipPage() {
  return (
    <div className="sponsorship-page animate-fade-in" style={{ padding: '6rem 1rem' }}>
      <SEO 
        title="Industry Solutions & Sponsorship" 
        description="Partner with Bevpedia to close the hospitality talent gap. Explore sponsorship opportunities, academic collaboration, and access to our elite candidate pool."
      />
      <div className="container">
        {/* Hero Section */}
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}
          >
            Industry <span className="text-gradient">Solutions & Sponsorship</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted" 
            style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}
          >
            Closing the global hospitality talent gap through education, technology, and vetted competency. 
            Partner with us to build the future of beverage education.
          </motion.p>
        </header>

        <div className="sponsorship-grid">
          {/* Left Side: Proposal & Vision */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="proposal-content"
          >
            <div className="detail-card sponsorship-card" style={{ padding: '3rem', marginBottom: '2rem', border: '1px solid var(--clr-accent)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--clr-accent)' }}>Funding for Sustainability</h2>
              <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                To keep this platform running, expanding its database, and maintaining its high standard of quality, <strong>we are actively seeking financial sponsorship.</strong> Your funding will directly support:
              </p>
              
              <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(48, 200, 138, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#30C88A', flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: '0.95rem' }}>Official Domain & Professional Hosting</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(48, 200, 138, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#30C88A', flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: '0.95rem' }}>Advanced Backend & Database Infrastructure</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(48, 200, 138, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#30C88A', flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: '0.95rem' }}>Continuous Data Research & Content Updates</span>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <a href="mailto:contact@bevpedia.in" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1rem' }}>
                  BECOME A PARTNER
                </a>
              </div>
            </div>

            <div className="detail-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem' }}>Solving the Talent Crisis</h2>
              <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '2rem' }}>
                The hospitality industry is currently starving for skilled resources. Our platform isn't just a guide; it's a 
                <strong> competency-based talent pipeline</strong>. 
              </p>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', borderLeft: '4px solid #30C88A' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>The talent Solution</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--clr-text-muted)', lineHeight: '1.6' }}>
                  Sponsors will gain exclusive access to our "Elite Candidate Pool"—a database of professionals who have 
                  proven their knowledge through our standardized exams. 
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="contact-sidebar"
          >
            <div className="detail-card" style={{ padding: '3rem', position: 'sticky', top: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Get in Touch</h2>
              <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Describe how you can benefit from our platform and how you'd like to collaborate.
              </p>

              <form action="https://formspree.io/f/xeerzqyj" method="POST" style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.6rem', color: 'var(--clr-text-muted)', letterSpacing: '0.5px' }}>FULL NAME / ORGANIZATION</label>
                  <input type="text" name="name" required style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--clr-border)', 
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem'
                  }} placeholder="Enter your name..." />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.6rem', color: 'var(--clr-text-muted)', letterSpacing: '0.5px' }}>EMAIL ADDRESS</label>
                  <input type="email" name="email" required style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--clr-border)', 
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem'
                  }} placeholder="your@email.com" />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.6rem', color: 'var(--clr-text-muted)', letterSpacing: '0.5px' }}>INTERESTED IN...</label>
                  <select name="type" style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--clr-border)', 
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem'
                  }}>
                    <option value="sponsorship" style={{ background: '#1a1a1a' }}>Professional Sponsorship</option>
                    <option value="recruitment" style={{ background: '#1a1a1a' }}>Talent Recruitment / Talent Pool</option>
                    <option value="collab" style={{ background: '#1a1a1a' }}>Academic Collaboration</option>
                    <option value="other" style={{ background: '#1a1a1a' }}>Other Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.6rem', color: 'var(--clr-text-muted)', letterSpacing: '0.5px' }}>MESSAGE / PROPOSAL</label>
                  <textarea name="message" required style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    minHeight: '120px',
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--clr-border)', 
                    borderRadius: '12px',
                    color: 'white',
                    resize: 'none',
                    fontSize: '1rem'
                  }} placeholder="Tell us how we can work together..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ 
                  padding: '1.25rem', 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  marginTop: '0.5rem',
                  letterSpacing: '1px',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                  SEND PROPOSAL
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
