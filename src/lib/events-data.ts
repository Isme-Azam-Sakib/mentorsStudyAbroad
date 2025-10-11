export type EventStatus = 'upcoming' | 'past';

export interface EventSummary {
    id: number;
    title: string;
    location: string;
    datetimeDisplay: string; // Human readable
    datetimeISO: string; // ISO string for computations
    image: string;
}

export interface EventDetails extends EventSummary {
    heroImage?: string;
    thumbnail?: string;
    description: string;
    content?: string[]; // optional rich paragraphs
}

export const eventsData: EventDetails[] = [
    {
        id: 1,
        title: "Seminar & Spot Assessment: University of Guelph",
        location: "Kalabagan",
        datetimeDisplay: "21 Oct-2025, 11:00 AM - 5:00 PM",
        datetimeISO: "2025-10-21T11:00:00+06:00",
        image: "/service-1.jpg",
        heroImage: "/event-photographer.png",
        thumbnail: "/service-1.jpg",
        description:
            "You are cordially invited to the Study in the UK and Ireland Expo organized by Mentors Study Abroad in collaboration with the British Council IELTS! Representatives from top universities in the UK and Ireland, and our expert counsellors will be present at the venue to help you fulfill your dream of studying in your preferred destination. 21 April 2025 (Monday) 11 AM to 5 PM British Council Auditorium, 5 Fuller Road, Dhaka 1000 Benefits of attending: Free counselling Apply to renowned universities that fit your profile Get on-the-spot application & scholarship facilities To participate, please fill up this form: https://tinyurl.com/mrxtmrmb For more information, please call 01713243415 We look forward to seeing you there!",
        content: [
            "Representatives from top universities in the UK and Ireland, and our expert counsellors will be present at the venue to help you fulfill your dream of studying in your preferred destination.",
            "Benefits of attending: Free counselling, on-the-spot application & scholarship facilities. To participate, please fill up the form.",
        ]
    },
    {
        id: 2,
        title: "Education Expo: UK & Ireland Top Universities",
        location: "International Convention City Bashundhara",
        datetimeDisplay: "05 Nov-2025, 5:00 PM",
        datetimeISO: "2025-11-05T17:00:00+06:00",
        image: "/service-2.jpg",
        heroImage: "/event-photographer.png",
        thumbnail: "/service-2.jpg",
        description:
            "Meet representatives from top universities in the UK & Ireland and get expert guidance from Mentors consultants.",
        content: [
            "Discover programs, scholarships and application tips tailored to your profile.",
        ]
    },
    {
        id: 3,
        title: "Webinar: Visa Preparation Masterclass",
        location: "Online Event (Zoom)",
        datetimeDisplay: "02 Dec-2025, 7:30 PM",
        datetimeISO: "2025-12-02T19:30:00+06:00",
        image: "/service-3.jpg",
        heroImage: "/event-photographer.png",
        thumbnail: "/service-3.jpg",
        description:
            "Join our visa experts to learn the latest requirements, interviews, and documentation tips to maximize your success.",
    },
    {
        id: 104,
        title: "Education Expo 2024 Recap",
        location: "International Convention City Bashundhara",
        datetimeDisplay: "15 Jan-2026, 10:00 AM",
        datetimeISO: "2026-01-15T10:00:00+06:00",
        image: "/service-4.jpg",
        heroImage: "/event-photographer.png",
        thumbnail: "/service-4.jpg",
        description:
            "A look back at our successful 2024 expo with highlights and outcomes.",
    }
];

export function getEventById(id: number): EventDetails | undefined {
    return eventsData.find((e) => e.id === id);
}


