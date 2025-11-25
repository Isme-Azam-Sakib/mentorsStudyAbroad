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
    stats: { universities: "60+", annualTuitionFees: "USD 10K – 35K", postStudyWork: "Up to 3 Years" },
 
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
    stats: { universities: "430+", annualTuitionFees: "-", postStudyWork: "3 years" },
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
    stats: { universities: "18", annualTuitionFees: "-", postStudyWork: "-" },

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
      universities: "14", 
      annualTuitionFees: "NZD 22K – 45K", 
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



