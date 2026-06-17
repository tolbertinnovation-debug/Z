/* ════════════════════════════════════════════════════════════
   Tolbert Innovation Hub — Study Abroad Portal
   Demo dataset: 17 partner universities + scholarships + stories
   All data is illustrative placeholder content for demonstration.
════════════════════════════════════════════════════════════ */

const TIH_UNIVERSITIES = [
  {
    id: "graphic-era",
    name: "Graphic Era University",
    short: "GE",
    country: "India",
    city: "Dehradun",
    founded: 1993,
    ranking: "NAAC A+ Accredited",
    website: "https://www.geu.ac.in",
    accent: "#4F46E5",
    tuitionMin: 2200,
    tuitionMax: 4800,
    scholarship: true,
    rating: 4.6,
    students: "18,000+",
    placement: "92%",
    tagline: "Engineering & technology excellence in the Himalayan foothills.",
    about:
      "Graphic Era is a NAAC A+ accredited deemed university renowned for its engineering, management and computing programs. Set against the scenic backdrop of Dehradun, it blends rigorous academics with a vibrant, safe campus that hosts a thriving international student community.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing", "Agriculture"],
    programsPG: ["MBA", "MSc Computer Science", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech Computer Science", duration: "4 Years", tuition: "$3,400 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$2,200 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$4,800 / yr" },
      { program: "B.Sc Nursing", duration: "4 Years", tuition: "$2,900 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 50%", "Sports Scholarship", "International Student Grant"],
    accommodation: { types: ["Single AC Room", "Twin Sharing", "Triple Sharing"], cost: "$900 – $1,600 / yr", facilities: ["Wi-Fi", "Laundry", "Mess", "24/7 Security", "Gym"] }
  },
  {
    id: "pp-savani",
    name: "PP Savani University",
    short: "PPSU",
    country: "India",
    city: "Surat",
    founded: 2017,
    ranking: "UGC Recognized",
    website: "https://www.ppsu.ac.in",
    accent: "#7C3AED",
    tuitionMin: 2000,
    tuitionMax: 4200,
    scholarship: true,
    rating: 4.4,
    students: "8,000+",
    placement: "88%",
    tagline: "Modern industry-linked education in Gujarat's diamond city.",
    about:
      "PP Savani University offers future-ready programs with strong industry linkages in Surat, one of India's fastest-growing cities. Its modern campus emphasises innovation, entrepreneurship and hands-on learning.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing"],
    programsPG: ["MBA", "MSc", "MA"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech IT", duration: "4 Years", tuition: "$3,100 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$2,000 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$4,200 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 40%", "International Scholarship"],
    accommodation: { types: ["Twin Sharing", "Triple Sharing"], cost: "$800 – $1,300 / yr", facilities: ["Wi-Fi", "Mess", "Library", "Security"] }
  },
  {
    id: "gulzar-ggi",
    name: "Gulzar Group of Institutes",
    short: "GGI",
    country: "India",
    city: "Ludhiana",
    founded: 2004,
    ranking: "AICTE Approved",
    website: "https://www.ggi.ac.in",
    accent: "#06B6D4",
    tuitionMin: 1800,
    tuitionMax: 3800,
    scholarship: true,
    rating: 4.3,
    students: "10,000+",
    placement: "85%",
    tagline: "Affordable, career-focused education in Punjab.",
    about:
      "Gulzar Group of Institutes (GGI) provides quality engineering, management and computing education with a strong emphasis on employability and affordability in the heart of Punjab.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Agriculture"],
    programsPG: ["MBA", "MSc", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$2,600 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$1,800 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$3,800 / yr" }
    ],
    scholarships: ["Merit Scholarship", "Sports Scholarship", "International Grant"],
    accommodation: { types: ["Twin Sharing", "Triple Sharing"], cost: "$700 – $1,100 / yr", facilities: ["Wi-Fi", "Mess", "Sports", "Security"] }
  },
  {
    id: "mats",
    name: "MATS University",
    short: "MATS",
    country: "India",
    city: "Raipur",
    founded: 2006,
    ranking: "UGC Recognized",
    website: "https://www.matsuniversity.ac.in",
    accent: "#0EA5E9",
    tuitionMin: 1700,
    tuitionMax: 3600,
    scholarship: true,
    rating: 4.2,
    students: "12,000+",
    placement: "84%",
    tagline: "Holistic education in the heart of central India.",
    about:
      "MATS University offers a wide spectrum of programs across engineering, management, law and sciences with a focus on holistic development and affordable, quality education.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$2,400 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$1,700 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$3,600 / yr" }
    ],
    scholarships: ["Merit Scholarship", "International Scholarship"],
    accommodation: { types: ["Twin Sharing", "Triple Sharing"], cost: "$650 – $1,000 / yr", facilities: ["Wi-Fi", "Mess", "Library"] }
  },
  {
    id: "sr-university",
    name: "SR University",
    short: "SRU",
    country: "India",
    city: "Warangal",
    founded: 1979,
    ranking: "NAAC A++ Accredited",
    website: "https://www.sru.edu.in",
    accent: "#8B5CF6",
    tuitionMin: 2300,
    tuitionMax: 4600,
    scholarship: true,
    rating: 4.5,
    students: "9,500+",
    placement: "90%",
    tagline: "Research-driven learning with a global outlook.",
    about:
      "SR University (formerly SR Engineering College) is a NAAC A++ accredited institution celebrated for its research culture, innovation labs and strong placement record in technology and management.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering"],
    programsPG: ["MBA", "MSc", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech AI & ML", duration: "4 Years", tuition: "$3,500 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$2,300 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$4,600 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 60%", "Research Scholarship", "International Grant"],
    accommodation: { types: ["Single AC Room", "Twin Sharing"], cost: "$850 – $1,500 / yr", facilities: ["Wi-Fi", "Gym", "Mess", "Innovation Lab"] }
  },
  {
    id: "marwadi",
    name: "Marwadi University",
    short: "MU",
    country: "India",
    city: "Rajkot",
    founded: 2008,
    ranking: "NAAC A+ Accredited",
    website: "https://www.marwadiuniversity.ac.in",
    accent: "#EC4899",
    tuitionMin: 2100,
    tuitionMax: 4400,
    scholarship: true,
    rating: 4.5,
    students: "11,000+",
    placement: "89%",
    tagline: "International campus with students from 40+ countries.",
    about:
      "Marwadi University hosts a diverse international community with students from over 40 countries. Known for its global partnerships, modern infrastructure and outcome-based education in Gujarat.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$3,300 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$2,100 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$4,400 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 50%", "International Scholarship", "Sports Scholarship"],
    accommodation: { types: ["Single AC Room", "Twin Sharing", "Triple Sharing"], cost: "$800 – $1,500 / yr", facilities: ["Wi-Fi", "Gym", "Mess", "Sports", "Security"] }
  },
  {
    id: "desh-bhagat",
    name: "Desh Bhagat University",
    short: "DBU",
    country: "India",
    city: "Mandi Gobindgarh",
    founded: 1996,
    ranking: "UGC Recognized",
    website: "https://www.deshbhagatuniversity.in",
    accent: "#F59E0B",
    tuitionMin: 1800,
    tuitionMax: 3900,
    scholarship: true,
    rating: 4.2,
    students: "13,000+",
    placement: "83%",
    tagline: "A multi-disciplinary university with global recognition.",
    about:
      "Desh Bhagat University is a multi-disciplinary institution offering programs across engineering, management, hospitality, agriculture and arts, with a welcoming environment for international students.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$2,500 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$1,800 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$3,900 / yr" }
    ],
    scholarships: ["Merit Scholarship", "International Grant"],
    accommodation: { types: ["Twin Sharing", "Triple Sharing"], cost: "$700 – $1,150 / yr", facilities: ["Wi-Fi", "Mess", "Library", "Security"] }
  },
  {
    id: "lpu",
    name: "Lovely Professional University",
    short: "LPU",
    country: "India",
    city: "Phagwara",
    founded: 2005,
    ranking: "NAAC A++ Accredited",
    website: "https://www.lpu.in",
    accent: "#EF4444",
    tuitionMin: 2500,
    tuitionMax: 5200,
    scholarship: true,
    rating: 4.7,
    students: "30,000+",
    placement: "94%",
    tagline: "One of India's largest universities with a global campus.",
    about:
      "Lovely Professional University (LPU) is among India's largest single-campus universities, hosting students from across India and 50+ countries. Renowned for top recruiters, world-class infrastructure and a buzzing campus life.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$3,800 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$2,500 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$5,200 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 100%", "Scholarship-cum-Admission Test", "International Grant", "Sports Scholarship"],
    accommodation: { types: ["Single AC Room", "Twin Sharing", "Triple Sharing"], cost: "$1,000 – $2,000 / yr", facilities: ["Wi-Fi", "Gym", "Mess", "Sports", "Shopping", "24/7 Security"] }
  },
  {
    id: "royal-global",
    name: "Royal Global University",
    short: "RGU",
    country: "India",
    city: "Guwahati",
    founded: 2017,
    ranking: "NAAC Accredited",
    website: "https://www.rgu.ac",
    accent: "#10B981",
    tuitionMin: 1900,
    tuitionMax: 4000,
    scholarship: true,
    rating: 4.3,
    students: "7,000+",
    placement: "86%",
    tagline: "Gateway to quality education in North-East India.",
    about:
      "Royal Global University in Guwahati offers globally benchmarked programs with a strong emphasis on research, ethics and employability, serving as a leading institution in North-East India.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$2,700 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$1,900 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$4,000 / yr" }
    ],
    scholarships: ["Merit Scholarship", "International Scholarship"],
    accommodation: { types: ["Twin Sharing", "Triple Sharing"], cost: "$750 – $1,200 / yr", facilities: ["Wi-Fi", "Mess", "Library", "Security"] }
  },
  {
    id: "sharda",
    name: "Sharda University",
    short: "SU",
    country: "India",
    city: "Greater Noida",
    founded: 2009,
    ranking: "NAAC A+ Accredited",
    website: "https://www.sharda.ac.in",
    accent: "#3B82F6",
    tuitionMin: 2600,
    tuitionMax: 5400,
    scholarship: true,
    rating: 4.6,
    students: "14,000+",
    placement: "91%",
    tagline: "An international university near New Delhi with 95+ nationalities.",
    about:
      "Sharda University, located near New Delhi, hosts students from 95+ countries on a sprawling green campus. It is well known for medical, engineering and management programs and a truly global student experience.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$4,000 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$2,600 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$5,400 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 50%", "International Scholarship", "Sports Scholarship"],
    accommodation: { types: ["Single AC Room", "Twin Sharing", "Triple Sharing"], cost: "$1,100 – $2,100 / yr", facilities: ["Wi-Fi", "Gym", "Mess", "Hospital", "Sports", "Security"] }
  },
  {
    id: "amity",
    name: "Amity University",
    short: "AU",
    country: "India",
    city: "Noida",
    founded: 2005,
    ranking: "NAAC A+ Accredited",
    website: "https://www.amity.edu",
    accent: "#6366F1",
    tuitionMin: 2800,
    tuitionMax: 5600,
    scholarship: true,
    rating: 4.6,
    students: "25,000+",
    placement: "93%",
    tagline: "A leading private university with global campuses.",
    about:
      "Amity University is one of India's leading private universities with a strong global presence and research focus. Its Noida campus offers world-class facilities and an industry-aligned curriculum.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$4,200 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$2,800 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$5,600 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 100%", "International Scholarship", "Sports Scholarship"],
    accommodation: { types: ["Single AC Room", "Twin Sharing"], cost: "$1,200 – $2,200 / yr", facilities: ["Wi-Fi", "Gym", "Mess", "Sports", "Security"] }
  },
  {
    id: "khalsa",
    name: "Khalsa University",
    short: "KU",
    country: "India",
    city: "Amritsar",
    founded: 2016,
    ranking: "UGC Recognized",
    website: "https://www.khalsauniversity.ac.in",
    accent: "#14B8A6",
    tuitionMin: 1700,
    tuitionMax: 3700,
    scholarship: true,
    rating: 4.1,
    students: "6,000+",
    placement: "82%",
    tagline: "Heritage-rich education in the holy city of Amritsar.",
    about:
      "Khalsa University in Amritsar combines a rich heritage with modern academics across sciences, management, engineering and agriculture, offering a nurturing environment close to the iconic Golden Temple.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$2,300 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$1,700 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$3,700 / yr" }
    ],
    scholarships: ["Merit Scholarship", "International Grant"],
    accommodation: { types: ["Twin Sharing", "Triple Sharing"], cost: "$650 – $1,050 / yr", facilities: ["Wi-Fi", "Mess", "Library"] }
  },
  {
    id: "invertis",
    name: "Invertis University",
    short: "IU",
    country: "India",
    city: "Bareilly",
    founded: 1998,
    ranking: "NAAC Accredited",
    website: "https://www.invertisuniversity.ac.in",
    accent: "#A855F7",
    tuitionMin: 1700,
    tuitionMax: 3600,
    scholarship: true,
    rating: 4.2,
    students: "8,500+",
    placement: "84%",
    tagline: "Industry-aligned programs with strong placements.",
    about:
      "Invertis University offers industry-aligned programs with a dedicated placement cell and modern campus in Bareilly, Uttar Pradesh, focusing on practical, employable skills.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$2,300 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$1,700 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$3,600 / yr" }
    ],
    scholarships: ["Merit Scholarship", "International Scholarship"],
    accommodation: { types: ["Twin Sharing", "Triple Sharing"], cost: "$650 – $1,050 / yr", facilities: ["Wi-Fi", "Mess", "Library", "Security"] }
  },
  {
    id: "mvm",
    name: "MVM Institute",
    short: "MVM",
    country: "India",
    city: "Bhopal",
    founded: 1995,
    ranking: "AICTE Approved",
    website: "https://www.mvminstitute.ac.in",
    accent: "#F97316",
    tuitionMin: 1600,
    tuitionMax: 3400,
    scholarship: true,
    rating: 4.0,
    students: "5,000+",
    placement: "80%",
    tagline: "Career-focused institute in the city of lakes.",
    about:
      "MVM Institute in Bhopal delivers career-focused diploma and degree programs across science, commerce, management and computing with a practical, student-centred approach.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "BCA", duration: "3 Years", tuition: "$1,900 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$1,600 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$3,400 / yr" }
    ],
    scholarships: ["Merit Scholarship", "International Grant"],
    accommodation: { types: ["Twin Sharing", "Triple Sharing"], cost: "$600 – $1,000 / yr", facilities: ["Wi-Fi", "Mess", "Library"] }
  },
  {
    id: "soa",
    name: "SOA University",
    short: "SOA",
    country: "India",
    city: "Bhubaneswar",
    founded: 1996,
    ranking: "NAAC A++ Accredited",
    website: "https://www.soa.ac.in",
    accent: "#0891B2",
    tuitionMin: 2400,
    tuitionMax: 5000,
    scholarship: true,
    rating: 4.6,
    students: "16,000+",
    placement: "92%",
    tagline: "A NAAC A++ research university in eastern India.",
    about:
      "Siksha 'O' Anusandhan (SOA) University is a NAAC A++ accredited research-intensive institution in Bhubaneswar, well regarded for medicine, engineering, management and a vibrant campus ecosystem.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing", "Agriculture"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Tech CSE", duration: "4 Years", tuition: "$3,600 / yr" },
      { program: "BBA", duration: "3 Years", tuition: "$2,400 / yr" },
      { program: "MBA", duration: "2 Years", tuition: "$5,000 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 50%", "Research Scholarship", "International Grant"],
    accommodation: { types: ["Single AC Room", "Twin Sharing", "Triple Sharing"], cost: "$900 – $1,600 / yr", facilities: ["Wi-Fi", "Gym", "Mess", "Hospital", "Security"] }
  },
  {
    id: "cyrus-west",
    name: "Cyrus West University",
    short: "CWU",
    country: "North Cyprus",
    city: "Nicosia",
    founded: 2010,
    ranking: "YÖDAK Accredited",
    website: "#",
    accent: "#D946EF",
    tuitionMin: 3500,
    tuitionMax: 7000,
    scholarship: true,
    rating: 4.4,
    students: "9,000+",
    placement: "87%",
    tagline: "European-standard education on a Mediterranean island.",
    about:
      "Cyrus West University offers European-standard, English-medium programs in beautiful North Cyprus. Students enjoy a safe, multicultural island lifestyle with globally recognised degrees and pathways to Europe.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Sc Computer Science", duration: "4 Years", tuition: "$5,000 / yr" },
      { program: "BBA", duration: "4 Years", tuition: "$3,500 / yr" },
      { program: "MBA", duration: "1.5 Years", tuition: "$7,000 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 50%", "International Scholarship", "Sports Scholarship"],
    accommodation: { types: ["Single Room", "Twin Sharing"], cost: "$1,800 – $3,200 / yr", facilities: ["Wi-Fi", "Gym", "Cafeteria", "Beach Access", "Security"] }
  },
  {
    id: "cyrus-international",
    name: "Cyrus International University",
    short: "CIU",
    country: "North Cyprus",
    city: "Famagusta",
    founded: 2012,
    ranking: "YÖDAK Accredited",
    website: "#",
    accent: "#22D3EE",
    tuitionMin: 3800,
    tuitionMax: 7500,
    scholarship: true,
    rating: 4.5,
    students: "11,000+",
    placement: "88%",
    tagline: "A truly international campus by the Mediterranean Sea.",
    about:
      "Cyrus International University in Famagusta brings together students from across Africa, Asia and Europe for English-medium programs accredited to European standards, with strong global career pathways.",
    programsUG: ["Computer Science", "Information Technology", "Business Administration", "Engineering", "Nursing"],
    programsPG: ["MBA", "MSc", "MA", "PhD Programs"],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    fees: [
      { program: "B.Sc Software Engineering", duration: "4 Years", tuition: "$5,400 / yr" },
      { program: "BBA", duration: "4 Years", tuition: "$3,800 / yr" },
      { program: "MBA", duration: "1.5 Years", tuition: "$7,500 / yr" }
    ],
    scholarships: ["Merit Scholarship up to 50%", "International Scholarship", "Early-Bird Discount"],
    accommodation: { types: ["Single Room", "Twin Sharing"], cost: "$1,900 – $3,400 / yr", facilities: ["Wi-Fi", "Gym", "Cafeteria", "Beach Access", "Security"] }
  }
];

