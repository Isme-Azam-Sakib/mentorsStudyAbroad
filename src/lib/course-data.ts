export interface Course {
  title: string;
  imageThumbnail: string; // Path to the image
  link: string; // URL to blog page (might not be active yet)
}

export const coursesData: Course[] = [
  {
    title: "Information Technology (IT) & Computer Science",
    imageThumbnail: "/courses/it-computer-science.jpg",
    link: "/blog/information-technology-computer-science"
  },
  {
    title: "Business & Management",
    imageThumbnail: "/courses/business-management.jpg",
    link: "/blog/business-management"
  },
  {
    title: "Engineering",
    imageThumbnail: "/courses/engineering.jpg",
    link: "/blog/engineering"
  },
  {
    title: "Medicine & Health Sciences",
    imageThumbnail: "/courses/medicine-health.jpg",
    link: "/blog/medicine-health-sciences"
  },
  {
    title: "Arts & Humanities",
    imageThumbnail: "/courses/arts-humanities.jpg",
    link: "/blog/arts-humanities"
  },
  {
    title: "Law & Legal Studies",
    imageThumbnail: "/courses/law-legal.jpg",
    link: "/blog/law-legal-studies"
  }
];
