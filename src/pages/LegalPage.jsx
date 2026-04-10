import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function LegalPage() {
  return (
    <div className="legal-page animate-fade-in" style={{ padding: '6rem 1rem' }}>
      <SEO 
        title="Privacy Policy & Terms of Service" 
        description="Legal information, privacy policy, and terms of service for Bevpedia.in. Understanding how we protect your data and govern our content."
        breadcrumbs={[{ name: 'Legal', item: '/legal' }]}
      />
      <div className="container" style={{ maxWidth: '900px' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Legal Information</h1>
          <p className="text-muted">Last Updated: April 10, 2026</p>
        </header>

        <div className="detail-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--clr-accent)' }}>Privacy Policy</h2>
            <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>
              At Bevpedia, accessible from bevpedia.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Bevpedia and how we use it.
            </p>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>1. Log Files</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>
              Bevpedia follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>2. Cookies and Web Beacons</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>
              Like any other website, Bevpedia uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>3. Google DoubleClick DART Cookie</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.
            </p>
          </section>

          <hr style={{ opacity: 0.1 }} />

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--clr-accent)' }}>Terms of Service</h2>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>
              By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>2. Use License</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>
              Permission is granted to temporarily download one copy of the materials on Bevpedia's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials for commercial purposes.
            </p>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>3. Disclaimer</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>
              The materials on Bevpedia's website are provided on an 'as is' basis. Bevpedia makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--clr-border)' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Us</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--clr-text-muted)' }}>
              If you have any questions about our Privacy Policy or Terms of Service, please contact us at: <br/>
              <strong>Email: contact@bevpedia.in</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