const TIH_SCHOLARSHIPS = [
  { name: "Tolbert Merit Excellence Award", amount: "Up to 60% tuition", level: "Undergraduate & Postgraduate", criteria: "GPA 3.5+ / WAEC Distinctions", country: "All Countries" },
  { name: "African Future Leaders Grant", amount: "$2,000 / year", level: "Undergraduate", criteria: "Leadership & community service", country: "India" },
  { name: "STEM Innovators Scholarship", amount: "Up to 50% tuition", level: "Engineering & CS", criteria: "Strong science & maths grades", country: "All Countries" },
  { name: "Women in Tech Scholarship", amount: "$1,500 / year", level: "All Levels", criteria: "Female applicants in STEM", country: "All Countries" },
  { name: "Mediterranean Pathway Award", amount: "Up to 50% tuition", level: "Undergraduate & Postgraduate", criteria: "Merit-based", country: "North Cyprus" },
  { name: "Sports Excellence Scholarship", amount: "Up to 40% tuition", level: "All Levels", criteria: "National / regional athletes", country: "India" }
];

const TIH_STORIES = [
  { name: "Joseph Kollie", from: "Monrovia, Liberia", uni: "Lovely Professional University", program: "B.Tech Computer Science", photo: "JK", text: "Tolbert Innovation Hub made my dream real. From application to visa, the counselors guided me at every step. I'm now studying CS at LPU on a 40% scholarship!" },
  { name: "Fatu Gbessay", from: "Gbarnga, Liberia", uni: "Sharda University", program: "B.Sc Nursing", photo: "FG", text: "I never imagined studying abroad would be this smooth. The team handled my documents and helped me secure admission and a scholarship at Sharda." },
  { name: "Emmanuel Doe", from: "Buchanan, Liberia", uni: "Cyrus International University", program: "MBA", photo: "ED", text: "Studying in North Cyprus changed my life. The eligibility checker and counseling sessions helped me choose the perfect university for my MBA." },
  { name: "Princess Tarnue", from: "Kakata, Liberia", uni: "Amity University", program: "BBA", photo: "PT", text: "The dashboard kept me updated on every stage. I always knew exactly where my application stood. Highly recommend Tolbert Innovation Hub!" }
];

const TIH_COUNTRIES = [...new Set(TIH_UNIVERSITIES.map(u => u.country))];

if (typeof window !== "undefined") {
  window.TIH_UNIVERSITIES = TIH_UNIVERSITIES;
  window.TIH_SCHOLARSHIPS = TIH_SCHOLARSHIPS;
  window.TIH_STORIES = TIH_STORIES;
  window.TIH_COUNTRIES = TIH_COUNTRIES;
}
