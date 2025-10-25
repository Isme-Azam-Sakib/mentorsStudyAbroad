export interface ProspectiveCourse {
  id: number;
  title: string;
  thumbnail: string;
  description?: string;
}

export const prospectiveCoursesData: ProspectiveCourse[] = [
  {
    id: 1,
    title: "Engineering",
    thumbnail: "/prospective-courses/engineering.jpg",
    description: "Various engineering disciplines including mechanical, civil, electrical, and computer engineering"
  },
  {
    id: 2,
    title: "Biotechnology",
    thumbnail: "/prospective-courses/biotechnology.jpg",
    description: "Cutting-edge biotechnology and life sciences programs"
  },
  {
    id: 3,
    title: "Business and Management",
    thumbnail: "/prospective-courses/business-management.jpg",
    description: "Comprehensive business administration and management programs"
  },
  {
    id: 4,
    title: "Medicine",
    thumbnail: "/prospective-courses/medicine.jpg",
    description: "Medical programs and healthcare studies"
  },
  {
    id: 5,
    title: "Computer Science",
    thumbnail: "/prospective-courses/computer-science.jpg",
    description: "Software engineering, data science, and computer programming"
  },
  {
    id: 6,
    title: "Architecture",
    thumbnail: "/prospective-courses/architecture.jpg",
    description: "Architectural design and construction management"
  },
  {
    id: 7,
    title: "Psychology",
    thumbnail: "/prospective-courses/psychology.jpg",
    description: "Human behavior and mental health studies"
  },
  {
    id: 8,
    title: "Environmental Science",
    thumbnail: "/prospective-courses/environmental-science.jpg",
    description: "Sustainability and environmental conservation"
  },
  {
    id: 9,
    title: "Law",
    thumbnail: "/prospective-courses/law.jpg",
    description: "Legal studies and jurisprudence programs"
  },
  {
    id: 10,
    title: "Arts and Design",
    thumbnail: "/prospective-courses/arts-design.jpg",
    description: "Creative arts, graphic design, and visual communication"
  },
  {
    id: 11,
    title: "Agriculture",
    thumbnail: "/prospective-courses/agriculture.jpg",
    description: "Agricultural sciences and food production"
  },
  {
    id: 12,
    title: "Education",
    thumbnail: "/prospective-courses/education.jpg",
    description: "Teaching and educational leadership programs"
  }
];
