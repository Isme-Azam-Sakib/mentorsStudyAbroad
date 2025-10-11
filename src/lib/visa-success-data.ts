export interface VisaSuccessStory {
  id: number;
  name: string;
  country: string;
  university: string;
  program: string;
  scholarship?: string;
  description: string;
  image: string;
  branch?: string;
}

export const visaSuccessData: VisaSuccessStory[] = [
  // Australia Stories
  {
    id: 1,
    name: "Mohammad Mubassir Khan",
    country: "australia",
    university: "La Trobe University",
    program: "Bachelor of Information Technology (IT)",
    description: "Meet Mohammad Mubassir Khan, he has secured a place in the Bachelor of Information Technology (IT) program at La Trobe University, in Australia! He received all his support from our Banani branch.",
    image: "/visa-success/mohammad-mubassir-khan.png",
    branch: "Banani Branch"
  },
  {
    id: 2,
    name: "Saima Akter",
    country: "australia",
    university: "Charles Darwin University",
    program: "Diploma of Information Technology program, leading to the Bachelor of Information Technology",
    description: "Saima Akter has secured a place in the Diploma of Information Technology program, leading to the Bachelor of Information Technology at Charles Darwin University, Australia, with the guidance of our Banani branch.",
    image: "/visa-success/Saima Akter.png",
    branch: "Banani Branch"
  },
  {
    id: 3,
    name: "Debjoty Roy Sagor",
    country: "australia",
    university: "Macquarie University",
    program: "Master of Engineering (Professional) in Civil and Construction Engineering",
    description: "Debjoty Roy Sagor, has successfully secured admission to the Master of Engineering (Professional) in Civil and Construction Engineering program at Macquarie University. He received guidance and support from our Mirpur branch.",
    image: "/visa-success/debjoty-roy-sagor.png",
    branch: "Mirpur Branch"
  },
  {
    id: 4,
    name: "Gazi Sadabuddin Samoy",
    country: "australia",
    university: "University of Tasmania",
    program: "Bachelor of Information and Communication Technology",
    description: "Meet Gazi Sadabuddin Samoy, who has successfully secured a spot in the Bachelor of Information and Communication Technology program at University of Tasmania, in Australia! He received all the support from the Kalabagan branch.",
    image: "/visa-success/gazi-sadabuddin-samoy.png",
    branch: "Kalabagan Branch"
  },
  {
    id: 5,
    name: "Shashwata Daw",
    country: "australia",
    university: "Deakin University",
    program: "Bachelor of Engineering (Honours)",
    description: "Shashwata Daw has secured a spot in the Bachelor of Engineering (Honours) program at Deakin University, Australia. A big shoutout to our Kalabagan branch for their support.",
    image: "/visa-success/shashwata-daw.png",
    branch: "Kalabagan Branch"
  },

  // USA Stories
  {
    id: 1,
    name: "Tamjidur Rahman Tanvir",
    country: "usa",
    university: "Central Michigan University",
    program: "BSc in Computer Engineering",
    description: "Tamjidur Rahman Tanvir has secured a place in the BSc in Computer Engineering program at Central Michigan University, USA, with guidance from our Uttara Branch.",
    image: "/visa-success/Tanvir.png",
    branch: "Uttara Branch"
  },
  {
    id: 2,
    name: "Umama Ahamad Kasak",
    country: "usa",
    university: "Youngstown State University",
    program: "Bachelor of Science in Nursing",
    description: "Meet Umama Ahamad Kasak, she has secured a place in the Bachelor of Science in Nursing program at Youngstown State University, USA, with guidance from our Kalabagan Branch.",
    image: "/visa-success/Umama Ahamed Kasak.png",
    branch: "Kalabagan Branch"
  },
  {
    id: 3,
    name: "Md. Jahangir Habib",
    country: "usa",
    university: "Murray State University",
    program: "Master of Science in Occupational Safety and Health",
    description: "Meet Md. Jahangir Habib, he secured a place in the Master of Science in Occupational Safety and Health program at Murray State University, USA, with guidance from our Mirpur Branch.",
    image: "/visa-success/Jahangir.png",
    branch: "Mirpur Branch"
  },
  {
    id: 4,
    name: "Toufika Sharmin",
    country: "usa",
    university: "California State University, San Bernardino",
    program: "Master of Science in Computer Science",
    description: "Meet Toufika Sharmin, she has secured a place in the Master of Science in Computer Science program at California State University, San Bernardino, USA, with guidance from our Banani Branch.",
    image: "/visa-success/Jahan.png",
    branch: "Banani Branch"
  },
  {
    id: 5,
    name: "Md Mushfiqur Rahman",
    country: "usa",
    university: "Youngstown State University",
    program: "Bachelor of Science in Information Technology",
    description: "Meet Md Mushfiqur Rahman, he has secured a place in the Bachelor of Science in Information Technology program at Youngstown State University, USA, with guidance from our Kalabagan Branch.",
    image: "/visa-success/mushfiqur-rahman.png",
    branch: "Kalabagan Branch"
  },

  // UK Stories
  {
    id: 1,
    name: "Kazi Efaz Abdun Naser",
    country: "uk",
    university: "University of Greenwich",
    program: "MSc/PGDip in Accounting and Finance with Business Development",
    description: "Kazi Efaz Abdun Naser has been awarded a £4,000 Early Confirmation Scholarship at the University of Greenwich, UK, and secured admission to the MSc/PGDip in Accounting and Finance with Business Development program through the guidance of our Mouchak Branch.",
    image: "/visa-success/Abdun Naser.png",
    branch: "Mouchak Branch"
  },
  {
    id: 2,
    name: "Md Kawsar Ahmed",
    country: "uk",
    university: "Ulster University",
    program: "MSc in Computer Science and Technology with Business Development",
    description: "Meet Md Kawsar Ahmed, he has secured a spot in the MSc in Computer Science and Technology with Business Development program at Ulster University in the UK. He received all the support from our Mirpur Branch.",
    image: "/visa-success/Kawser.png",
    branch: "Mirpur Branch"
  },
  {
    id: 3,
    name: "Airin Akter",
    country: "uk",
    university: "Richmond American University London",
    program: "BA in Business Management (International Business)",
    description: "Airin Akter has secured a place in the BA in Business Management (International Business) program at Richmond American University London, UK, with guidance from our Mouchak Branch.",
    image: "/visa-success/Airin.png",
    branch: "Mouchak Branch"
  },
  {
    id: 4,
    name: "Shahoria Shawon",
    country: "uk",
    university: "Ulster University",
    program: "BSc (Hons) Global Business",
    description: "Meet Shahoria Shawon, he has secured a place in the BSc (Hons) Global Business program at Ulster University, UK, with guidance from our Wari Branch.",
    image: "/visa-success/Shaharia.png",
    branch: "Wari Branch"
  },
  {
    id: 5,
    name: "MD Saiful Islam",
    country: "uk",
    university: "University of South Wales",
    program: "MSc Management",
    description: "Meet MD Saiful Islam, he has successfully secured a spot in the MSc Management program at University of South Wales, UK, with guidance from our Kalabagan branch.",
    image: "/visa-success/Saiful.png",
    branch: "Kalabagan Branch"
  },

  // Canada Stories
  {
    id: 1,
    name: "Iffat Rahman",
    country: "canada",
    university: "Crandall University",
    program: "Master of Management",
    description: "Meet Iffat Rahman, she has secured a place in the Master of Management program at Crandall University, Canada, with guidance from our Mirpur Branch.",
    image: "/visa-success/Iffat.png",
    branch: "Mirpur Branch"
  },
  {
    id: 2,
    name: "Alif Ikbal",
    country: "canada",
    university: "International College of Manitoba (ICM)",
    program: "University Transfer Program (Stage II) in Arts",
    description: "Meet Alif Ikbal, he has secured a place in the University Transfer Program (Stage II) in Arts at the International College of Manitoba (ICM), Canada, with guidance from our Mirpur Branch.",
    image: "/visa-success/Alif.png",
    branch: "Mirpur Branch"
  },
  {
    id: 3,
    name: "Upoma Das Talukder",
    country: "canada",
    university: "University of Windsor",
    program: "Master of Medical Biotechnology",
    description: "Upoma Das Talukder secured a place in the Master of Medical Biotechnology program at the University of Windsor, Canada, with guidance from our Banani Branch. Her husband also received a spouse visa and accompanied her on an Open Work Permit.",
    image: "/visa-success/Upoma.png",
    branch: "Banani Branch"
  },
  {
    id: 4,
    name: "Tasniah Ahmed",
    country: "canada",
    university: "University of Windsor",
    program: "Master of Applied Economics & Policy",
    description: "Tasniah Ahmed secured a place in the Master of Applied Economics & Policy program at the University of Windsor, Canada, with guidance from our Mirpur Branch. Her husband also received a spouse visa and accompanied her on an Open Work Permit.",
    image: "/visa-success/Tasniah.png",
    branch: "Mirpur Branch"
  },
  {
    id: 5,
    name: "Nusrat Jahan Rima",
    country: "canada",
    university: "Niagara University",
    program: "Master of Management",
    description: "Nusrat Jahan Rima secured a place in the Master of Management program at Niagara University, Canada, with guidance from our Mirpur Branch. Her husband also received a spouse visa and accompanied her on an Open Work Permit.",
    image: "/visa-success/Rima.png",
    branch: "Mirpur Branch"
  },

  // Malaysia Stories
  {
    id: 1,
    name: "Kazi Mashrur Faisal",
    country: "malaysia",
    university: "Taylor's University",
    program: "Foundation In Business",
    description: "Our student Kazi Mashrur Faisal has secured a spot in the Foundation In Business program at Taylor's University in Malaysia! He received all the support from our Banani branch.",
    image: "/visa-success/Mashrur.png",
    branch: "Banani Branch"
  },
  {
    id: 2,
    name: "S. M. Rezowan Aqib",
    country: "malaysia",
    university: "Taylor's University",
    program: "Bachelor of Computer Science (Honours)",
    description: "Meet S. M. Rezowan Aqib, he has secured a spot in the Bachelor of Computer Science (Honours) program at Taylor's University, Malaysia! A big shoutout to our Wari branch for the support.",
    image: "/visa-success/Aqib.png",
    branch: "Wari Branch"
  },
  {
    id: 3,
    name: "Ashalina Areebah Ahsan",
    country: "malaysia",
    university: "Taylor's University",
    program: "Bachelor of Fashion Design Technology (Honours)",
    description: "Meet Ashalina Areebah Ahsan, she has secured a spot in the Bachelor of Fashion Design Technology (Honours) program at Taylor's University in Malaysia. She received all the support from our Uttara branch.",
    image: "/visa-success/Nisa.png",
    branch: "Uttara Branch"
  },
  {
    id: 4,
    name: "Rittika Rani Bhowmik",
    country: "malaysia",
    university: "Taylor's College",
    program: "Foundation in Arts",
    description: "Rittika Rani Bhowmik shared this beautiful photo from Malaysia, taken near her campus. After completing her SSC exams, Rittika applied for the Foundation in Arts program with our guidance and is now pursuing her studies at Taylor's College, Malaysia.",
    image: "/visa-success/Rani.png",
    branch: "Not specified"
  },
  {
    id: 5,
    name: "Aaria Altaf",
    country: "malaysia",
    university: "Taylor's University",
    program: "Bachelor of Psychology",
    description: "Aaria Altaf has secured a place in the Bachelor of Psychology program at Taylor's University, Malaysia, with guidance from our Uttara Branch.",
    image: "/visa-success/Aaria.png",
    branch: "Uttara Branch"
  }
];
