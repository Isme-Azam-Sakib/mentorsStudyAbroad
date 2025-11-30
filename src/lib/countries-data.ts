export interface Semester {
  period: string; 
}

export interface AdmissionIntake {
  // postGraduate: Semester[];
  underGraduate: Semester[];
}

export interface EntryRequirement {
  icon: string; 
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  tag?: string;
}

export interface AdmissionStep {
  title: string;
  content: string;
}

export interface Country {
  name: string;
  description: string;
  heroImage: string;

  stats: {
    universities: string;
    annualTuitionFees: string;
    postStudyWork: string;
  };

  universityLogos?: string[];
  whyChoose: { title: string; content: string }[];
  popularSubjects: number[];
  admissionIntake: AdmissionIntake;
  entryRequirements?: EntryRequirement[];
  admissionProcess?: AdmissionStep[];
  partnerUniversitiesNote?: string; 
}

export const countriesData: Record<string, Country> = {
  usa: {
    name: "United States",
    description: "Home to the world’s leading universities and unmatched innovation across every field of study.",
    heroImage: "/country-heros/usa.png",
    stats: { universities: "60+", annualTuitionFees: "USD 10K – 45K", postStudyWork: "Up to 3 Years" },
 
    whyChoose: [
      { 
        title: "Highest number of top-ranked universities globally", 
        content: "The widest range of quality institutions in the world." 
      },
      { 
        title: "Unmatched academic flexibility", 
        content: "Ability to switch majors, take interdisciplinary courses, and customize degree plans." 
      },
      { 
        title: "Cutting-edge innovation", 
        content: "Home to Silicon Valley, NASA, major biomedical hubs, ideal for tech, engineering, and research-driven students." 
      },
      { 
        title: "Massive scholarship availability", 
        content: "Especially at liberal arts colleges and private universities." 
      },
      { 
        title: "Diverse campus culture", 
        content: "Exposure to global peers, ideas, and extracurricular opportunities." 
      }
    ],
    popularSubjects: [1, 9, 2, 10, 11],
    admissionIntake: {
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
        description: "Must have completed GED, Diploma, O/A Level, or HSC. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-sr-graduation-cap",
        title: "Master's Programs",
        description: "Must have a completed Bachelor's degree. IELTS / PTE (Proof of English proficiency)."
      }
    ],
    admissionProcess: [
      {
        title: "Free Counselling & Shortlisting",
        content: "Receive a profile review, shortlist courses/universities, and prepare documents."
      },
      {
        title: "Apply & Accept Offer",
        content: "Submit applications. Once offers arrive, accept your preferred one and pay any required deposit."
      },
      {
        title: "I-20 & Visa Preparation",
        content: "Get your I-20, pay the SEVIS fee, complete DS-160, and prepare financial documents."
      },
      {
        title: "Embassy Interview",
        content: "Attend the F-1 visa interview."
      }
    ]
  },
  uk: {
    name: "United Kingdom",
    description: "A country steeped in academic heritage, where centuries of tradition meet global opportunity.",
    heroImage: "/country-heros/uk.png",
    stats: { universities: "40+ ", annualTuitionFees: "GBP 11K – 24K ", postStudyWork: "2 - 3 years" 
    },
 
    whyChoose: [
      { 
        title: "Shorter degree duration", 
        content: "3-year bachelor's and 1-year master's mean lower overall cost." 
      },
      { 
        title: "Globally recognized qualifications", 
        content: "UK degrees carry strong prestige, especially in business, law, engineering, and humanities." 
      },
      { 
        title: "Strong academic tradition", 
        content: "Critical thinking, research skills, and analytical writing are deeply embedded." 
      },
      { 
        title: "Excellent student support services", 
        content: "Universities offer mental health, academic writing, and career coaching support." 
      },
      { 
        title: "Cultural diversity & easy travel", 
        content: "Rich history, plus Europe is easily accessible." 
      }
    ],
    popularSubjects: [3, 12, 1, 2, 13],
    admissionIntake: {
     underGraduate: [
        { period: "January" },
        { period: "May" },
        { period: "September" }
      ]
    },
    admissionProcess: [
      {
        title: "Step 1: Free Assessment & Counselling",
        content: "Get expert guidance and a personalized study plan."
      },
      {
        title: "Step 2: Submit Documents",
        content: "Provide required academic and supporting documents."
      },
      {
        title: "Step 3: Application Submission",
        content: "Documents are sent to institutions at no extra cost."
      },
      {
        title: "Step 4: Admission & Fee Payment",
        content: "Admission takes 2-8 weeks. Pay tuition directly to the institution (TT/Bank Draft/Card). Refunds are given if the visa is refused. Receive your CAS letter after payment."
      },
      {
        title: "Step 5: Pay Insurance Fees & Apply for Visa",
        content: "Pay insurance fees and apply for visa."
      }
    ]
  },
  ireland: {
    name: "Ireland",
    description: "Experience world-class education in a friendly country known for its warmth and innovation.",
    heroImage: "/country-heros/ireland.png",
    stats: { universities: "15+", annualTuitionFees: "€10K - €55K", postStudyWork: "2 years" },
   
    whyChoose: [
      { 
        title: "Globally respected universities", 
        content: "A high number of world-class institutions."
      },
      { 
        title: "English-speaking environment", 
        content: "Smooth academic and cultural transition."
      },
      { 
        title: "Friendly, close-knit society", 
        content: "Irish campuses are known for their warmth and community vibe."
      },
      { 
        title: "Strong links to industry", 
        content: "Curriculum often tied closely with industry needs and real-world projects."
      }
    ],
    popularSubjects: [15, 16, 3, 2, 17],
    admissionIntake: {
     underGraduate: [
        // { period: "January" },
        // { period: "September" }
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
    ],
    admissionProcess: [
      {
        title: "Step 1: Prepare Documents",
        content: "Academic certificates, passport, photos, SOP, references. (Postgraduates: CV and work experience)."
      },
      {
        title: "Step 2: Complete Application",
        content: "Fill out university forms (no file opening charges)."
      },
      {
        title: "Step 3: Submit to Institution",
        content: "Documents are submitted; admission confirmation takes 2–8 weeks."
      },
      {
        title: "Step 4: Tuition Payment & CoE",
        content: "Pay tuition (refundable if visa is rejected) and receive your Confirmation of Enrolment for visa processing."
      },
      {
        title: "Step 5: Apply for Visa",
        content: "Apply for visa."
      }
    ]
  },
  australia: {
    name: "Australia",
    description: " A global education powerhouse combining academic excellence with an unbeatable quality of life.",
    heroImage: "/country-heros/australia.png",
    stats: { universities: "40+", annualTuitionFees: "AUD 22K – 50K", postStudyWork: "4+ years" },
  
    whyChoose: [
      { 
        title: "Practical, industry-aligned learning", 
        content: "Australian universities emphasize hands-on learning, internships, and real-world projects." 
      },
      { 
        title: "High employability reputation", 
        content: "Australian degrees are globally valued across business, IT, engineering, nursing, and more." 
      },
      { 
        title: "Safe, multicultural cities", 
        content: "Welcoming environment with strong Bangladeshi communities for smoother adaptation." 
      },
      { 
        title: "Strong research output", 
        content: "World-class research facilities and opportunities to work with leading academics." 
      },
      { 
        title: "Flexible education pathways", 
        content: "Foundation, diploma-to-degree, and vocational pathways for all academic backgrounds." 
      }
    ],
    popularSubjects: [1, 2, 3, 4, 5, 6],
    admissionIntake: {
     underGraduate: [
        { period: "February / March Intake" },
        { period: "June / July Intake" },
        { period: "October / November Intake" }
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
        description: "Academic: Bachelor's degree completed. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-ss-trophy",
        title: "Master's Qualifying Program (MQP)",
        description: "Academic: Bachelor's degree completed. IELTS / PTE (Proof of English proficiency)."
      }
    ],
    admissionProcess: [
      {
        title: "Free Personalized Counselling",
        content: "Meet expert counsellors to explore study options, shortlist universities, and understand requirements."
      },
      {
        title: "Admission Confirmation",
        content: "Apply to your preferred institute and receive your offer letter."
      },
      {
        title: "Pay Tuition & OSHC",
        content: "Secure your place by paying tuition fees and arranging Overseas Student Health Cover (OSHC)."
      },
      {
        title: "Submit Updated Documents",
        content: "Provide proof of payment and any updated academic/financial documents. Required Documents: Certified academic certificates, mark sheets, English test scores (IELTS/TOEFL/PTE), CV, SOP, work experience (if any), financial statements (last 6 months), passport copy, gap explanation (if needed), and immigration history."
      },
      {
        title: "Apply for the Visa",
        content: "Apply for the Visa through the Immi account with the help of a counsellor."
      }
    ]
  },
  canada: {
    name: "Canada",
    description: "A welcoming, multicultural destination offering high-quality education and strong post-study career pathways.",
    heroImage: "/country-heros/canada.png",
    stats: { universities: "250+", annualTuitionFees: "CAD 15K - 45K", postStudyWork: "3 years" },
    whyChoose: [
      { 
        title: "Affordable compared to other Western countries", 
        content: "Lower tuition and living costs." 
      },
      { 
        title: "High-quality public education system", 
        content: "Most universities are publicly funded, ensuring consistent quality." 
      },
      { 
        title: "Student-friendly environment", 
        content: "Known worldwide for safety, inclusivity, and international student support." 
      },
      { 
        title: "Co-op programs", 
        content: "Integrated work placements in fields like engineering, IT, and business." 
      },
      { 
        title: "Clear academic progression routes", 
        content: "College-to-university pathways for students with varied GPA profiles." 
      }
    ],
    popularSubjects: [1, 3, 2, 7, 8],
    admissionIntake: {
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
        description: "Completed HSC, O/A Level (or equivalent). IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-ss-user-graduate",
        title: "Bachelor's",
        description: "Completed HSC, O/A Level (or equivalent). IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-sr-graduation-cap",
        title: "Master's",
        description: "Completed Bachelor's degree. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-ss-trophy",
        title: "Post Graduate Diploma",
        description: "Completed Master's degree. IELTS / PTE (Proof of English proficiency)."
      }
    ],
    admissionProcess: [
      {
        title: "Step 1: Explore & Get Guidance",
        content: "Receive expert counselling to choose the right university and course."
      },
      {
        title: "Step 2: Choose Your Path",
        content: "Decide on your preferred university and program."
      },
      {
        title: "Step 3: Prepare Documents",
        content: "Submit transcripts, certificates, passport copy. (Postgraduate applicants: CV, SOP, 2–3 reference letters, work experience (if any))."
      },
      {
        title: "Step 4: Submit Application",
        content: "Send scanned documents and pay application fees (CAD 100–130) + courier charges (BDT 2,000–3,000 if needed)."
      },
      {
        title: "Step 5: Visa Process",
        content: "Receive offer → Pay tuition/deposit → Receive UC offer → Apply for visa → If approved, submit passport."
      }
    ]
  },
  malaysia: {
    name: "Malaysia",
    description: "Discover globally recognized, affordable education in one of Asia’s fastest-growing academic hubs.",
    heroImage: "/country-heros/malaysia.png",
    stats: { universities: "18", annualTuitionFees: "RM 28,000 - 137,251", postStudyWork: "" },

    whyChoose: [
      { 
        title: "Budget-friendly option", 
        content: "Low tuition and affordable living costs with good-quality education." 
      },
      { 
        title: "World-ranked branch campuses", 
        content: "Campuses of Monash, Nottingham, Curtin, and others." 
      },
      { 
        title: "Cultural familiarity", 
        content: "Halal food everywhere, friendly culture, and a comfortable environment for Bangladeshi students." 
      },
      { 
        title: "Strategic hub for Asia", 
        content: "Great exposure to Southeast Asian markets and industries." 
      },
      { 
        title: "Flexible entry pathways", 
        content: "Foundation and diploma programs for students with varied academic readiness." 
      }
    ],
    popularSubjects: [3, 1, 2, 18, 19, 20],
    admissionIntake: {
      underGraduate: [
        { period: "Semester 1: January – March" },
        { period: "Semester 2: April – July" },
        { period: "Semester 3: August – November" }
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
        description: "Minimum GPA: 2.5 out of 5.0 in HSC. 3 Credits in O-Levels (or equivalent)."
      },
      {
        icon: "fi fi-ss-user-graduate",
        title: "Bachelor's Degree",
        description: "Minimum GPA: 3.0 out of 5.0 in HSC OR Minimum 2 passes (Grade D or above) in A-Levels. GED also accepted."
      },
      {
        icon: "fi fi-sr-graduation-cap",
        title: "Master's Degree",
        description: "Minimum CGPA: 2.5 out of 4.0 in Bachelor's (or equivalent qualification)."
      }
    ],
    admissionProcess: [
      {
        title: "Step 1: Free Assessment & Counselling",
        content: "Check eligibility and explore options."
      },
      {
        title: "Step 2: Submit Documents",
        content: "Provide transcripts, passport copy, photo, and Health Declaration form."
      },
      {
        title: "Step 3: Receive Eligibility Letter",
        content: "Complete university-required payments."
      },
      {
        title: "Step 4: Visa Application → Pay EMAS Fees",
        content: "Apply for EVAL and SEV."
      }
    ]
  },
  newzealand: {
    name: "New Zealand",
    description: "Learn in a safe, inclusive environment that embraces lifelong learning and real-world experience.",
    heroImage: "/country-heros/newzealand.png",
    stats: {
      universities: "08",
      annualTuitionFees: "NZD 22K – 45K",
      postStudyWork: "1-3 years"
    },

    whyChoose: [
      {
        title: "High-quality, research-driven universities",
        content: "All eight NZ universities rank in the top global tiers."
      },
      {
        title: "Safe, peaceful environment",
        content: "One of the safest countries in the world with a relaxed lifestyle."
      },
      {
        title: "Strong focus on sustainability and innovation",
        content: "Excellent for environmental science, agriculture, engineering, and biotech."
      },
      {
        title: "Small class sizes",
        content: "More personalized learning and direct interaction with professors."
      },
      {
        title: "Excellent for outdoor and balanced living",
        content: "Nature, adventure, and work-life balance appeal to many students."
      }
    ],
    popularSubjects: [1, 3, 2, 4, 14],
    admissionIntake: {
      underGraduate: [
        { period: "February" },
        { period: "July" }
      ]
    },
    entryRequirements: [
      {
        icon: "fi fi-sr-workshop",
        title: "Foundation Program",
        description: "Academic: O Level or Year 10 completion. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-ss-diploma",
        title: "Diploma Program",
        description: "Academic: HSC or Year 12 completion. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-ss-user-graduate",
        title: "Bachelor's Program",
        description: "Academic: HSC or Year 12 completion. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-sr-graduation-cap",
        title: "Postgraduate Diploma",
        description: "Academic: Bachelor's degree completed. IELTS / PTE (Proof of English proficiency)."
      },
      {
        icon: "fi fi-ss-trophy",
        title: "Master's Program",
        description: "Academic: Bachelor's degree completed. IELTS / PTE (Proof of English proficiency)."
      }
    ],
    admissionProcess: [
      {
        title: "Step 1: Prepare Documents",
        content: "Collect transcripts, certificates, passport copy, English test scores, SOP, and reference letters."
      },
      {
        title: "Step 2: Apply to Institution",
        content: "Submit your application — no application fees required."
      },
      {
        title: "Step 3: Interview (If Required)",
        content: "Some institutions may take an interview."
      },
      {
        title: "Step 4: Receive Offer Letter",
        content: "Get your unconditional offer after a successful review."
      },
      {
        title: "Step 5: Apply for Visa",
        content: "Apply for visa."
      }
    ]
  },
  europe: {
    name: "Europe",
    description: "Study across leading European destinations that offer high-quality education, rich culture, and diverse career opportunities.",
    heroImage: "/country-heros/europe.png",
    stats: {
      universities: "-",
      annualTuitionFees: "-",
      postStudyWork: "-"
    },

    whyChoose: [
      // {
      //   title: "World-Class Universities Across Multiple Countries",
      //   content: "Access top-ranked institutions in countries like Germany, France, Netherlands, Sweden, and more."
      // },
      // {
      //   title: "Affordable or Low Tuition Options",
      //   content: "Benefit from low or even zero tuition fees in selected public universities and scholarship options."
      // },
      // {
      //   title: "Multi-Cultural Experience",
      //   content: "Live and study in a region known for its cultural diversity, history, and lifestyle."
      // },
      // {
      //   title: "Strong Post-Study Career Prospects",
      //   content: "Build your global career with post-study work options and access to the wider European job market."
      // }
    ],
    popularSubjects: [],
    admissionIntake: {
      underGraduate: [
        // { period: "September / October (Main Intake)" },
        // { period: "January / February (Limited Programs)" }
      ]
    },
    entryRequirements: [
      // {
      //   icon: "fi fi-ss-user-graduate",
      //   title: "Bachelor's Programs",
      //   description: "Higher Secondary or A Level completion with required GPA. IELTS / PTE (or equivalent) may be required depending on country."
      // },
      // {
      //   icon: "fi fi-sr-graduation-cap",
      //   title: "Master's Programs",
      //   description: "Completed Bachelor's degree with minimum required CGPA. English proficiency test and, in some cases, country-specific requirements."
      // }
    ],
    admissionProcess: [
      // {
      //   title: "Step 1: Free Counselling & Country Selection",
      //   content: "Discuss your profile, goals, and budget to shortlist suitable European countries and universities."
      // },
      // {
      //   title: "Step 2: Prepare Documents",
      //   content: "Collect academic transcripts, certificates, passport copy, CV, SOP, recommendation letters, and test scores if required."
      // },
      // {
      //   title: "Step 3: Apply to Universities",
      //   content: "Submit online applications to selected universities with complete documentation."
      // },
      // {
      //   title: "Step 4: Receive Offer & Arrange Finances",
      //   content: "Receive admission offers, arrange tuition payment and financial proof as per embassy and university requirements."
      // },
      // {
      //   title: "Step 5: Visa Application",
      //   content: "Apply for the relevant country’s student visa with complete financial and academic documents."
      // }
    ]
  }
  // ,
  // japan: {
  //   name: "Japan",
  //   description: "Study where world-class education meets cutting-edge technology and timeless cultural richness.",
  //   heroImage: "/country-heros/japan.png",
  //   stats: { universities: "01", annualTuitionFees: "¥1,596,000", successfulVisas: "—", postStudyWork: "1 Year" },

  //   whyChoose: [
  //     { 
  //       title: "Merit-Based Scholarship", 
  //       content: "Rewarding outstanding academic performance with financial support to ease study costs."
  //     },
  //     { 
  //       title: "Full-Time Work Opportunities During Vacations", 
  //       content: "Gain valuable work experience and earn extra income during semester breaks."
  //     },
  //     { 
  //       title: "Affordable Tuition Fees", 
  //       content: "Access quality education at a cost that’s lower compared to many other study destinations."
  //     },
  //     { 
  //       title: "World-Class Education Quality", 
  //       content: "Learn from globally recognized institutions with modern facilities and innovative teaching."
  //     }
  //   ],
  //   popularSubjects: [],
  //   admissionIntake: {
  //    underGraduate: [
  //       { period: "January – March" },
  //       { period: "April – July" },
  //       { period: "August – November" }
  //     ]
  //   },
  //   admissionProcess: [
  //     {
  //       title: "Submit academic documents",
  //       content: "Provide your transcripts, certificates, and other required academic documents."
  //     },
  //     {
  //       title: "Provide English test scores",
  //       content: "Submit English proficiency test scores (if applicable)."
  //     },
  //     {
  //       title: "Submit 2 recommendation letters",
  //       content: "Provide two recommendation letters as part of your application."
  //     },
  //     {
  //       title: "Pay the ¥7,000 non-refundable application fee",
  //       content: "Pay the ¥7,000 non-refundable application fee (no extra service or file charges). To apply, you must submit your transcripts, certificates, English test scores (if needed), personal statement, recommendation letters, passport copy, and optional SAT scores. Shortlisted students will attend an online interview, and successful applicants will receive a formal offer letter."
  //     }
  //   ]
  // }
};



