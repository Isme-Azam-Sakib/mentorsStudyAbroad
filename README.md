# Mentors' Study Abroad Platform

A comprehensive Next.js platform for study abroad services, helping students explore educational opportunities worldwide.

##  Features

- **Homepage**: Interactive landing page with hero section, testimonials, and university partnerships
- **Country Pages**: Detailed information for 8+ countries (Australia, USA, UK, Canada, Ireland, Malaysia, New Zealand, Japan)
- **Statistics**: Dynamic country-specific stats and company achievements
- **Universities**: Partner university showcase with animated marquee
- **Admission Process**: Step-by-step guidance with visual process cards
- **Video Testimonials**: Student success stories with responsive carousel
- **Contact Forms**: Multi-step contact forms with API integration
- **Responsive Design**: Optimized for mobile, tablet, and desktop

##  Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Flaticon (fi icons)
- **Images**: Next.js Image optimization
- **State Management**: React Hooks

##  Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** (for version control)

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd study-abroad
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3420
   ```

### Build for Production

1. **Create production build**:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start production server**:
   ```bash
   npm start
   # or
   yarn start
   ```

### Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run type-check` - Run TypeScript type checking


##  Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── countries/         # Country-specific pages
│   ├── contact/           # Contact page
│   ├── events/            # Events & news
│   ├── services/          # Services page
│   └── success-stories/   # Success stories
├── components/            # Reusable components
│   ├── (visa-success)/   # Visa success components
│   ├── Button.tsx        # Custom button component
│   ├── Navbar.tsx        # Navigation component
│   └── ...
└── lib/                   # Utilities and data
    ├── countries-data.ts  # Country information
    └── visa-success-data.ts
```

## 🌟 Key Components

- **Navbar**: Unified navigation with TopBar integration
- **CountryStats**: Responsive statistics display
- **UniversitiesSection**: Animated university logos
- **AdmissionProcess**: Step-by-step process visualization
- **VideoSection**: Student testimonial carousel
- **ContactFormSection**: Multi-step contact forms

##  Responsive Design

- **Mobile**: Optimized layouts with centered content
- **Tablet**: Balanced layouts with appropriate spacing
- **Desktop**: Full-featured layouts with sidebars

## Deployment

Deploy on Vercel for optimal performance:


##  License

This project is proprietary software for study abroad services.