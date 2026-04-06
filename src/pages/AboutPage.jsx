import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
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
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451669/Naveen_Kumar_kpdfeo.jpg" // Fallback to your site image if local not found
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
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451669/Kishan_kumar_wpymei.png" // User provided image context
  }
];

const CONTRIBUTORS = [
  {
    name: "Mukul Sahu",
    role: "Chef & Assistant Professor of Food Production",
    location: "Ahmedabad, Gujarat, India",
    contact: {
      phone: "+916265405471",
      email: "mukulsahu06@gmail.com",
      linkedin: "http://www.linkedin.com/in/mukul-sahu-a91a2998"
    },
    bio: [
      "I am a culinary academician, hospitality professional, and dedicated researcher committed to preserving regional culinary heritage while shaping the future of hospitality education. As an Assistant Professor at the Asia Pacific Institute of Hotel Management, Ahmedabad, I blend classical hot kitchen and bakery traditions  with modern academic practices to create dynamic learning experiences.",
      "My journey began in luxury hospitality with The Oberoi Group and Hilton , where I imbibed the highest standards of excellence. This foundation was strengthened by formal education at IHM Guwahati and NCHMCT Noida.Prior to my current role.",
      "I served at SRMS CET&R, Bareilly and Yenepoya (Deemed to be University) Mangalore , mentoring aspiring chefs and hospitality leaders."
    ],
    credits: [
      "Industry expertise & insights",
      "Academic research contribution"
    ],
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Mukul_sahu_bmukyf.png"
  },
  {
    name: "Mahak Agrawal",
    role: "Assistant Professor & PhD Scholar",
    location: "Dharmsinh Desai University, Gujarat, India",
    contact: {
      phone: "", // No phone provided
      email: "mahakagrawal1308@gmail.com",
      linkedin: "https://www.linkedin.com/in/mahak-agrawal-1982931b9/"
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
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451670/Mahak_agrawal_w6kqnn.png" // Guessing image path based on others
  },
  {
    name: "Nishanth Upadhyayula",
    role: "Hospitality Educator & Assistant Professor",
    location: "Bangalore, Karnataka, India",
    contact: {
      phone: "+91 9640785375",
      email: "nishanthupadhyayula@gmail.com",
      linkedin: "https://www.linkedin.com/in/upadhyayula-nishanth-276a96129/"
    },
    bio: [
      "As a hospitality educator with a Master’s in Hotel Management, I am passionate about shaping the next generation of industry professionals. My approach to teaching combines rigorous theoretical knowledge with practical, hands-on experience, a philosophy I've developed through roles like Assistant Professor and Food & Beverage lecturer. I believe that education extends beyond the classroom, which is why I am deeply involved in curriculum development, student counseling, and organizing workshops to ensure my students are truly industry-ready.",
      "My own foundation in the field was built through intensive training with leading hotels like Novotel and the Taj Group. This direct industry experience, from managing banquet operations to understanding front office procedures, allows me to bring real-world insights into my lessons. It is incredibly rewarding to bridge that gap between textbook learning and the dynamic environment of a hotel.",
      "Beyond teaching, I am an avid learner and enthusiast of educational technology and AI, always looking for innovative ways to enhance the student experience. Whether I'm developing academic content or coordinating events, my goal remains the same: to mentor and guide students toward successful and fulfilling careers in hospitality management."
    ],
    credits: [
      "Mentorship & Curriculum Development",
      "Event Coordination & Ed-Tech Integration"
    ],
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451669/Nishanth_upadhyayula_kpueyc.jpg"
  },
  {
    name: "Jayant Lohar",
    role: "Assistant Professor & Author",
    location: "Lonavala, Maharashtra, India",
    contact: {
      phone: "+91 7758821693",
      email: "loharj79@gmail.com"
    },
    bio: [
      "I am a dedicated hospitality educator with a deep-seated passion for shaping the future of the industry through comprehensive teaching and mentorship. Currently pursuing my PhD in Hospitality and Tourism Management, my academic journey has equipped me with a strong foundation in Room Division and Food & Beverage management, which I strive to impart to my students in a dynamic and practical learning environment.",
      "In my current role as an Assistant Professor, I serve as an Exam Coordinator and oversee Training and Placement activities. This multifaceted position allows me to not only teach core subjects like Front Office and Food & Beverage Service but also to ensure our students are academically excellent and fully prepared for industry demands. I believe in a holistic approach to education, which is why I actively contribute to various institutional committees—from the IQAC to the Student Development Cell—working to enhance educational quality and foster an inclusive, engaging campus life through events like theme dinners and cultural celebrations.",
      "My commitment to the field extends beyond the classroom. I am the author of \"Simplifying Service - Your Guide to Success\" and continuously engage in professional development, exploring everything from AI in hospitality to sustainable practices. Whether I'm mentoring students, organizing a major event, or developing new curriculum, my goal remains to equip future hospitality leaders with the skills, confidence, and passion they need to succeed."
    ],
    credits: [
      "Author of 'Simplifying Service'",
      "Room Division & F&B Management",
      "Training & Placement Coordination"
    ],
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Jayant_lohar_mb1lpq.png"
  },
  {
    name: "Nitesh Kumar",
    role: "Assistant Professor & Content Creator",
    location: "Bareilly, Uttar Pradesh, India",
    contact: {
      phone: "+91 8840059787",
      email: "niteshnk476@gmail.com",
      youtube: "https://www.youtube.com/@aaoswadbadle/shorts"
    },
    bio: [
      "I am an academician who takes genuine pride in the teaching profession, viewing it not just as a job, but as a calling to shape future talent. With a background that spans both the dynamic pace of professional kitchens and the structured environment of the classroom, I bring a unique blend of practical industry insight and academic rigor to my students.",
      "My teaching philosophy is rooted in real-world application. Whether I was solving guest issues at Novotel or working in the cold kitchen, those experiences form the foundation of my lessons in Food Production. I believe in preparing students not just for exams, but for the challenges of the hospitality floor.",
      "Beyond the classroom, I am a proactive individual who enjoys content creation on YouTube and is actively involved in event and business management. I am a self-motivated and reliable team player, always seeking growth-oriented opportunities where I can deliver value while continuing to learn. My goal is to inspire students to take pride in the profession, just as I do, and to equip them with the confidence and competence to excel in the world of hospitality."
    ],
    credits: [
      "Food Production & Practical Training",
      "Digital Content Creation",
      "Event & Business Management"
    ],
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451670/Nitesh_kumar_qvykzf.png"
  },
   {
    name: "Saumya Saini",
    role: "Assistant Professor & Phd. Scholar",
    location: "Rajasthan, India",
    contact: {
      phone: "+91 9521274499",
      email: "saumya.udr@gmail.com",
    },
    bio: [
      "With a Master's in Hospitality Administration specializing in Human Resources and a passion for luxury service, I am an educator dedicated to bridging the gap between academic learning and the realities of the hotel industry. My foundation was built and refined within some of India's most prestigious properties, including The Oberoi Udaivillas and The Leela Palace, Udaipur. These experiences taught me not just the mechanics of Food & Beverage, Front Office, and Housekeeping, but the art of anticipating guest needs and handling high-pressure situations with grace.",
      "I bring this real-world perspective into my current role as a Hospitality Faculty and Training Placement Coordinator. I believe that true education extends beyond the textbook, which is why I focus on preparing students for the nuances of hotel operations, from VIP guest service to the strategic functions of the Human Resources department. Earning four Kudos certificates during my training at The Oberoi reinforced my belief in the power of dedication and attention to detail—values I strive to instill in every student I mentor.",
      "Currently pursuing my PhD, I am committed to continuous learning and academic excellence. Whether I am coordinating placements, managing examination processes, or drawing on my experience as a district-level athlete to teach teamwork and resilience, my goal is to shape well-rounded professionals. I am passionate about guiding the next generation of hospitality leaders, equipping them with the skills, confidence, and grace required to excel in this dynamic field."
    ],
    credits: [
      "Testing and cross Referencing",
      "Service Standards and SOPs Verification",
      "Study Material and Exam Preparation data"
    ],
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451670/Saumya_saini_c5mq8d.png"
  },
  {
    name: "Arya Mohan",
    role: "Assistant Professor",
    location: "Punjab, India",
    contact: {
      phone: "+91 8102533916",
      email: "aryamohan647@gmail.com",
    },
    bio: [
      "I am a culinary academician, hospitality professional, and bestselling author dedicated to preserving culinary heritage while shaping the future of hospitality education. As an Assistant Professor at Lovely Professional University, I blend classical traditions with modern practices to create dynamic learning experiences.",
      "My journey began in luxury hospitality with Trident Udaipur and the prestigious Oberoi Centre of Learning and Development, where I imbibed the highest standards of excellence. This foundation was strengthened by formal education at IHM Lucknow and NCHMCT Noida.",
      "Prior to my current role, I served at Parul University, mentoring aspiring chefs. I am also a published author of two bestselling books on Amazon. For me, every kitchen is a classroom, and I remain committed to inspiring the next generation of hospitality professionals through tradition, technique, and relentless pursuit of excellence."
    ],
    credits: [
      "Testing and cross Referencing",
      "Service Standards and SOPs Verification",
      "Study Material and Exam Preparation data"
    ],
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Arya_mohan_kog5by.png"
  },
  {
    name: "Chanchreek Sharma",
    role: "Assistant Professor",
    location: "Punjab, India",
    contact: {
      phone: "+91 8278819476",
      email: "Chanchreek21@gmail.com",
    },
    bio: [
      "I am an Assistant Professor in Hotel Management with a strong academic background and industry exposure. I am currently pursuing a Ph.D. and hold a Master’s and Bachelor’s degree in Hospitality Administration. My areas of interest include human resource management, hospitality operations, front office and sustainable practices.",
      "I am involved in teaching, curriculum development, and mentoring students. I also actively contribute to research through publications, book chapters, and patents, aiming to grow and add value to the field of hospitality.",
    ],
    credits: [
      "Testing and cross Referencing",
      "UI/UX Design Recomendation",
      "Study Material and Exam Preparation data"
    ],
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Chanchreek_sharma_wj4omf.png"
  },
  {
    name: "Abhishek Kumar",
    role: "Learning & Development Executive",
    location: "Bangalore, India",
    contact: {
      phone: "+91 83404 33865",
      email: "emailabhisheknow@gmail.com",
      linkedin: "https://www.linkedin.com/in/abhishek-at-service"
    },
    bio: [
      "I am Abhishek Kumar, a hospitality professional and academic contributor with a strong interest in tourism, hospitality, and the management domain. My journey in the hospitality industry has been shaped by hands-on operational experience as well as a deep engagement with academic research and training practices.",
      "Most recently, I worked as a Learning & Development Executive at The Leela Palace Bengaluru, where I designed and delivered training programs aligned with luxury hospitality standards.",
      "Alongside my industry experience, I have pursued advanced education in hospitality and training, including a Master’s in Hospitality Administration and an MBA in Hospitality Management. This academic foundation allows me to approach hospitality not just as an operational field, but as a space for structured learning, research, and innovation.",
      "I have also contributed to academic literature with publications in areas such as culinary tourism and workforce challenges, reflecting my interest in bridging industry practice with research insights."
    ],
    credits: [
      "Industry Insights",
      "Practical Knowledge",
      "Industry Experience & Training"
    ],
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Abhishek_kumar_i9fbku.jpg"
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
        {person.contact.email && (
          <a href={`mailto:${person.contact.email}`} className="btn btn-outline" style={{ display: 'block', fontSize: '0.85rem', textAlign: 'center', padding: '0.8rem 0.5rem' }}>
            ✉ Email
          </a>
        )}
        {person.contact.phone && (
          <a href={`tel:${person.contact.phone}`} className="btn btn-outline" style={{ display: 'block', fontSize: '0.85rem', textAlign: 'center', padding: '0.8rem 0.5rem' }}>
            📞 Call
          </a>
        )}
        {person.contact.linkedin && (
          <a href={person.contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'block', fontSize: '0.85rem', textAlign: 'center', padding: '0.8rem 0.5rem' }}>
            in LinkedIn
          </a>
        )}
        {person.contact.youtube && (
          <a href={person.contact.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'block', fontSize: '0.85rem', textAlign: 'center', padding: '0.8rem 0.5rem' }}>
            ▶ YouTube
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  return (
    <div className="about-page animate-fade-in" style={{ padding: '6rem 1rem' }}>
      <SEO 
        title="About the Creators" 
        description="Meet the visionaries behind the Beverage Encyclopedia. Discover our mission to bridge hospitality education with digital innovation and join our professional talent pool."
      />
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

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="community-join-section detail-card"
            style={{ 
              padding: '4rem 2rem', 
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)',
              border: '1px solid var(--clr-border)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ 
                fontStyle: 'italic', 
                color: 'var(--clr-text-muted)', 
                marginBottom: '2.5rem',
                fontSize: '1.2rem',
                lineHeight: '1.6',
                borderLeft: '4px solid var(--clr-accent)',
                paddingLeft: '1.5rem',
                textAlign: 'left',
                background: 'rgba(0,0,0,0.2)',
                padding: '1.5rem',
                borderRadius: '0 12px 12px 0'
              }}>
                "Nothing is meant to be permanent. Empires fall and monuments crumble; everything dissolves with time. The only thing that remains is the literature and knowledge, which is passed on to generations after generations."
              </div>
              
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
                Join the Professional <span className="text-gradient">Talent Pool</span>
              </h2>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                We invite working hospitality professionals to contribute to the Beverage Encyclopedia. This is an exclusive community dedicated to sharing expertise and advancing the industry's legacy.
              </p>

              <div style={{ 
                background: 'rgba(255,50,50,0.05)', 
                border: '1px solid rgba(255,50,50,0.2)', 
                padding: '1.5rem', 
                borderRadius: '12px',
                textAlign: 'left',
                marginBottom: '2.5rem'
              }}>
                <h4 style={{ color: '#ff6b6b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  ⚠️ Strict Ground Rules & Code of Conduct
                </h4>
                <ul style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li>This group is strictly meant for <strong>professional use only</strong>.</li>
                  <li><strong>Zero Tolerance for Spam:</strong> No advertisements, promotions, or irrelevant messages are invited.</li>
                  <li>A strong professional <strong>code of conduct</strong> must be maintained at all times.</li>
                  <li>Violators of rules and regulations will be <strong>immediately kicked out</strong>.</li>
                  <li>Membership is exclusively for working officials and individuals actively wanting to contribute in any possible way.</li>
                </ul>
              </div>

              <a 
                href="https://chat.whatsapp.com/D3TnAy3d33r53ir7xoGWAz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn hover-lift"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.8rem', 
                  fontSize: '1.1rem', 
                  padding: '1rem 2.5rem',
                  background: '#25D366',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join WhatsApp Group
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
