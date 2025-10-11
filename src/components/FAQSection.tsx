"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqItems?: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultFAQItems: FAQItem[] = [
  {
    question: "How do I get started with studying abroad?",
    answer: "Getting started is easy! Book a free consultation with our expert counselors who will assess your academic background, interests, and career goals. We'll help you choose the right country, university, and program that matches your aspirations."
  },
  {
    question: "What countries do you help students apply to?",
    answer: "We assist students with applications to top universities in Australia, UK, Canada, USA, Germany, Netherlands, and many other popular study destinations. Each country has different requirements, and our experts are well-versed in all of them."
  },
  {
    question: "Do I need to take IELTS or other English tests?",
    answer: "Most universities in English-speaking countries require proof of English proficiency. We offer IELTS and PTE preparation courses to help you achieve the required scores. Some universities also accept other tests like TOEFL or Duolingo English Test."
  },
  {
    question: "How long does the application process take?",
    answer: "The timeline varies by country and university, but typically takes 3-6 months for the complete process including application, admission confirmation, and visa processing. We recommend starting the process at least 6-8 months before your intended start date."
  },
  {
    question: "What documents do I need for my application?",
    answer: "Required documents typically include academic transcripts, English proficiency test results, statement of purpose, letters of recommendation, passport copy, and financial documents. Our team will provide you with a complete checklist based on your chosen program and university."
  },
  {
    question: "Do you provide visa assistance?",
    answer: "Yes! We provide comprehensive visa guidance and assistance. Our team helps you prepare all required documents, complete visa applications, and prepare for visa interviews. We have a high success rate in visa approvals."
  },
  {
    question: "What are the costs involved in studying abroad?",
    answer: "Costs include university tuition fees, living expenses, visa fees, and our service charges. The total cost varies by country and university. We provide detailed cost breakdowns during your consultation and help you explore scholarship opportunities."
  },
  {
    question: "Can you help with accommodation and other post-arrival services?",
    answer: "Absolutely! We offer comprehensive support including accommodation assistance, airport pickup, orientation programs, and ongoing support throughout your studies. Our local partners in each country ensure you have a smooth transition."
  }
];

export default function FAQSection({ 
  faqItems = defaultFAQItems, 
  title = "Frequently Asked Questions",
  subtitle = "Got questions? We've got answers. Here are some common questions about studying abroad.",
  className = ""
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section className={`py-8 sm:py-12 lg:py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-my-black mb-3 sm:mb-4">
            <span className="text-my-black relative">{title}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                layout
              >
                {/* Question Header */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-start sm:items-center hover:bg-gray-50 transition-colors duration-200"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-my-black pr-3 sm:pr-4 leading-tight">
                    {item.question}
                  </h3>
                  
                  {/* Plus/Minus Icon */}
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mt-0.5 sm:mt-0">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="relative w-4 h-4 sm:w-5 sm:h-5"
                    >
                      {/* Horizontal line */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 sm:w-4 h-0.5 bg-my-black rounded-full"></div>
                      </div>
                      {/* Vertical line */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scaleY: isOpen ? 0 : 1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-0.5 h-3 sm:h-4 bg-my-black rounded-full origin-center"
                        ></motion.div>
                      </div>
                    </motion.div>
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                        <motion.p
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="text-sm sm:text-base text-gray-600 leading-relaxed"
                        >
                          {item.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}
