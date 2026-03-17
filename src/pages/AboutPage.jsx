import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    image: "image/about/Naveen_Kumar.jpg" // Fallback to your site image if local not found
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
    image: "image/about/Kishan_kumar.png" // User provided image context
  }
];

const CONTRIBUTORS = [
  {
    name: "Mukul Sahu",
    role: "Chef & Assistant Professor of Food Production",
    location: "India",
    contact: {
      phone: "+916265405471",
      email: "mukulsahu06@gmail.com"
    },
    bio: [
      "I am a passionate Chef and Assistant Professor of Food Production with a strong foundation in hospitality, combining industry experience from The Oberoi Amarvilas, Conrad by Hilton, and Biryani by Kilo with academic expertise.",
      "Currently pursuing a Ph.D. in Tourism and Travel Management alongside postgraduate studies in Hospitality Administration, I focus on bridging the gap between theory and practice.",
      "I am actively involved in research, conferences, and student development, and I strive to create a professional, engaging learning environment that builds skills, confidence, and creativity in future hospitality professionals."
    ],
    credits: [
      "Industry expertise & insights",
      "Academic research contribution"
    ],
    image: "image/about/Mukul_sahu.png"
  },
  {
    name: "Mahak Agrawal",
    role: "Assistant Professor & PhD Scholar",
    location: "Dharmsinh Desai University, Gujarat, India",
    contact: {
      phone: "", // No phone provided
      email: "mahakagrawal1308@gmail.com"
    },
    bio: [
      "I am Mahak Agrawal, an Assistant Professor at Dharmsinh Desai University, Gujarat, India, and I am concurrently pursuing my Ph.D. I hold an M.Sc. in Hospitality Administration and am actively engaged in teaching, research, and academic development in the field of hospitality and tourism management.",
      "I have presented my research work at various national and international conferences and have one research publication with an ISSN, reflecting my contribution to academic literature.",
      "My research interests include sustainable and smart hospitality models, culinary and cultural tourism, experiential tourism, and emerging trends in hospitality management and education, with a focus on integrating theoretical perspectives with contemporary industry practices."
    ],
    credits: [
      "Academic research contribution",
      "Hospitality & Tourism Management expertise"
    ],
    image: "image/about/Mahak_agrawal.png" // Guessing image path based on others
  }
];

const ProfileCard = ({ person, idx }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.2 }}
      className="detail-card profile-card"
      style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}
    >
      <div className="profile-header" style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        <div className="profile-image-wrapper" style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '24px', 
          overflow: 'hidden', 
          flexShrink: 0,
          border: '2px solid var(--clr-border)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
               onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random&color=fff&size=200`; }} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', margin: 0, marginBottom: '0.5rem' }}>{person.name}</h2>
          <p style={{ color: 'var(--clr-accent)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{person.role}</p>
          <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>📍 {person.location}</p>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
              <div className="profile-bio" style={{ marginBottom: '1.5rem' }}>
                {person.bio.map((p, i) => (
                  <p key={i} style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem', color: 'var(--clr-text-muted)' }}>{p}</p>
                ))}
              </div>

              <div className="credits-section" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--clr-border)' }}>
                <h4 style={{ marginBottom: '0.8rem', color: 'var(--clr-text)', fontSize: '1rem' }}>Core Contributions</h4>
                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  {person.credits.map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.4rem' }}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginBottom: '1.5rem', marginTop: isExpanded ? '0' : '1rem' }}>
         <button 
           onClick={() => setIsExpanded(!isExpanded)} 
           style={{
             background: 'transparent', 
             border: 'none', 
             color: 'var(--clr-accent)', 
             cursor: 'pointer', 
             fontSize: '0.95rem', 
             fontWeight: 'bold', 
             padding: 0,
             display: 'inline-flex',
             alignItems: 'center',
             gap: '0.5rem'
           }}
           className="hover-lift"
         >
           {isExpanded ? 'Show Less ▲' : 'Read More ▼'}
         </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <a href={`mailto:${person.contact.email}`} className="btn btn-outline" style={{ display: 'block', fontSize: '0.85rem', textAlign: 'center' }}>
          ✉ Email
        </a>
        <a href={`tel:${person.contact.phone}`} className="btn btn-outline" style={{ display: 'block', fontSize: '0.85rem', textAlign: 'center' }}>
          📞 Call
        </a>
      </div>
    </motion.div>
  );
};

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

        <div className="about-sections" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          <div className="creators-section">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '2rem', color: 'white', textAlign: 'center' }}>The Creators</h2>
            <div className="profile-card-grid">
              {CREATORS.map((person, idx) => (
                <ProfileCard key={person.name} person={person} idx={idx} />
              ))}
            </div>
          </div>

          <div className="contributors-section">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '2rem', color: 'white', textAlign: 'center' }}>Our Contributors</h2>
            <div className="profile-card-grid">
              {CONTRIBUTORS.map((person, idx) => (
                <ProfileCard key={person.name} person={person} idx={idx} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
