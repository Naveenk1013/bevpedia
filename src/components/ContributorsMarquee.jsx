import { Link } from 'react-router-dom';
import { Heart, Crown, Star, MapPin, Users } from 'lucide-react';
import '../styles/contributors-marquee.css';

/**
 * TEMPORARY COMPONENT — Contributors Spotlight Marquee
 * Features all creators & contributors in a beautiful auto-scrolling
 * marquee on the HomePage as a token of appreciation.
 */

const ALL_PEOPLE = [
  // ── Creators ──
  {
    name: "Naveen Kumar",
    role: "Hospitality Educator, Researcher & Tech Enthusiast",
    location: "Ahmedabad, India",
    credit: "Architecture, code, UI/UX & data curation",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451669/Naveen_Kumar_kpdfeo.jpg",
    type: "creator"
  },
  {
    name: "Kishan Kumar",
    role: "Hospitality Academician & Exam Controller",
    location: "Varanasi, India",
    credit: "Research, data analysis & subject validation",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451669/Kishan_kumar_wpymei.png",
    type: "creator"
  },
  // ── Contributors ──
  {
    name: "Mukul Sahu",
    role: "Chef & Asst. Professor, Food Production",
    location: "Ahmedabad, Gujarat",
    credit: "Industry expertise & academic research",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Mukul_sahu_bmukyf.png",
    type: "contributor"
  },
  {
    name: "Mahak Agrawal",
    role: "Assistant Professor & PhD Scholar",
    location: "DDU, Gujarat",
    credit: "Hospitality & Tourism Management expertise",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451670/Mahak_agrawal_w6kqnn.png",
    type: "contributor"
  },
  {
    name: "Nishanth Upadhyayula",
    role: "Hospitality Educator & Asst. Professor",
    location: "Bangalore, Karnataka",
    credit: "Mentorship & Ed-Tech integration",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451669/Nishanth_upadhyayula_kpueyc.jpg",
    type: "contributor"
  },
  {
    name: "Jayant Lohar",
    role: "Assistant Professor & Author",
    location: "Lonavala, Maharashtra",
    credit: "Author of 'Simplifying Service'",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Jayant_lohar_mb1lpq.png",
    type: "contributor"
  },
  {
    name: "Nitesh Kumar",
    role: "Assistant Professor & Content Creator",
    location: "Bareilly, U.P.",
    credit: "Food Production & digital content",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451670/Nitesh_kumar_qvykzf.png",
    type: "contributor"
  },
  {
    name: "Saumya Saini",
    role: "Assistant Professor & PhD Scholar",
    location: "Rajasthan, India",
    credit: "Testing, SOPs & study material",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451670/Saumya_saini_c5mq8d.png",
    type: "contributor"
  },
  {
    name: "Arya Mohan",
    role: "Assistant Professor & Bestselling Author",
    location: "Punjab, India",
    credit: "Cross-referencing & data verification",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Arya_mohan_kog5by.png",
    type: "contributor"
  },
  {
    name: "Chanchreek Sharma",
    role: "Assistant Professor & PhD Scholar",
    location: "Punjab, India",
    credit: "UI/UX recommendations & testing",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Chanchreek_sharma_wj4omf.png",
    type: "contributor"
  },
  {
    name: "Abhishek Kumar",
    role: "Learning & Development Executive",
    location: "Bangalore, India",
    credit: "Industry insights & training expertise",
    image: "https://res.cloudinary.com/dro6n6co1/image/upload/f_auto,q_auto,w_240,c_fill,g_face/v1775451671/Abhishek_kumar_i9fbku.jpg",
    type: "contributor"
  }
];

function ContributorCard({ person }) {
  const isCreator = person.type === 'creator';

  return (
    <div className={`contributor-card ${isCreator ? 'is-creator' : ''}`}>
      <div className="contributor-card-inner">
        <div className="contributor-avatar">
          <img
            src={person.image}
            alt={person.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=1c202d&color=c9963a&size=200&bold=true`;
            }}
          />
        </div>
        <div className="contributor-info">
          <div className="contributor-name">{person.name}</div>
          <div className="contributor-role">{person.role}</div>
          <div className="contributor-location">
            <MapPin size={11} /> {person.location}
          </div>
          <div
            className={`contributor-type-badge ${person.type}`}
            style={{ alignSelf: 'center' }}
          >
            {isCreator ? <Crown size={10} /> : <Star size={10} />}
            {isCreator ? 'Creator' : 'Contributor'}
          </div>
        </div>
        <div className="contributor-credit">"{person.credit}"</div>
      </div>
    </div>
  );
}

export default function ContributorsMarquee() {
  // Duplicate the list for seamless infinite scrolling
  const doubled = [...ALL_PEOPLE, ...ALL_PEOPLE];

  return (
    <section className="contributors-spotlight" id="contributors-spotlight">
      <div className="contributors-spotlight-header">
        <div className="contributors-spotlight-eyebrow">
          <Heart size={13} style={{ color: '#e05c5c' }} />
          Our People
        </div>
        <h2 className="contributors-spotlight-title">
          Meet the <span className="text-gradient">Brilliant Minds</span> Behind Bevpedia
        </h2>
        <p className="contributors-spotlight-subtitle">
          Educators, researchers, and industry professionals who pour their expertise into making this resource extraordinary.
        </p>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {doubled.map((person, idx) => (
            <ContributorCard key={`${person.name}-${idx}`} person={person} />
          ))}
        </div>
      </div>

      <div className="contributors-cta">
        <Link to="/about">
          <Users size={16} />
          Learn more about our team
        </Link>
      </div>
    </section>
  );
}
