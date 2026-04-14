export const iksModule1 = {
  id: "module_1",
  title: "Introduction to Indian Knowledge System",
  eyebrow: "Graduation Level · Comprehensive Guide",
  tagline: "A deep dive into the roots, evolution, and practical wisdom of Indian traditions — transitioned with 100% academic fidelity.",
  units: [
    {
      id: "1.1",
      title: "Overview of Indian Knowledge Systems",
      blocks: [
        { type: 'header', text: '1.1 — A: Definition and Scope of Indian Knowledge Systems' },
        { 
          type: 'callout', 
          variant: 'definition', 
          label: 'Core Definition',
          text: "Indian Knowledge System (IKS) refers to the vast, organised body of knowledge — both sacred and secular — that was developed, refined, and transmitted by thinkers, sages, artisans, and scholars on the Indian subcontinent over a period spanning more than five thousand years. It encompasses philosophical systems, scientific achievements, artistic traditions, ethical frameworks, linguistic sciences, and techniques of statecraft, medicine, mathematics, and ecology." 
        },
        { 
          type: 'paragraph', 
          text: "IKS is not a single unified system but a dynamic, pluralistic, and continuously evolving intellectual heritage. It draws from multiple civilisational traditions — Vedic, Buddhist, Jain, Sikh, and various regional folk and tribal traditions — often in dialogue, sometimes in debate, but always contributing to a rich multi-layered body of knowledge." 
        },
        { type: 'sub-header', text: 'A. What Does "Scope" Mean in IKS?' },
        { 
          type: 'paragraph', 
          text: "The scope of IKS is extraordinarily wide. It is important to understand that IKS does not confine itself to \"religious\" or \"spiritual\" knowledge alone. The following table clarifies the breadth of its scope:" 
        },
        {
          type: 'table',
          headers: ["Domain", "Sanskrit Term", "Key Texts / Examples", "Practical Relevance"],
          rows: [
            ["Philosophy & Metaphysics", "Darshana", "Upanishads, Brahmasutras, Bhagavad Gita", "Ethical frameworks, consciousness studies"],
            ["Logic & Epistemology", "Nyaya / Tarka", "Nyayasutras of Gautama", "Critical thinking, argumentation"],
            ["Mathematics", "Ganita / Jyotisha", "Aryabhatiya, Lilavati, Sulbasutras", "Zero, decimal system, algebra, trigonometry"],
            ["Medicine & Life Sciences", "Ayurveda", "Charaka Samhita, Sushruta Samhita", "Holistic medicine, surgery, pharmacology"],
            ["Astronomy", "Khagolashastra", "Aryabhatiya, Surya Siddhanta", "Calendar systems, navigation, agriculture"],
            ["Linguistics & Grammar", "Vyakarana", "Panini's Ashtadhyayi", "Language analysis, computing, AI"],
            ["Statecraft & Economics", "Arthashastra", "Kautilya's Arthashastra", "Governance, strategy, public administration"],
            ["Arts, Aesthetics & Music", "Kala / Sangeet", "Natyashastra, Sangeet Ratnakar", "Performing arts, cultural identity"],
            ["Architecture & Town Planning", "Vastu / Shilpashastra", "Manasara, Mayamata", "Sustainable architecture, urban design"],
            ["Ecology & Agriculture", "Krishi Parashara", "Krishi Parashara, Vrikshayurveda", "Sustainable farming, soil science"]
          ]
        },
        { 
          type: 'callout', 
          variant: 'example', 
          label: 'Illustrative Example',
          text: "The scope of IKS in practice: Panini, the ancient grammarian who lived around 500–400 BCE, composed the Ashtadhyayi — a system of Sanskrit grammar using 3,959 rules to describe the entire Sanskrit language. Modern computer scientists have noted that Panini's formal grammar is structurally similar to a context-free grammar (the Backus-Naur Form used in programming languages). This demonstrates that IKS was not merely speculative — it was rigorous, formal, and practically applicable even by today's standards." 
        },
        { type: 'header', text: '1.1 — B: Historical Evolution and Significance' },
        { 
          type: 'paragraph', 
          text: "The evolution of IKS is not a simple linear progression but a layered, multi-directional development that unfolded across several distinct phases. Each phase built on the previous, absorbed external influences, and contributed unique insights." 
        },
        {
          type: 'timeline',
          items: [
            { date: "c. 7000–3000 BCE", title: "Indus Valley / Pre-Vedic Phase", desc: "Evidence of town planning, weights and measures, water management at Mohenjo-daro and Harappa suggests systematic empirical knowledge. The grid-based city of Harappa shows advanced civil engineering. Seals suggest proto-writing and trade relations as far as Mesopotamia." },
            { date: "c. 1500–500 BCE", title: "Vedic Period — The Root of All IKS", desc: "Composition of the four Vedas (Rig, Sama, Yajur, Atharva). The Vedangas (six auxiliary sciences) emerge: Shiksha, Chandas, Vyakarana, Nirukta, Jyotisha, and Kalpa. The Upanishads, composed towards the later part of this period, shift focus from ritual to philosophy and metaphysics." },
            { date: "c. 600–300 BCE", title: "Shramana Movements and Classical Philosophy", desc: "The rise of Buddhism and Jainism challenges Vedic orthodoxy, leading to rich philosophical debate. Six classical schools of Indian philosophy (Shad Darshanas) crystallise: Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta. Panini composes the Ashtadhyayi (~500 BCE). Kautilya writes the Arthashastra (~300 BCE)." },
            { date: "c. 300 BCE – 600 CE", title: "Classical / Golden Age of Indian Knowledge", desc: "The Gupta period (320–550 CE) is considered the apex of classical IKS. Aryabhata proposes the heliocentric model, calculates π, and introduces trigonometric functions (~499 CE). Charaka and Sushruta systematise medicine and surgery. The Natyashastra of Bharata Muni codifies performing arts. Universities at Nalanda and Taxila attract scholars from across Asia." },
            { date: "c. 600–1200 CE", title: "Post-Classical and Syncretic Period", desc: "Brahmagupta advances algebra and number theory. Bhaskara II pioneers calculus concepts. South Indian traditions (Tamil Sangam literature, Carnatic music, Dravidian architecture) flourish independently and eventually merge with mainstream IKS. Interaction with Islamic scholarship enriches both traditions." },
            { date: "c. 1200–1850 CE", title: "Medieval and Syncretic Phase", desc: "Bhakti and Sufi movements create new forms of philosophical and artistic expression. Regional languages produce enormous literary corpora. Indo-Islamic architectural synthesis (Mughal architecture) represents a remarkable fusion of IKS traditions." },
            { date: "1850 CE – Present", title: "Colonial Impact and Modern Revival", desc: "British colonisation disrupts traditional knowledge transmission (Macaulay's education policy, 1835). The Indian Renaissance (Ram Mohan Roy, Vivekananda, Aurobindo, Gandhi) revives and reinterprets IKS. Post-independence, India establishes CSIR, IITs, and eventually the NEP 2020 mandates integration of IKS into higher education curricula." }
          ]
        },
        { type: 'sub-header', text: 'Why Is the Historical Evolution Significant?' },
        { 
          type: 'paragraph', 
          text: "Understanding the historical evolution of IKS is important for the following reasons:" 
        },
        {
          type: 'list',
          variant: 'bullet',
          items: [
            "Priority Claims: India's contributions to mathematics (zero, decimal system, calculus concepts), astronomy, medicine, and linguistics predate similar discoveries in Europe by centuries. Historical awareness prevents intellectual colonialism.",
            "Continuity and Relevance: IKS is not merely ancient history — it provides living, applicable insights in fields like medicine (Ayurveda), architecture (Vastu), and governance (Arthashastra).",
            "National Identity and Soft Power: Yoga, meditation, Ayurveda, and Indian philosophical frameworks are now globally influential. Understanding their historical roots is essential.",
            "Interdisciplinary Model: IKS never separated science from ethics, or art from science. This holistic approach has profound implications for modern transdisciplinary education."
          ]
        },
        { 
          type: 'callout', 
          variant: 'quote', 
          label: 'Quote to Remember',
          text: "\"India was the motherland of our race, and Sanskrit the mother of Europe's languages: she was the mother of our philosophy; mother, through the Arabs, of much of our mathematics; mother, through the Buddha, of the ideals embodied in Christianity; mother, through the village community, of self-government and democracy.\" — Will Durant, American historian, The Story of Civilization (1935)" 
        },
        { type: 'header', text: '1.1 — C: Key Areas: Philosophy, Science, Arts, and Culture' },
        { type: 'sub-header', text: 'I. Philosophy (Darshana)' },
        { 
          type: 'paragraph', 
          text: "Indian philosophy (Darshana, literally \"vision\") is remarkable for its systematic nature and the breadth of its inquiries. It is broadly divided into Astika (Orthodox) and Nastika (Heterodox) schools based on their acceptance or rejection of Vedic authority." 
        },
        {
          type: 'grid',
          items: [
            { title: "Nyaya", text: "Founded by Gautama Muni. Focuses on logic, epistemology, and valid means of knowledge (pramana). The foundation of Indian scientific method." },
            { title: "Vaisheshika", text: "Founded by Kanada. A proto-atomic theory of the universe — postulates that matter is made of indivisible particles (anu). Remarkable parallel to modern atomic theory." },
            { title: "Samkhya", text: "Founded by Kapila. Dualistic philosophy distinguishing Purusha (consciousness) from Prakriti (matter). One of the oldest philosophical systems in the world." },
            { title: "Yoga", text: "Associated with Patanjali's Yogasutras. Provides an eight-fold path (Ashtanga Yoga) for mental discipline, integration, and spiritual liberation. Globally practised today." },
            { title: "Mimamsa", text: "Focuses on correct interpretation of Vedic ritual texts. Pioneered hermeneutics (science of interpretation) in India." },
            { title: "Vedanta", text: "Philosophy of the Upanishads. Three major sub-schools: Advaita (Shankara), Vishishtadvaita (Ramanuja), Dvaita (Madhva). Deeply influential in modern management thought." }
          ]
        },
        { 
          type: 'paragraph', 
          text: "The Nastika schools — Buddhism (founded by Gautama Buddha), Jainism (revived by Mahavira), and Charvaka (materialist school) — significantly enriched Indian intellectual life by challenging orthodoxy, promoting empirical inquiry, non-violence, and pluralistic epistemology." 
        },
        { 
          type: 'callout', 
          variant: 'example', 
          label: 'Key Philosophical Concept for Exam',
          text: "The concept of \"Dharma\" is central to IKS. Dharma does not simply mean \"religion.\" It is a multidimensional concept meaning: cosmic order (Rita), moral duty, social responsibility, and ethical law. In the Mahabharata, Krishna explains to Arjuna that Dharma (righteous duty) must take precedence over personal emotions — a concept directly applicable to modern organisational ethics and leadership decision-making." 
        },
        { type: 'sub-header', text: 'II. Science and Technology' },
        { 
          type: 'paragraph', 
          text: "Contrary to colonial narratives that presented ancient India as only spiritually inclined, IKS contains sophisticated, empirically grounded scientific knowledge across multiple disciplines:" 
        },
        {
          type: 'list',
          variant: 'bullet',
          items: [
            "Mathematics: Invention of zero (Brahmagupta, 628 CE formally), the decimal number system, negative numbers, quadratic equations, and the concept of infinity (ananta). The Sulbasutras (~800 BCE) contain the Pythagorean theorem long before Pythagoras.",
            "Astronomy: Aryabhata (499 CE) correctly calculated the Earth's circumference (~39,968 km vs actual 40,075 km), proposed Earth's rotation on its axis, and developed sine tables. The Surya Siddhanta calculated the sidereal period of planets with extraordinary accuracy.",
            "Medicine (Ayurveda): Sushruta (600 BCE) performed over 300 types of surgical operations including rhinoplasty (nasal reconstruction), cataract removal, and Caesarean section. The Charaka Samhita describes the concept of tridosha (Vata, Pitta, Kapha) and psychosomatic medicine.",
            "Metallurgy: The Iron Pillar of Delhi (402 CE, Gupta period) has not rusted in over 1,600 years — a feat of metallurgical knowledge that modern scientists have studied extensively.",
            "Chemistry (Rasashastra): Nagarjuna (2nd century CE) developed zinc smelting and mercury processing. The Rasaratnasamuccaya describes detailed alchemical processes."
          ]
        },
        { type: 'sub-header', text: 'III. Arts (Kala)' },
        { 
          type: 'paragraph', 
          text: "The Natyashastra of Bharata Muni (~200 BCE – 200 CE) is arguably the most comprehensive treatise on performing arts ever written. It covers:" 
        },
        {
          type: 'list',
          variant: 'bullet',
          items: [
            "Rasa Theory: The doctrine of eight (later nine) rasas (aesthetic emotions) — Shringara (love), Hasya (comedy), Karuna (compassion), Raudra (fury), Vira (heroism), Bhayanaka (terror), Bibhatsa (disgust), Adbhuta (wonder), and Shanta (tranquility). This is the foundation of all Indian classical arts.",
            "Classical Dance Forms: Bharatanatyam, Kathak, Odissi, Kuchipudi, Manipuri, Kathakali, Mohiniyattam, and Sattriya are all rooted in principles articulated in the Natyashastra.",
            "Music: The Sangeet Ratnakar of Sharangadeva (13th century CE) systematises Indian classical music into the raga-tala framework. Indian music theory recognised microtonal intervals (shruti) that modern Western music does not distinguish."
          ]
        },
        { type: 'sub-header', text: 'IV. Culture' },
        { 
          type: 'paragraph', 
          text: "Indian culture is characterised by the concept of Vasudhaiva Kutumbakam (\"The world is one family\" — Mahopanishad 6.71), which represents a cultural orientation towards inclusivity, tolerance, and universal brotherhood. Key cultural principles include:" 
        },
        {
          type: 'list',
          variant: 'bullet',
          items: [
            "Ahimsa (Non-violence): A principle in Jainism, Buddhism, and Hinduism that influenced Gandhi's political philosophy and Martin Luther King Jr.'s civil rights movement.",
            "Pancha Kosha Model: The Taittiriya Upanishad's model of the human being as five \"sheaths\" — physical, vital, mental, intellectual, and blissful — is a holistic model relevant to modern psychology and human resource management.",
            "Guru-Shishya Parampara: The tradition of lineage-based knowledge transmission between teacher and student, ensuring not just intellectual but ethical and character formation."
          ]
        }
      ]
    },
    {
      id: "1.2",
      title: "Ancient Indian Texts and Their Relevance",
      blocks: [
        { type: 'header', text: '1.2 — A: Vedas, Upanishads, and Puranas' },
        { type: 'sub-header', text: 'The Vedas — Foundation of Indian Knowledge' },
        { 
          type: 'callout', 
          variant: 'definition', 
          label: 'Definition',
          text: "The word Veda comes from the Sanskrit root vid, meaning \"to know.\" The Vedas are a collection of hymns, rituals, philosophical discussions, and cosmological speculation composed in Vedic Sanskrit. They are considered Shruti (that which is heard / revealed), meaning they are regarded as eternal truths directly perceived by ancient sages (Rishis) in deep meditation. They are the oldest religious texts still in use in the world." 
        },
        {
          type: 'table',
          headers: ["Veda", "Meaning", "Content", "Principal Upanishad", "Significance"],
          rows: [
            ["Rigveda", "\"Hymns of Praise\"", "1,028 hymns (suktas) in 10 mandalas. Oldest text; hymns to deities like Agni, Indra, Varuna. Philosophical hymn \"Nasadiya Sukta\" questions origin of universe.", "Aitareya Upanishad", "Source of cosmological inquiry; contains the philosophical seed of Vedanta"],
            ["Samaveda", "\"Veda of Melodies\"", "A liturgical text — most of its verses are from the Rigveda, set to musical notation. The origin of Indian classical music.", "Chandogya Upanishad", "Direct ancestor of Indian music theory; contains the Om as a cosmic sound"],
            ["Yajurveda", "\"Veda of Sacrificial Formulas\"", "Prose and verse formulas (yajus) for ritual performance. Two recensions: Shukla (White) and Krishna (Black) Yajurveda.", "Brihadaranyaka, Katha Upanishad", "Source of procedural knowledge; the Ishavasya Upanishad (part of it) is Gandhi's favourite text"],
            ["Atharvaveda", "\"Veda of the Atharvan priest\"", "Hymns for daily life, healing, marriage, birth, protection. Contains early medical knowledge, herbal remedies, and psychological practices.", "Mundaka, Mandukya Upanishad", "Earliest source of Ayurveda; also contains early political philosophy and governance principles"]
          ]
        },
        { 
          type: 'paragraph', 
          text: "Each Veda has four layers of text: Samhitas (hymns), Brahmanas (ritual explanations), Aranyakas (forest treatises for contemplatives), and Upanishads (philosophical dialogues). This structure moves from the outer ritual to inner realisation — from action to knowledge." 
        },
        { type: 'sub-header', text: 'The Upanishads — Philosophy of the Inner Self' },
        { 
          type: 'callout', 
          variant: 'definition', 
          label: 'Definition',
          text: "The word Upanishad means \"sitting near (upa) below (ni) to receive (shad)\" — referring to the practice of sitting near a guru to receive esoteric wisdom. Also interpreted as knowledge that \"destroys ignorance by revealing Brahman.\" There are 108 Upanishads, of which 10–13 are considered the principal (Mukhya) Upanishads. They form the Vedanta (end/culmination of the Vedas)." 
        },
        {
          type: 'table',
          headers: ["Upanishad", "Key Teaching", "Famous Quote / Concept", "Modern Relevance"],
          rows: [
            ["Brihadaranyaka", "Identity of Atman and Brahman; rebirth cycle; ethical living", "\"Aham Brahmasmi\" — I am Brahman (the ultimate reality)", "Self-awareness, leadership from within"],
            ["Chandogya", "Unity of all existence; inner truth", "\"Tat Tvam Asi\" — That Thou Art (you are the cosmic self)", "Empathy, interconnection, systems thinking"],
            ["Katha", "Dialogue between Nachiketa and Yama (Death) on the nature of the soul", "\"Uttishtha, Jagrata\" — Arise, Awake (quoted by Vivekananda)", "Courage, purposeful leadership"],
            ["Isha", "Renunciation and enjoyment; ethical stewardship of creation", "\"Tena tyaktena bhunjithah\" — Enjoy through renunciation", "Sustainable development; corporate responsibility"],
            ["Mandukya", "Four states of consciousness: waking, dreaming, deep sleep, and turiya (pure consciousness)", "OM as the sound of all existence", "Consciousness studies; neuroscience parallels"],
            ["Mundaka", "Distinction between higher (Para) and lower (Apara) knowledge", "Lower knowledge = sciences; Higher knowledge = Self-knowledge", "Integrated education model (NEP 2020 basis)"],
            ["Taittiriya", "Pancha Kosha (five sheaths of the human being); Anandamaya Kosha (bliss body)", "Education must develop all five sheaths", "Holistic education; HR development models"]
          ]
        },
        { 
          type: 'callout', 
          variant: 'example', 
          label: 'Example for Exam — Nachiketa Story (Katha Upanishad)',
          text: "A young boy named Nachiketa is sent by his father (Vajashravasa) to Yama (the God of Death) as an unintended \"gift.\" Yama, impressed by the boy's persistence, grants him three boons. Nachiketa's third and final boon is the secret of death and the nature of the soul — knowledge that even the gods fear to seek. This story teaches: (a) courage in pursuing truth, (b) the value of authentic inquiry over material temptations, and (c) the guru-student relationship at its highest." 
        },
        { type: 'sub-header', text: 'The Puranas — Encyclopaedia of Indian Civilisation' },
        { 
          type: 'callout', 
          variant: 'definition', 
          label: 'Definition',
          text: "Purana means \"ancient narrative.\" The Puranas are a vast genre of encyclopaedic texts (~400,000 verses collectively) that encode philosophical, cosmological, genealogical, mythological, and scientific knowledge in narrative and storytelling form — making abstract knowledge accessible to common people. There are 18 Mahapuranas and 18 Upapuranas. The most famous are the Bhagavata Purana, Vishnu Purana, Shiva Purana, Brahma Purana, and Markandeya Purana." 
        },
        { 
          type: 'paragraph', 
          text: "Each Purana is traditionally expected to contain five topics (Pancha Lakshana): Sarga (original creation), Pratisarga (re-creation after dissolution), Vamsha (genealogy of gods and sages), Manvantara (cycles of cosmic time), and Vamshanucharita (genealogies of royal dynasties). The Puranas encode knowledge of cosmology, geography, medicine, governance, ethics, and social organisation through myth." 
        },
        { 
          type: 'callout', 
          variant: 'example', 
          label: 'Management Relevance — The Churning of the Ocean',
          text: "The Samudra Manthan story (Bhagavata Purana) describes how gods (Devas) and demons (Asuras) jointly churned the cosmic ocean to extract Amrita (nectar of immortality). The story is a powerful metaphor for: joint ventures and stakeholder collaboration, the emergence of both poison (Halahala — crisis) and nectar (opportunity) from any major project, the role of a leader (Vishnu as Kurma / tortoise) in providing a stable pivot during turbulence, and the importance of managing crises (Shiva drinks the poison) rather than avoiding them." 
        },
        { type: 'header', text: '1.2 — B: The Epics: Ramayana and Mahabharata' },
        { type: 'sub-header', text: 'The Ramayana' },
        { 
          type: 'callout', 
          variant: 'definition', 
          label: 'Definition and Basic Facts',
          text: "The Ramayana (literally \"Journey/Story of Rama\") is attributed to the sage Valmiki and is composed in Sanskrit. It contains approximately 24,000 shlokas (verses) arranged in 7 Kandas (books). It is categorised as Smriti (that which is remembered) as opposed to Shruti (revealed). The Ramayana is both a narrative of ideal human conduct and a philosophical treatise on Dharma, Bhakti, and governance. It has been adapted into hundreds of regional versions across South and Southeast Asia." 
        },
        {
          type: 'story',
          title: "Story Summary: The Ramayana",
          meta: "Valmiki Ramayana · 7 Kandas · ~24,000 Shlokas · c. 500 BCE – 300 CE",
          essence: "The Ramayana tells the story of Rama, the ideal man (Maryada Purushottama), and his quest to rescue his wife Sita from the demon king Ravana. It is fundamentally a text about the triumph of Dharma over Adharma.",
          events: [
            { label: "Bala Kanda (Childhood)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187044/1_waynfa.jpg", text: "Rama is born to King Dasharatha of Ayodhya. He and his brothers (Lakshmana, Bharata, Shatrughna) are trained by sage Vishwamitra. Rama breaks the bow of Shiva at King Janaka's court and wins Sita's hand in marriage." },
            { label: "Ayodhya Kanda (Exile)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187034/2_jfckxn.jpg", text: "On the eve of Rama's coronation, Queen Kaikeyi (Dasharatha's second wife) invokes two boons and demands Rama's 14-year exile and her son Bharata's coronation. Rama accepts without protest — his adherence to his father's word over personal interest is the central lesson of Dharmic duty." },
            { label: "Aranya Kanda (Forest)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187042/3_ghycbo.jpg", text: "Rama, Sita, and Lakshmana live in the Dandaka forest. The demoness Surpanakha is disfigured by Lakshmana. Her brother Ravana, driven by ego and desire, abducts Sita while Rama is lured away by a golden deer (maya/illusion). The vulture-king Jatayu dies trying to protect Sita." },
            { label: "Kishkindha Kanda", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187039/4_qhghpy.jpg", text: "Rama meets Hanuman and befriends Sugriva (the monkey king). Rama helps Sugriva regain his kingdom from Vali (his brother who had wrongfully usurped him). In return, Sugriva's army of Vanaras agrees to search for Sita." },
            { label: "Sundara Kanda (Beautiful)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187048/5_ge8kyh.jpg", text: "Hanuman leaps across the ocean to Lanka, finds Sita imprisoned in the Ashoka grove, assures her of Rama's love, and creates havoc in Lanka before returning. This Kanda is considered the most spiritually powerful section of the Ramayana." },
            { label: "Yuddha Kanda (War)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187041/6_bfm2x7.jpg", text: "Rama's army builds a bridge (Ram Setu) across the ocean. The war with Lanka ensues. Many of Ravana's allies — including his noble brother Vibhishana — switch sides due to Ravana's unrighteous conduct. Ravana is ultimately killed by Rama using the Brahmastra weapon. Sita's purity is tested by fire (Agni Pariksha). Rama returns to Ayodhya; the festival of Diwali commemorates this return." },
            { label: "Uttara Kanda (Epilogue)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187036/7_fie5gl.jpg", text: "Rama's rule (Rama Rajya) becomes the paradigm for ideal governance. However, due to public opinion, Sita is exiled while pregnant. She gives birth to Lava and Kusha in Valmiki's hermitage. The Uttara Kanda's ethics of public duty over personal happiness remains deeply debated." }
          ],
          lessons: [
            { label: "Dharma over desire", text: "Rama chooses his duty (father's word) over personal gain (kingship). Relevance: Ethical leadership, integrity in adversity." },
            { label: "Ideal governance (Rama Rajya)", text: "A state where every citizen is treated with justice, fairness, and compassion. Relevance: Modern governance models and CSR." },
            { label: "Servant leadership — Hanuman", text: "Hanuman exemplifies selfless service, extraordinary capability, and complete devotion to purpose. Relevance: Transformational leadership model." },
            { label: "The danger of ego (Ravana)", text: "Ravana is highly educated, a devotee of Shiva, a great scholar — yet his ego destroys him. Relevance: Hubris in leadership; emotional intelligence." },
            { label: "Trust and team building", text: "Rama builds an alliance with diverse stakeholders (Vanaras, bears, even reformed demons). Relevance: Inclusive leadership, coalition building." }
          ]
        },
        { type: 'sub-header', text: 'The Mahabharata' },
        { 
          type: 'callout', 
          variant: 'definition', 
          label: 'Definition and Basic Facts',
          text: "The Mahabharata, attributed to Sage Vyasa (also known as Vedavyasa or Krishna Dvaipayana), is the longest epic poem in human history with approximately 100,000 shlokas (~1.8 million words — ten times the Iliad and Odyssey combined). It is composed in 18 Parvas (books) with an appendix called the Harivamsa. The Mahabharata famously declares: \"Yad ihasti tad anyatra, yan nehasti na tat kvacit\" — \"What is here may be found elsewhere; what is not here does not exist anywhere.\" This is its claim to encyclopaedic completeness." 
        },
        {
          type: 'story',
          title: "Story Summary: The Mahabharata",
          meta: "Vyasa · 18 Parvas + Harivamsa · ~100,000 Shlokas · c. 400 BCE – 400 CE (compiled)",
          essence: "The Mahabharata is at its core the story of a succession war between two branches of the Kuru royal family — the Pandavas (five sons of Pandu) and the Kauravas (hundred sons of Dhritarashtra) — culminating in the 18-day Battle of Kurukshetra. Embedded within this narrative are discourses on every aspect of human life, duty, governance, and spirituality.",
          events: [
            { label: "Origins (Adi Parva)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187144/1_z7cg8m.jpg", text: "The sage Vyasa begins the tale from the lineage of King Bharata. Two brothers — Dhritarashtra (blind) and Pandu — are born to the Kuru line. Dhritarashtra is denied the throne due to his blindness; Pandu becomes king. Pandu retires to the forest and his five sons (Yudhishthira, Bhima, Arjuna, Nakula, Sahadeva) are born of divine fathers through Kunti and Madri. The Kauravas (Duryodhana and 99 brothers) are born to Dhritarashtra and Gandhari." },
            { label: "Youth and Rivalry", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187147/2_lzavqz.jpg", text: "The Pandavas and Kauravas are trained together. Arjuna's extraordinary archery skill and Bhima's strength create jealousy in Duryodhana. Dronacharya (their teacher) accepts Arjuna as his finest student (demanding Ekalavya's thumb as guru dakshina — a deeply problematic ethical moment). Duryodhana attempts to poison and kill Bhima multiple times." },
            { label: "The Dice Game (Sabha Parva)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187142/3_lrikgl.jpg", text: "Duryodhana, unable to defeat the Pandavas militarily, invites them to a gambling match. Through the skilled but dishonest play of his uncle Shakuni, Yudhishthira loses everything — his kingdom, his brothers, himself, and finally Draupadi (the Pandavas' shared wife). Draupadi is publicly humiliated in the court. The court's silence is a devastating moral failure of governance." },
            { label: "Exile (Vana Parva and Virata Parva)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187152/4_ckbu1t.jpg", text: "The Pandavas are exiled for 12 years to the forest, followed by one year of incognito living. During forest exile, Yudhishthira repeatedly demonstrates moral strength, Bhima destroys demons, and Arjuna obtains divine weapons from the gods including Pashupatastra from Shiva himself." },
            { label: "Failure of Diplomacy (Udyoga Parva)", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187136/5_vlkdtb.jpg", text: "After the exile, Krishna serves as the Pandavas' peace ambassador to the Kaurava court. He offers an extraordinary compromise — merely five villages for the five Pandava brothers. Duryodhana refuses even a needlepoint of land. War becomes inevitable. Krishna reveals the Vishwarupa (cosmic form) to Duryodhana's assembly, which fails to move him." },
            { label: "The Battle of Kurukshetra", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187137/6_qxwnvv.jpg", text: "18 days of catastrophic war. The Kaurava army is led successively by Bhishma, Drona, Karna, and Shalya. The Pandavas win — but at tremendous cost. Almost every warrior on both sides perishes. The Bhagavad Gita is delivered by Krishna to Arjuna on Day 1 of the battle, when Arjuna collapses in moral crisis seeing his teachers and relatives arrayed against him." },
            { label: "The Bhagavad Gita", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187134/7_jomzgq.jpg", text: "The Gita (700 verses in 18 chapters) is the philosophical crown of the Mahabharata. Krishna counsels Arjuna across a range of philosophical frameworks — Karma Yoga (selfless action), Jnana Yoga (path of knowledge), Bhakti Yoga (path of devotion), Raja Yoga (path of meditation) — ultimately urging him to fight his righteous battle without attachment to outcomes. The Gita's teaching of Nishkama Karma (action without desire for fruits) is arguably the most influential management and ethical philosophy from IKS." },
            { label: "Aftermath and Santi Parva", image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1776187145/8_adufcw.jpg", text: "Yudhishthira, devastated by the carnage, considers renouncing kingship. The dying Bhishma delivers the Shanti Parva and Anushasana Parva — over 8,000 verses on statecraft, ethics, governance, economics, and human psychology — from his deathbed of arrows (Shara Shaiya). This section is one of the most comprehensive ancient treatises on management and governance." },
            { label: "Conclusion", text: "The Yadava clan destroys itself through internal conflict. Krishna departs from the world. The Pandavas undertake their final journey to heaven; only Yudhishthira reaches the gates with his body (and a faithful dog, revealed as Dharma himself). He refuses heaven if Duryodhana is there and his brothers are not — ultimately passing the final test of non-discrimination." }
          ],
          lessons: [
            { label: "Nishkama Karma (Gita 2.47)", text: "\"You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.\" Relevance: Process orientation over result orientation; ethical action for its own sake." },
            { label: "Institutional silence", text: "The entire court — Bhishma, Drona, Vidura — failed to stop injustice. Relevance: Whistleblower protection, organisational ethics, bystander effect." },
            { label: "Strategic intelligence (Krishna)", text: "Krishna as a strategist uses diplomacy, deception, inspiration, and direct intervention appropriately. Relevance: Adaptive leadership, situational management." },
            { label: "Moral ambiguity", text: "The Mahabharata presents no simple heroes or villains — Karna is noble but fights on the wrong side; Yudhishthira is righteous but addicted to gambling. Relevance: Complexity theory in ethics, grey-area decision-making." },
            { label: "Governance theory", text: "Bhishma's discourse includes theories of taxation, war and peace, the duties of a king, economic management, and social justice — a comprehensive governance manual." }
          ]
        },
        { 
          type: 'callout', 
          variant: 'quote', 
          label: 'Bhagavad Gita — Central Teaching',
          text: "\"Karmanye vadhikaraste Ma Phaleshu Kadachana, Ma Karma Phala Hetur Bhurma Te Sango Stv Akarmani.\"\n\n\"You have the right to perform actions, but never to their fruits. Do not let the fruits of action be your motivation, nor let your attachment be to inaction.\" — Bhagavad Gita, Chapter 2, Verse 47" 
        },
        { type: 'header', text: '1.2 — C: Relevance to Modern Management and Ethics' },
        { 
          type: 'paragraph', 
          text: "One of the most significant and examinable aspects of IKS in graduation-level curricula is its application to modern management theory, organisational behaviour, leadership, and business ethics. The following analysis draws systematic parallels." 
        },
        { type: 'sub-header', text: 'I. Indian Knowledge System and Management Theory' },
        {
          type: 'table',
          headers: ["IKS Concept / Source", "Core Idea", "Modern Management Parallel"],
          rows: [
            ["Nishkama Karma (Bhagavad Gita)", "Act without attachment to outcomes; focus on process excellence", "Intrinsic motivation, ethical decision-making, servant leadership (Robert Greenleaf)"],
            ["Arthashastra (Kautilya)", "Comprehensive theory of statecraft: taxation, diplomacy, espionage, economic management, HR management of the state", "Strategic management, public administration, PESTLE analysis, competitive intelligence"],
            ["Pancha Kosha Model (Taittiriya Upanishad)", "Human beings operate at five levels: physical, vital, mental, intellectual, blissful", "Maslow's Hierarchy of Needs parallel; holistic employee development; wellness programmes"],
            ["Dharma (Mahabharata, Upanishads)", "Righteous conduct aligned with one's role, context, and cosmic order", "Corporate governance, CSR, stakeholder theory, ESG frameworks"],
            ["Guru-Shishya (Vedic tradition)", "Personalised, relationship-based knowledge transfer; mentorship as sacred duty", "Mentoring and coaching in organisations; knowledge management; tacit knowledge transfer"],
            ["Kautilya's Saptanga Theory", "Seven elements of a state: Swami (king/leader), Amatya (ministers/team), Janapada (territory/market), Durga (fort/infrastructure), Kosha (treasury), Danda (army/enforcement), Mitra (allies/networks)", "McKinsey 7-S Framework structural parallel; business ecosystem model"],
            ["Ahimsa and Satya (Jain/Gandhi)", "Non-violence and truthfulness as organisational values", "Ethical leadership; transparency in corporate communication; fair trade principles"],
            ["Samudra Manthan metaphor (Bhagavata Purana)", "Collaboration between opposing forces to create value; crisis as opportunity", "Joint venture management; crisis management; blue ocean strategy"]
          ]
        },
        { type: 'sub-header', text: 'II. Kautilya\'s Arthashastra — India\'s Greatest Management Text' },
        { 
          type: 'paragraph', 
          text: "Kautilya's Arthashastra (~300 BCE, rediscovered in 1905 by R. Shamasastry) is a comprehensive treatise in 15 books covering everything from economic policy to military strategy. Key management contributions include:" 
        },
        {
          type: 'list',
          variant: 'bullet',
          items: [
            "Theory of Motivation: Kautilya identifies four motivators — Dharma (moral obligation), Artha (economic incentive), Kama (personal satisfaction), and Fear — as the four levers of employee and citizen behaviour. This parallels modern motivation theory (Herzberg, Maslow, McClelland).",
            "HR Management: Detailed chapters on selection of ministers (competence, loyalty, and character screening), performance appraisal, remuneration structures, prevention of corruption, and discipline. Modern HRM systems echo these principles.",
            "Competitive Strategy: The Shandagunya (six-fold policy) describes when to ally, attack, march, pause, seek shelter, or pursue dual policy — a precursor to Porter's competitive strategy frameworks.",
            "Espionage and Market Intelligence: Kautilya devotes multiple chapters to intelligence gathering, market research, and counter-intelligence — precursors to modern competitive intelligence (CI) practices."
          ]
        },
        { 
          type: 'callout', 
          variant: 'example', 
          label: 'Example — Kautilya on Leadership',
          text: "Kautilya describes the ideal leader as one who possesses the Rajadharma — fourteen qualities including energy, perseverance, skill in speech, quickness in decision-making, mental alertness, bravery, truthfulness, ease of accessibility, gratitude towards helpers, strength of character, and the ability to win over the hearts of the people. He emphasises that \"the king\'s happiness lies in the happiness of his subjects; in their welfare, his welfare.\" This statement predates modern stakeholder theory by over 2,000 years." 
        },
        { type: 'sub-header', text: 'III. The Bhagavad Gita and Modern Ethics' },
        { 
          type: 'paragraph', 
          text: "The Bhagavad Gita has been studied by global leaders and management scholars including Albert Einstein, Aldous Huxley, T.S. Eliot, Henry David Thoreau, and Herman Hesse. In management education, the Gita is relevant in the following ways:" 
        },
        {
          type: 'list',
          variant: 'bullet',
          items: [
            "Chapter 2 — Conflict Resolution: Arjuna's crisis at Kurukshetra is the classic study of conflict between personal relationships and professional duty. Krishna's approach — clarifying values before action — is the basis of values-based decision making.",
            "Chapter 3 — Karma Yoga and Leadership Style: \"The best way to find yourself is to lose yourself in the service of others\" — leadership by example and selfless service (servant leadership).",
            "Chapter 18 — The Gunas and Leadership Types: The three Gunas (Sattva — clarity, Rajas — action, Tamas — inertia) describe three types of organisational cultures and leadership styles. Sattvic leadership (clarity, wisdom, ethical orientation) is the goal.",
            "Sthitaprajna (Steady-minded person, Gita Chapter 2): The qualities of a person of stable wisdom — undisturbed by sorrow, free from craving, free from fear — describe the ideal of emotionally intelligent leadership, presaging Daniel Goleman's emotional intelligence framework by millennia."
          ]
        },
        { 
          type: 'callout', 
          variant: 'definition', 
          label: 'Important Concept for Exam',
          text: "The Three Gunas (Trigunas) and their management relevance:\nSattva (purity, clarity, knowledge) → Sattvic leader: wise, equanimous, transparent, purpose-driven. Example: servant leaders.\nRajas (passion, action, desire) → Rajasic leader: ambitious, results-oriented, competitive but prone to burnout and ethical shortcuts.\nTamas (inertia, ignorance, darkness) → Tamasic leader: resistant to change, negligent, status-quo oriented.\nOrganisations should aspire to Sattvic cultures while channelling Rajas productively." 
        }
      ]
    }
  ],
  examQuestions: {
    short: [
      { q: "Define Indian Knowledge System (IKS). What does it encompass?", priority: "High Priority" },
      { q: "What is the meaning of the word \"Veda\"? Name the four Vedas and their primary subject matter.", priority: "" },
      { q: "Distinguish between Shruti and Smriti with examples.", priority: "High Priority" },
      { q: "What is the significance of the Upanishads in Indian philosophical tradition?", priority: "" },
      { q: "What does \"Tat Tvam Asi\" mean and in which Upanishad does it appear?", priority: "Likely" },
      { q: "Name the six classical schools (Shad Darshanas) of Indian philosophy. What do they have in common?", priority: "" },
      { q: "Who wrote the Arthashastra? State any two of its contributions to governance and management.", priority: "High Priority" },
      { q: "Define \"Dharma\" as understood in IKS. Why is it considered multidimensional?", priority: "" },
      { q: "Who composed the Ramayana? Name its seven Kandas.", priority: "Likely" },
      { q: "What is the central teaching of the Bhagavad Gita? State Gita 2.47 in your own words.", priority: "High Priority" },
      { q: "Who are the Pandavas and who are the Kauravas? What is the Mahabharata war about?", priority: "" },
      { q: "What does \"Pancha Lakshana\" of a Purana mean? List all five characteristics.", priority: "" },
      { q: "Explain the concept of \"Nishkama Karma\" with an example from daily life.", priority: "High Priority" },
      { q: "What is the Natyashastra? Who wrote it and what is the Rasa Theory?", priority: "" },
      { q: "State any two contributions of ancient India to mathematics.", priority: "Likely" },
      { q: "What is \"Vasudhaiva Kutumbakam\"? From which text does it originate and what does it signify?", priority: "" },
      { q: "What is the Guru-Shishya Parampara? How is it relevant to modern knowledge management?", priority: "" },
      { q: "Briefly describe the story of Nachiketa from the Katha Upanishad. What is its ethical lesson?", priority: "Likely" }
    ],
    long: [
      { q: "Trace the historical evolution of Indian Knowledge Systems from the Vedic period to the present day. Discuss its significance in the contemporary context.", priority: "High Priority" },
      { q: "Critically analyse the four Vedas and the principal Upanishads as sources of knowledge. How do they address both the practical and metaphysical dimensions of human existence?", priority: "High Priority" },
      { q: "Write a detailed essay on the Ramayana as a text on ideal governance and ethical leadership. Illustrate with specific episodes from the epic.", priority: "Likely" },
      { q: "Discuss the Mahabharata as an encyclopaedia of Indian civilisation. With specific reference to the Bhagavad Gita, Shanti Parva, and key narrative episodes, explain how it remains relevant to modern management and ethics.", priority: "High Priority" },
      { q: "Explain the key areas of Indian Knowledge System — philosophy, science, arts, and culture — with suitable examples from ancient texts and their modern applications.", priority: "" },
      { q: "How does the Arthashastra of Kautilya contribute to our understanding of management, statecraft, and organisational theory? Compare it with any modern management framework.", priority: "High Priority" },
      { q: "Discuss the relevance of the Bhagavad Gita's philosophical teachings (especially Nishkama Karma, Trigunas, and Sthitaprajna) to modern business ethics and leadership.", priority: "High Priority" },
      { q: "Write an analytical note on the Puranas as a medium of encoding and transmitting knowledge. Use the Samudra Manthan episode as a case study in management metaphor.", priority: "Likely" },
      { q: "\"IKS is not merely ancient history — it provides living, applicable insights for modern challenges.\" Substantiate this statement with examples from at least three different domains of IKS (e.g., medicine, governance, ethics, arts).", priority: "Likely" },
      { q: "Compare and contrast the Ramayana and the Mahabharata in terms of their philosophical themes, narrative structure, ethical frameworks, and contributions to Indian cultural identity.", priority: "" },
      { q: "Explain the scope of IKS with special reference to scientific and technological achievements of ancient India. How do these challenge colonial narratives about Indian intellectual history?", priority: "" },
      { q: "What is the Pancha Kosha model from the Taittiriya Upanishad? How can it be applied as a framework for human resource development and organisational wellness?", priority: "Likely" }
    ]
  }
};
