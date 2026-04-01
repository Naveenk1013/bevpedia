import { useState } from 'react';
import { motion } from 'framer-motion';

const DonationTier = ({ productId, label, description, price, accentColor, tag }) => {
  const [loading, setLoading] = useState(false);

  const handleDonation = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        body: JSON.stringify({
          productId,
          customerEmail: 'guest@example.com',
          customerName: 'Supporter',
          returnUrl: import.meta.env.VITE_DODO_PAYMENTS_RETURN_URL || window.location.href,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server Error: ${response.statusText}`);
      }
      
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("Missing checkout_url from server.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      // Secure local fallback using static link if local API fails
      window.location.href = `https://checkout.dodopayments.com/buy/${productId}?redirect_url=${encodeURIComponent(import.meta.env.VITE_DODO_PAYMENTS_RETURN_URL || window.location.href)}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '2rem 1.5rem', 
      background: 'transparent', 
      borderRadius: '24px', 
      border: `1px solid ${accentColor}44`,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'default',
      backdropFilter: 'blur(10px)',
      boxShadow: `0 10px 30px -10px ${accentColor}22`
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.borderColor = accentColor;
      e.currentTarget.style.background = `${accentColor}08`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = `${accentColor}44`;
      e.currentTarget.style.background = 'transparent';
    }}
    >
      {tag && (
        <span style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(90deg, ${accentColor}, #ff0080)`,
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.7rem',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          whiteSpace: 'nowrap'
        }}>
          {tag}
        </span>
      )}
      
      <div>
        <h4 style={{ color: accentColor, marginBottom: '0.2rem', fontSize: '1.2rem', fontWeight: '800' }}>{label}</h4>
        <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>
          ₹{price}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>{description}</p>
      </div>

      <button 
        onClick={handleDonation} 
        disabled={loading}
        className="btn" 
        style={{ 
          padding: '1rem', 
          fontSize: '0.9rem', 
          fontWeight: '800',
          background: loading ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${accentColor} 0%, #1a1a1a 100%)`,
          border: `1px solid ${accentColor}66`,
          borderRadius: '12px',
          color: 'white',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        {loading ? 'Processing...' : 'Contribute Now'}
      </button>
    </div>
  );
};

const DonationTiers = () => {
  const tiers = [
    {
      id: import.meta.env.VITE_DODO_PRODUCT_TIER_3,
      label: 'Hero Support',
      price: '100',
      description: 'The ultimate boost that helps us scale and stay ad-free.',
      color: '#F72585',
      tag: '🔥 Recommended'
    },
    {
      id: import.meta.env.VITE_DODO_PRODUCT_TIER_2,
      label: 'Big Gesture',
      price: '50',
      description: 'Helps us maintain the data and research new recipes.',
      color: '#4CC9F0'
    },
    {
      id: import.meta.env.VITE_DODO_PRODUCT_TIER_1,
      label: 'Small Tip',
      price: '25',
      description: 'Just some spare change to show your love for the site.',
      color: '#30C88A'
    }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
      gap: '2rem', 
      marginTop: '3.5rem',
      padding: '1rem'
    }}>
      {tiers.map((tier, idx) => (
        <DonationTier 
          key={idx}
          productId={tier.id}
          label={tier.label}
          price={tier.price}
          description={tier.description}
          accentColor={tier.color}
          tag={tier.tag}
        />
      ))}
    </div>
  );
};


export default function SponsorshipPage() {
  return (
    <div className="sponsorship-page animate-fade-in" style={{ padding: '6rem 1rem' }}>
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

              <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(48, 200, 138, 0.2)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--clr-accent)' }}>Support Our Mission</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--clr-text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  This platform is absolutely free and will remain free for all, without any ads. 
                  Contributions are entirely optional, but if you'd like to support our hosting, creators, and community efforts, you can contribute below.
                </p>
                <DonationTiers />
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
