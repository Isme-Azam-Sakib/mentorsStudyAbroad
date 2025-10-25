import { notFound } from 'next/navigation';
import { countriesData } from '@/lib/countries-data';
import CountryPageClient from './CountryPageClient';

interface CountryPageProps {
  params: Promise<{
    country: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(countriesData).map((country) => ({
    country: country,
  }));
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { country: countryKey } = await params;
  const country = countriesData[countryKey as keyof typeof countriesData];

  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  return {
    title: `${country.name} | Study Abroad`,
    description: `Study abroad opportunities in ${country.name}. ${country.description}`,
  };
}


export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countryKey } = await params;
  const country = countriesData[countryKey as keyof typeof countriesData];

  if (!country) {
    notFound();
  }

  return <CountryPageClient country={country} countryKey={countryKey} />;
}
