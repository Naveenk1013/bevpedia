import { motion } from 'framer-motion';

const CREATORS = [
  {
    name: "Naveen Kumar",
    role: "Hospitality Educator, Researcher & Tech Enthusiast",
    location: "Ahmedabad, India (Hailing from Jamnagar, Gujarat)",
    contact: {
      phone: "+91 8920492908",
      email: "naveen.k1013@gmail.com"
    },
    bio: [
      "I am a hospitality educator, researcher, and technology enthusiast based in Ahmedabad, India. I hold a Master’s degree in Hospitality Administration with a specialization in Human Resource Management and currently teach at the Asia-Pacific Institute of Hotel Management.",
      "My work focuses on bridging hospitality education with modern technology. I develop digital tools, academic platforms, and open learning resources that make quality education accessible to students and professionals.",
      "I am the creator of projects such as the Beverage Encyclopedia and other academic web applications designed to support hotel management aspirants, educators, and industry professionals.",
      "My goal is simple: Make hospitality knowledge practical, accessible, and relevant for the next generation of learners."
    ],
    credits: [
      "Writing core codes (React/JS/CSS)",
      "Decision of the technology stack used",
      "Implementing the architecture for the website",
      "Designing graphics, layout, and UI/UX",
      "Collecting and structuring majority of data"
    ],
    image: "image/Naveen_Kumar.jpg" // Fallback to your site image if local not found
  },
  {
    name: "Kishan Kumar",
    role: "Hospitality Academician & Exam Controller",
    location: "Rannagar, Varanasi – 221008",
    contact: {
      phone: "(+91) 81034 59765",
      email: "kishanbhu.2013@gmail.com"
    },
    bio: [
      "I am a hospitality academician and management professional with experience in hospitality operations, human resource management, and higher education. I currently serve as an Assistant Professor, Academic Coordinator, and Examination Controller at the Asia Pacific Institute of Hotel Management, Ahmedabad.",
      "I hold an MBA in Hospitality Management, where I graduated as a Gold Medalist. My professional journey combines academic teaching with practical industry exposure in food and beverage service, recruitment, training, and hospitality operations.",
      "My focus is on mentoring students, delivering practical hospitality education, and preparing future professionals with the skills, discipline, and industry knowledge required to succeed in the hospitality sector."
    ],
    credits: [
      "Intensive research & Data collection",
      "Referencing and Data analysis",
      "Subject matter expertise and validation",
      "Comprehensive testing of user interface"
    ],
    image: "image/Kishan_kumar.png" // User provided image context
  }
];

export default function AboutPage() {
  return (
    <div className="about-page animate-fade-in" style={{ padding: '6rem 1rem' }}>
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}
          >
            About the <span className="text-gradient">Creators</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted" 
            style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
          >
            The visionaries behind the Beverage Encyclopedia: bridging the gap between hospitality education and digital innovation.
          </motion.p>
        </header>

        <div className="profile-card-grid">
          {CREATORS.map((creator, idx) => (
            <motion.div 
              key={creator.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="detail-card profile-card"
              style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}
            >
              <div className="profile-header" style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', alignItems: 'flex-start' }}>
                <div className="profile-image-wrapper" style={{ 
                  width: '140px', 
                  height: '140px', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  flexShrink: 0,
                  border: '2px solid var(--clr-border)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                  <img src={creator.image} alt={creator.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                       onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=random&color=fff&size=200`; }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', margin: 0 }}>{creator.name}</h2>
                  <p style={{ color: 'var(--clr-accent)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{creator.role}</p>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>📍 {creator.location}</p>
                </div>
              </div>

              <div className="profile-bio" style={{ marginBottom: '2rem' }}>
                {creator.bio.map((p, i) => (
                  <p key={i} style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem', color: 'var(--clr-text-muted)' }}>{p}</p>
                ))}
              </div>

              <div className="credits-section" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--clr-border)', marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--clr-text)' }}>Core Contributions</h4>
                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  {creator.credits.map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem' }}>{c}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <a href={`mailto:${creator.contact.email}`} className="btn btn-outline" style={{ display: 'block', fontSize: '0.85rem', textAlign: 'center' }}>
                  ✉ Email
                </a>
                <a href={`tel:${creator.contact.phone}`} className="btn btn-outline" style={{ display: 'block', fontSize: '0.85rem', textAlign: 'center' }}>
                  📞 Call
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
