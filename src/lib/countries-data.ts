export interface Semester {
  period: string; 
}

export interface AdmissionIntake {
  postGraduate: Semester[];
  underGraduate: Semester[];
}

export interface EntryRequirement {
  icon: string; // Icon class name (e.g., "fi fi-ss-document")
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  tag?: string;
}

export interface Country {
  name: string;
  description: string;
  heroImage: string;

  stats: {
    universities: string;
    annualTuitionFees: string;
    successfulVisas: string;
    postStudyWork: string;
  };

  universityLogos?: string[];
  whyChoose: { title: string; content: string }[];
  popularSubjects: number[];
  admissionIntake: AdmissionIntake;
  entryRequirements?: EntryRequirement[];
}

export const countriesData: Record<string, Country> = {
  usa: {
    name: "United States",
    description: "Known for world-class universities consistently ranked among the best globally",
    heroImage: "/country-heros/usa.png",
    stats: { universities: "60+", annualTuitionFees: "$10K - $25K", successfulVisas: "600+", postStudyWork: "Up to 3 Years" },
 
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
    ],
    popularSubjects: [5, 10, 12, 14, 18],
    admissionIntake: {
      postGraduate: [
        { period: "Spring (January)" },
        { period: "Summer (May)" },
        { period: "Fall (August)" }
      ],
      underGraduate: [
        { period: "Spring (January)" },
        { period: "Summer (May)" },
        { period: "Fall (August)" }
      ]
    },
    entryRequirements: [
      {
        icon: "fi fi-ss-user-graduate",
        title: "Bachelor's Programs",
        description: "Must have completed GED, Diploma, O/A Level, or HSC (any one). IELTS: Minimum overall score of 5.5"
      },
      {
        icon: "fi fi-sr-graduation-cap",
        title: "Master's Programs",
        description: "Must have a completed Bachelor's degree. IELTS: Minimum overall score of 6.0"
      }
    ]
  },
  uk: {
    name: "United Kingdom",
    description: "Studying in UK offers a unique opportunity to experience life in a dynamic environment",
    heroImage: "/country-heros/uk.png",
    stats: { universities: "40+ ", annualTuitionFees: "£13K - £24K", successfulVisas: "500+", postStudyWork: "2 - 3 years" 
    },
 
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
    ],
    popularSubjects: [1, 4, 5, 8, 12, 18, 19, 25],
    admissionIntake: {
      postGraduate: [
        { period: "May" }
      ],
      underGraduate: [
        { period: "January" },
        { period: "May" },
        { period: "September" }
      ]
    }
  },
  ireland: {
    name: "Ireland",
    description: "a friendly and welcoming destination for international students",
    heroImage: "/country-heros/ireland.png",
    stats: { universities: "15+", annualTuitionFees: "€10K - €55K", successfulVisas: "—", postStudyWork: "2 years" },
   
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
    ],
    popularSubjects: [],
    admissionIntake: {
      postGraduate: [
        { period: "September" }
      ],
      underGraduate: [
        { period: "January" },
        { period: "September" }
      ]
    },
    entryRequirements: [
      // {
      //   icon: "fi fi-sr-workshop",
      //   title: "Foundation Program",
      //   description: "Academic: O Level or Year 10 completion. English: IELTS overall 5.5 (no band less than 5.0)."
      // },
      // {
      //   icon: "fi fi-ss-diploma",
      //   title: "Diploma Program",
      //   description: "Academic: HSC or Year 12 completion. English: IELTS overall 5.5 (no band less than 5.0)."
      // },
      // {
      //   icon: "fi fi-ss-user-graduate",
      //   title: "Bachelor's Program",
      //   description: "Academic: HSC or Year 12 completion. English: IELTS overall 6.0 (no band less than 5.5)."
      // },
      // {
      //   icon: "fi fi-sr-graduation-cap",
      //   title: "Postgraduate Diploma",
      //   description: "Academic: Bachelor's degree completed. English: IELTS overall 6.5 (no band less than 6.0)."
      // },
      // {
      //   icon: "fi fi-ss-trophy",
      //   title: "Master's Program",
      //   description: "Academic: Bachelor's degree completed. English: IELTS overall 6.5 (no band less than 6.0)."
      // }
    ]
  },
  australia: {
    name: "Australia",
    description: "One of the top destinations for international students, offering a world-class education system",
    heroImage: "/country-heros/australia.png",
    stats: { universities: "40+", annualTuitionFees: "AUD 22K - 60K ", successfulVisas: "353+", postStudyWork: "4+ years" },
  
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
    ],
    popularSubjects: [2, 3, 5, 13, 14, 16, 18, 19, 22, 24],
    admissionIntake: {
      postGraduate: [
        { period: "February / March" },
        { period: "July" },
        { period: "November" }
      ],
      underGraduate: [
        { period: "February / March" },
        { period: "June / July" },
        { period: "October / November" }
      ]
    },
    entryRequirements: [
      {
        icon: "fi fi-sr-workshop",
        title: "Foundation Program",
        description: "Academic: O Level, SSC, or Year 10 completion. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-ss-diploma",
        title: "Diploma Program",
        description: "Academic: HSC or A Level completion. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-ss-user-graduate",
        title: "Bachelor's Program",
        description: "Academic: HSC or A Level completion. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-sr-graduation-cap",
        title: "Master's Program",
        description: "Academic: Bachelor's degree completed. English: IELTS overall 6.5, no band less than 6.0 (PTE accepted)."
      }
    ]
  },
  canada: {
    name: "Canada",
    description: "The world’s second-largest country, is a top choice for international students",
    heroImage: "/country-heros/canada.png",
    stats: { universities: "430+", annualTuitionFees: "CAD 15K - 45K", successfulVisas: "3000+", postStudyWork: "3 years" },
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
    ],
    popularSubjects: [9, 14, 20, 23],
    admissionIntake: {
      postGraduate: [
        { period: "Spring (January)" },
        { period: "Summer (May)" },
        { period: "Fall (September)" }
      ],
      underGraduate: [
        { period: "Spring (January)" },
        { period: "Summer (May)" },
        { period: "Fall (September)" }
      ]
    },
    entryRequirements: [
      {
        icon: "fi fi-ss-diploma",
        title: "Diploma",
        description: "Completed HSC, O/A Level (or equivalent). IELTS: minimum score overall of 6.0, no band less than 5.5 (varies per institution)"
      },
      {
        icon: "fi fi-ss-user-graduate",
        title: "Bachelor's",
        description: "Completed HSC, O/A Level (or equivalent). IELTS: minimum score overall of 6.0, no band less than 5.5 (varies per institution)"
      },
      {
        icon: "fi fi-sr-graduation-cap",
        title: "Master's",
        description: "Completed Bachelor's degree. IELTS: minimum score overall of 6.0, no band less than 5.5 (varies per institution)"
      },
      {
        icon: "fi fi-ss-trophy",
        title: "Post Graduate Degree",
        description: "Completed Master's degree. IELTS: minimum score overall of 6.0, no band less than 5.5 (varies per institution)"
      }
    ]
  },
  malaysia: {
    name: "Malaysia",
    description: "Malaysia offers a well-structured and affordable higher education system.",
    heroImage: "/country-heros/malaysia.png",
    stats: { universities: "18", annualTuitionFees: "-", successfulVisas: "500+", postStudyWork: "-" },

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
    ],
    popularSubjects: [3, 6, 11, 14, 15, 17, 21, 26],
    admissionIntake: {
      postGraduate: [
        { period: "January – March" },
        { period: "April – July" },
        { period: "August – November" }
      ],
      underGraduate: [
        { period: "January – March" },
        { period: "April – July" },
        { period: "August – November" }
      ]
    },
    entryRequirements: [
      {
        icon: "fi fi-sr-workshop",
        title: "Foundation Program",
        description: "Minimum GPA: 2.5 out of 5.0 in HSC. 5 Credits in O-Levels (or equivalent). Students completing SSC may also be eligible."
      },
      {
        icon: "fi fi-ss-diploma",
        title: "Diploma Program",
        description: "Minimum GPA: 2.5 out of 5.0 in HSC. 3 Credits in O-Levels (or equivalent).\nFor Bachelor's degree: Minimum GPA: 3.0 out of 5.0 in HSC OR Minimum 2 passes (Grade D or above) in A-Levels.\nGED also accepted."
      },
      {
        icon: "fi fi-ss-user-graduate",
        title: "Master's Degree",
        description: "Minimum CGPA: 2.5 out of 4.0 in Bachelor's (or equivalent qualification)."
      }
    ]
  },
  japan: {
    name: "Japan",
    description: "Japan offers world-class education, affordability, safety, and a unique mix of tradition and modernity. ",
    heroImage: "/country-heros/japan.png",
    stats: { universities: "01", annualTuitionFees: "¥1,596,000", successfulVisas: "—", postStudyWork: "1 Year" },

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
    ],
    popularSubjects: [],
    admissionIntake: {
      postGraduate: [
        { period: "January – March" },
        { period: "April – July" },
        { period: "August – November" }
      ],
      underGraduate: [
        { period: "January – March" },
        { period: "April – July" },
        { period: "August – November" }
      ]
    }
  },
  newzealand: {
    name: "New Zealand",
    description: "a top study destination with no age barrier to education, making it accessible at any stage of life.",
    heroImage: "/country-heros/newzealand.png",
    stats: { 
      universities: "14", 
      annualTuitionFees: "NZD 22K-45K", 
      successfulVisas: "—", 
      postStudyWork: "1-3 years" 
    },

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
    ],
    popularSubjects: [7, 14, 16, 18],
    admissionIntake: {
      postGraduate: [
        { period: "February" },
        { period: "July" }
      ],
      underGraduate: [
        { period: "February" },
        { period: "July" }
      ]
    },
    entryRequirements: [
      {
        icon: "fi fi-sr-workshop",
        title: "Foundation Program",
        description: "Academic: O Level or Year 10 completion. English: IELTS overall 5.5 (no band less than 5.0)."
      },
      {
        icon: "fi fi-ss-diploma",
        title: "Diploma Program",
        description: "Academic: HSC or Year 12 completion. English: IELTS overall 5.5 (no band less than 5.0)."
      },
      {
        icon: "fi fi-ss-user-graduate",
        title: "Bachelor's Program",
        description: "Academic: HSC or Year 12 completion. English: IELTS overall 6.0 (no band less than 5.5)."
      },
      {
        icon: "fi fi-sr-graduation-cap",
        title: "Postgraduate Diploma",
        description: "Academic: Bachelor's degree completed. English: IELTS overall 6.5 (no band less than 6.0)."
      },
      {
        icon: "fi fi-ss-trophy",
        title: "Master's Program",
        description: "Academic: Bachelor's degree completed. English: IELTS overall 6.5 (no band less than 6.0)."
      }
    ]
  }
};
