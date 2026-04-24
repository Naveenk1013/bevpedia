import EzoicAd from './EzoicAd';

export default function Footer() {
  return (
    <footer className="footer">
      <EzoicAd placeholderId={103} />
      <div className="container">
        <p>
          🍸 <strong>Beverage Encyclopedia</strong> — The complete reference for cocktails, mocktails, spirits, wine & beer.
        </p>
        <p className="mt-sm">
          For hotel management aspirants, bar professionals, sommeliers &amp; academics. &copy; 2024{' '}
          <a href="https://naveen-kr1.netlify.app/" target="_blank" rel="noopener noreferrer">
            Naveen Kumar
          </a>
          . All rights reserved. | <a href="/legal" style={{ color: 'var(--clr-accent)', fontWeight: 'bold' }}>Privacy & Terms</a> | <a href="/about" style={{ color: 'var(--clr-accent)', fontWeight: 'bold' }}>About the Creators</a> | <a href="/sponsors" style={{ color: 'var(--clr-accent)', fontWeight: 'bold' }}>Sponsorship & Partners</a>
        </p>
      </div>
    </footer>
  );
}
