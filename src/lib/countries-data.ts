export interface Country {
  name: string;
  description: string;
  heroImage: string;
  // Stats displayed in CountryStats component
  stats: {
    universities: string;
    annualTuitionFees: string;
    successfulVisas: string;
    postStudyWork: string;
  };
  // Image paths to university logos used by UniversitiesSection
  universityLogos: string[];
  // Why choose this country content
  whyChoose: { title: string; content: string }[];
}

export const countriesData: Record<string, Country> = {
  usa: {
    name: "United States",
    description: "Known for world-class universities consistently ranked among the best globally",
    heroImage: "/country-hero-usa.png",
    stats: { universities: "400+", annualTuitionFees: "$10K - $25K", successfulVisas: "600+", postStudyWork: "Up to 3 Years" },
    universityLogos: [
      '/universities/usa/hofstra.png',
      '/universities/usa/long island university.png',
      '/universities/usa/mercy.png',
      '/universities/usa/queens college.png',
      '/universities/usa/San Francisco State University.png',
      '/universities/usa/Texas State University.png',
      '/universities/usa/university of north texas.png',
      '/universities/usa/William paterson University.png'
    ],
    whyChoose: [
      { 
        title: "Top-Ranked Universities", 
        content: "Learn from prestigious institutions recognized worldwide for academic excellence and research innovation." 
      },
      { 
        title: "Cultural Diversity & Global Network", 
        content: "Join a vibrant international community and build lifelong connections across the globe." 
      },
      { 
        title: "Abundant Scholarships", 
        content: "Benefit from a wide range of scholarships designed to make quality education more affordable." 
      },
      { 
        title: "Flexible Programs & Work Opportunities", 
        content: "Choose from adaptable study pathways while gaining valuable work experience during and after your studies." 
      }
    ]
  },
  uk: {
    name: "United Kingdom",
    description: "Studying in UK offers a unique opportunity to experience life in a dynamic environment",
    heroImage: "/country-hero-uk.png",
    stats: { universities: "40+ ", annualTuitionFees: "£10K - £40K", successfulVisas: "500+", postStudyWork: "2 - 3 years" 
    },
    universityLogos: [
      '/universities/uk/bangor.png',
      '/universities/uk/Canterbury Christ Church University.jpg',
      '/universities/uk/London Metropolitan University.png',
      '/universities/uk/London South Bank University.png',
      '/universities/uk/University of Chester.png',
      '/universities/uk/University of South Wales.jpg',
      '/universities/uk/University of the West of England.png',
      '/universities/uk/London South Bank University.png'
    ],
    whyChoose: [
      { 
        title: "Scholarship Opportunities", 
        content: "Access a variety of scholarships that make studying abroad more affordable and rewarding." 
      },
      { 
        title: "Post-Graduation Work Permit", 
        content: "Build your career with international work experience after completing your degree." 
      },
      { 
        title: "Part-Time Job Opportunities During Study", 
        content: "Earn while you learn with flexible part-time work options to support your living expenses." 
      },
      { 
        title: "Fastest Visa Process with High Visa Grant Ratio", 
        content: "Benefit from a smooth, efficient visa process with a strong success rate for international students." 
      }
    ]
  },
  ireland: {
    name: "Ireland",
    description: "a friendly and welcoming destination for international students",
    heroImage: "/country-hero-ireland.png",
    stats: { universities: "15+", annualTuitionFees: "€10K - €55K", successfulVisas: "—", postStudyWork: "2 years" },
    universityLogos: [
      '/universities/ireland/University College Dublin.jpg',
      '/universities/ireland/University College Cork.png',
      '/universities/ireland/University of Galway.png',
      '/universities/ireland/University of Limerick.png',
      '/universities/ireland/Trinity College Dublin.png',
      '/universities/ireland/Dublin City University.png',
      '/universities/ireland/Maynooth University.png',
      '/universities/ireland/Technological University Dublin.png',
    ],
    whyChoose: [
      { 
        title: "World-Class Education", 
        content: "Study at globally recognized universities known for academic excellence and innovative teaching."
      },
      { 
        title: "Wide Variety of Courses", 
        content: "Choose from a broad range of programs tailored to your interests and career goals."
      },
      { 
        title: "Friendly and Inclusive Culture", 
        content: "Experience a welcoming environment that embraces diversity and supports international students."
      },
      { 
        title: "Opportunities for Part-Time Work", 
        content: "Work alongside your studies to gain practical experience and help cover living expenses."
      }
    ]
  },
  australia: {
    name: "Australia",
    description: "One of the top destinations for international students, offering a world-class education system",
    heroImage: "/country-hero-australia.png",
    stats: { universities: "40+", annualTuitionFees: "AUD 26K ", successfulVisas: "353+", postStudyWork: "4+ years" },
    universityLogos: [
      '/universities/australia/Curtin University.png',
      '/universities/australia/Deakin University.png',
      '/universities/australia/James Cook University.png',
      '/universities/australia/La Trobe University.png',
      '/universities/australia/Macquarie University.jpg',
      '/universities/australia/Southern Cross University.png',
      '/universities/australia/The University of Western Australia.png',
      '/universities/australia/Victoria University.png'
    ],
    whyChoose: [
      { 
        title: "Renowned Colleges & Universities", 
        content: "Study at globally recognized institutions known for quality education and strong industry links." 
      },
      { 
        title: "Diverse and Welcoming Culture", 
        content: "Experience a vibrant multicultural environment that makes international students feel at home." 
      },
      { 
        title: "Scholarship Opportunities", 
        content: "Access a wide range of scholarships and financial aid to support your education journey." 
      },
      { 
        title: "Post-Study Work Permit", 
        content: "Gain valuable international work experience with generous post-study work opportunities." 
      }
    ]
  },
  canada: {
    name: "Canada",
    description: "The world’s second-largest country, is a top choice for international students",
    heroImage: "/country-hero-canada.png",
    stats: { universities: "430+", annualTuitionFees: "CAD 15K - 45K", successfulVisas: "3000+", postStudyWork: "3 years" },
    universityLogos: [
      '/universities/canada/algoma.png',
      '/universities/canada/Brock University.png',
      '/universities/canada/International College of Manitoba.png',
      '/universities/canada/Laurentian University.png',
      '/universities/canada/Lakehead University.png',
      '/universities/canada/Toronto Metropolitan University.png',
      '/universities/canada/University of Manitoba.png',
      '/universities/canada/university of windsor.png'

      
    ],
    whyChoose: [
      { 
        title: "Affordable Tuition Fees", 
        content: "Study at globally recognized institutions without the heavy financial burden." 
      },
      { 
        title: "Easy Visa Process", 
        content: "Enjoy a straightforward and student-friendly visa application procedure." 
      },
      { 
        title: "Post-Graduation Work Permit", 
        content: "Gain practical international work experience after completing your studies." 
      },
      { 
        title: "Pathway Programs", 
        content: "Access flexible entry routes that help you meet admission requirements and transition smoothly into your chosen degree." 
      }
    ]
  },
  malaysia: {
    name: "Malaysia",
    description: "Malaysia offers a well-structured and affordable higher education system.",
    heroImage: "/country-hero-malaysia.png",
    stats: { universities: "18", annualTuitionFees: "-", successfulVisas: "500+", postStudyWork: "-" },
    universityLogos: [
      '/universities/malaysia/uow.png',
      '/universities/malaysia/utm.png',
      '/universities/malaysia/Curtin University.png',
      '/universities/malaysia/Heriot Watt University.png',
      '/universities/malaysia/inti.png',
      '/universities/malaysia/klust.png',
      '/universities/malaysia/Sunway-university.png',
      '/universities/malaysia/Swinburne University of Technology.jpg',
      '/universities/malaysia/University of Southampton.png'
    ],
    whyChoose: [
      { 
        title: "Affordable Education", 
        content: "Benefit from low tuition fees and living costs compared to many other destinations." 
      },
      { 
        title: "Smooth Visa Process", 
        content: "High visa success rate, with acceptance of study gaps, GED, and even past visa refusals." 
      },
      { 
        title: "Global Recognition", 
        content: "Earn degrees recognized worldwide with strong academic standards." 
      },
      { 
        title: "Safe & Multicultural", 
        content: "Experience a welcoming, diverse, and secure environment for international students." 
      }
    ]
  },
  japan: {
    name: "Japan",
    description: "Japan offers world-class education, affordability, safety, and a unique mix of tradition and modernity. ",
    heroImage: "/country-hero-japan.png",
    stats: { universities: "01", annualTuitionFees: "¥1,596,000", successfulVisas: "—", postStudyWork: "1 Year" },
    universityLogos: [],
    whyChoose: [
      { 
        title: "Merit-Based Scholarship", 
        content: "Rewarding outstanding academic performance with financial support to ease study costs."
      },
      { 
        title: "Full-Time Work Opportunities During Vacations", 
        content: "Gain valuable work experience and earn extra income during semester breaks."
      },
      { 
        title: "Affordable Tuition Fees", 
        content: "Access quality education at a cost that’s lower compared to many other study destinations."
      },
      { 
        title: "World-Class Education Quality", 
        content: "Learn from globally recognized institutions with modern facilities and innovative teaching."
      }
    ]
  },
  newzealand: {
    name: "New Zealand",
    description: "a top study destination with no age barrier to education, making it accessible at any stage of life.",
    heroImage: "/country-hero-newzealand.png",
    stats: { 
      universities: "14", 
      annualTuitionFees: "NZD 22K-45K", 
      successfulVisas: "—", 
      postStudyWork: "1-3 years" 
    },
    universityLogos: [
      '/universities/newzealand/Auckland University of Technology.png',
      '/universities/newzealand/massey university.png',
      '/universities/newzealand/Lincoln University.png',
      '/universities/newzealand/University of Auckland.png',
      '/universities/newzealand/University of Canterbury.png',
      '/universities/newzealand/University of Otago.png',
      '/universities/newzealand/yoobee.png',
      '/universities/newzealand/New Zealand Tertiary College.png',

    ],
    whyChoose: [
      { 
        title: "Safe & Peaceful Living", 
        content: "Enjoy life in a welcoming country known for its safety, stability, and high living standards."
      },
      { 
        title: "Globally Recognized Universities", 
        content: "Study at top-ranked institutions that are respected worldwide for academic excellence."
      },
      { 
        title: "Post-Study Work Opportunities", 
        content: "Build your career with up to 3 years of post-study work options after graduation."
      },
      { 
        title: "Scholarships for International Students", 
        content: "Benefit from a variety of scholarships that make quality education more affordable."
      }
    ]
  }
};
