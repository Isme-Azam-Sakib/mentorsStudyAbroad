"use client";

import React, { useState } from 'react';
import { CustomRadio } from './CustomRadio';
import { Button } from './Button';
import { CustomInput } from './CustomInput';
import { getConsultationRequestApiUrl } from '@/lib/config';
import { validateFormData, sanitizeInput, secureLog } from '@/lib/security';
import { useBrowserExtensionFix } from '@/hooks/useBrowserExtensionFix';

interface FormData {
    country: string;
    intake: string;
    level: string;
    subject: string;
    fullName: string;
    email: string;
    phone: string;
    nearestBranch: string;
    consent: boolean;
}

interface StudyAbroadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const StudyAbroadModal: React.FC<StudyAbroadModalProps> = ({ isOpen, onClose }) => {
    // Use the custom hook to handle browser extension attributes
    useBrowserExtensionFix();
    
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState<FormData>({
        country: '',
        intake: '',
        level: '',
        subject: '',
        fullName: '',
        email: '',
        phone: '',
        nearestBranch: '',
        consent: false
    });

    const countries = [
        { value: 'uk', label: 'UK' },
        { value: 'usa', label: 'USA' },
        { value: 'canada', label: 'CAN' },
        { value: 'australia', label: 'AUS' },
        { value: 'newzealand', label: 'NZ' },
        { value: 'ireland', label: 'IRE' },
        { value: 'singapore', label: 'SNG' },
        { value: 'other', label: 'Other' }
    ];

    const intakes = [
        { value: 'january', label: 'January' },
        { value: 'february', label: 'February' },
        { value: 'march', label: 'March' },
        { value: 'april', label: 'April' },
        { value: 'may', label: 'May' },
        { value: 'june', label: 'June' },
        { value: 'july', label: 'July' },
        { value: 'august', label: 'August' },
        { value: 'september', label: 'September' },
        { value: 'october', label: 'October' },
        { value: 'november', label: 'November' },
        { value: 'december', label: 'December' }
    ];

    const levels = [
        { value: 'bachelor', label: 'Bachelor' },
        { value: 'masters', label: 'Masters' },
        { value: 'phd', label: 'PhD' },
        { value: 'diploma', label: 'Diploma' },
        { value: 'certificate', label: 'Certificate' }
    ];

    const branches = [
        { value: 'kalabagan', label: 'Kalabagan' },
        { value: 'Banani', label: 'Banani' },
        { value: 'uttara1', label: 'Uttara 1' },
        { value: 'uttara2', label: 'Uttara 2' },
        { value: 'Mirpur', label: 'Mirpur' },
        { value: 'mouchak', label: 'Mouchak' },
        { value: 'wari', label: 'Wari' },
        { value: 'chittagong', label: 'Chittagong' },
        { value: 'khulna', label: 'Khulna' },
        { value: 'sylhet', label: 'Sylhet' },
        { value: 'unknown', label: 'I do not know' }
    ];

    const handleRadioChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, consent: checked }));
    };

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const getBranchName = (branchValue: string) => {
        const branchMapping: { [key: string]: string } = {
            'kalabagan': 'Kalabagan Branch',
            'Banani': 'Banani Branch',
            'uttara1': 'Uttara 1 Branch',
            'uttara2': 'Uttara 2 Branch',
            'Mirpur': 'Mirpur Branch',
            'mouchak': 'Mouchak Branch',
            'wari': 'Wari Branch',
            'chittagong': 'Chittagong Branch',
            'khulna': 'Khulna Branch',
            'sylhet': 'Sylhet Branch',
            'unknown': 'Unknown Branch'
        };
        return branchMapping[branchValue] || branchValue + ' Branch';
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');
        
        try {
            // Validate and sanitize form data (only if we have actual data)
            if (formData.fullName && formData.email) {
                const validation = validateFormData(formData as unknown as { [key: string]: unknown });
                if (!validation.isValid) {
                    console.error('Form validation errors:', validation.errors);
                    setErrorMessage(`Please check your input: ${Object.values(validation.errors).join(', ')}`);
                    setSubmitStatus('error');
                    return;
                }
            }

            // Sanitize all inputs
            const sanitizedData = {
                country: sanitizeInput(formData.country),
                intake: sanitizeInput(formData.intake),
                level: sanitizeInput(formData.level),
                subject: sanitizeInput(formData.subject),
                fullName: sanitizeInput(formData.fullName),
                email: sanitizeInput(formData.email),
                phone: sanitizeInput(formData.phone),
                nearestBranch: sanitizeInput(formData.nearestBranch)
            };

            const payload = {
                country: sanitizedData.country.toUpperCase(),
                intake_month: sanitizedData.intake,
                education_level: sanitizedData.level.charAt(0).toUpperCase() + sanitizedData.level.slice(1),
                subject: sanitizedData.subject,
                full_name: sanitizedData.fullName,
                email: sanitizedData.email,
                phone: sanitizedData.phone,
                branch_name: getBranchName(sanitizedData.nearestBranch),
                consent: formData.consent
            };
            
            // Use secure logging instead of console.log
            secureLog('Consultation request submission', { 
                hasData: !!payload.full_name,
                country: payload.country 
            });
            
            console.log('StudyAbroadModal API call:', {
                url: getConsultationRequestApiUrl(),
                payload
            });
            
            const response = await fetch(getConsultationRequestApiUrl(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json();
            secureLog('Consultation request submitted successfully', { success: true });
            setSubmitStatus('success');
            
            // Close modal after a short delay to show success message
            setTimeout(() => {
                onClose();
                // Reset form state
                setCurrentStep(0);
                setFormData({
                    country: '',
                    intake: '',
                    level: '',
                    subject: '',
                    fullName: '',
                    email: '',
                    phone: '',
                    nearestBranch: '',
                    consent: false
                });
                setSubmitStatus('idle');
                setErrorMessage('');
            }, 2000);

        } catch (error) {
            secureLog('Form submission failed', { 
                error: error instanceof Error ? error.message : 'Unknown error' 
            }, 'error');
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 0: return formData.country !== '';
            case 1: return formData.intake !== '';
            case 2: return formData.level !== '';
            case 3: return formData.subject.trim() !== '';
            case 4: return formData.fullName.trim() !== '' && formData.email.trim() !== '' && formData.phone.trim() !== '' && formData.nearestBranch !== '' && formData.consent;
            default: return false;
        }
    };

    if (!isOpen) return null;

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="text-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 px-2">Welcome To The Journey Of Studying Abroad!</h2>
                        <p className="text-my-accent mb-6 sm:mb-8 text-sm sm:text-base">Choose Your Desired Country</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                            {countries.map((country) => (
                                <CustomRadio
                                    key={country.value}
                                    id={country.value}
                                    name="country"
                                    value={country.value}
                                    label={country.label}
                                    checked={formData.country === country.value}
                                    onChange={(value) => handleRadioChange('country', value)}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="text-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 px-2">When do you want to start?</h2>
                        <p className="text-my-accent mb-6 sm:mb-8 text-sm sm:text-base">Choose Your Preferred Intake</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                            {intakes.map((intake) => (
                                <CustomRadio
                                    key={intake.value}
                                    id={intake.value}
                                    name="intake"
                                    value={intake.value}
                                    label={intake.label}
                                    checked={formData.intake === intake.value}
                                    onChange={(value) => handleRadioChange('intake', value)}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="text-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 px-2">What level are you interested in?</h2>
                        <p className="text-my-accent mb-6 sm:mb-8 text-sm sm:text-base">Choose Your Education Level</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto">
                            {levels.map((level) => (
                                <CustomRadio
                                    key={level.value}
                                    id={level.value}
                                    name="level"
                                    value={level.value}
                                    label={level.label}
                                    checked={formData.level === level.value}
                                    onChange={(value) => handleRadioChange('level', value)}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="text-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 px-2">What subject interests you?</h2>
                        <p className="text-my-accent mb-6 sm:mb-8 text-sm sm:text-base">Enter Your Preferred Subject</p>
                        <div className="max-w-md mx-auto px-4 sm:px-0">

                            <CustomInput
                                type="text"
                                placeholder="Preferred Subject"
                                value={formData.subject}
                                onChange={(value) => handleInputChange('subject', value)}
                                required
                            />

                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="text-center max-w-md mx-auto px-4 sm:px-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Tell us about yourself</h2>
                        <p className="text-my-accent mb-6 sm:mb-8 text-sm sm:text-base">We need some information to help you better</p>

                        <div className="space-y-3 sm:space-y-4">
                            <CustomInput
                                type="text"
                                placeholder="Full name"
                                value={formData.fullName}
                                onChange={(value) => handleInputChange('fullName', value)}
                                required
                            />

                            <CustomInput
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(value) => handleInputChange('email', value)}
                                required
                            />

                            <CustomInput
                                type="text"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={(value) => handleInputChange('phone', value)}
                                required
                            />

                            <div className="grid grid-cols-2 gap-2">
                                {branches.map((branch) => (
                                    <CustomRadio
                                        key={branch.value}
                                        id={branch.value}
                                        name="nearestBranch"
                                        value={branch.value}
                                        label={branch.label}
                                        checked={formData.nearestBranch === branch.value}
                                        onChange={(value) => handleRadioChange('nearestBranch', value)}
                                        className="text-xs sm:text-sm"
                                    />
                                ))}
                            </div>

                            <div className="flex items-start space-x-3 pt-4">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    checked={formData.consent}
                                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                                    className="mt-1 h-4 w-4 text-my-accent focus:ring-my-accent border-gray-300 rounded flex-shrink-0"
                                />
                                <label htmlFor="consent" className="text-xs sm:text-sm text-gray-700 text-left leading-relaxed">
                                    I consent to receiving Calls, WhatsApp, Email and Google RCS from Mentors&apos; Study abroad to assist with this enquiry.
                                </label>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-4xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-all duration-300 mx-2 sm:mx-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b">
                    {currentStep > 0 && (
                        <button
                            onClick={handlePrevious}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                        >
                            <i className="fi fi-rr-angle-small-left text-lg sm:text-xl"></i>
                        </button>
                    )}
                    <div className="flex-1"></div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                    >
                        <i className="fi fi-rr-cross text-lg sm:text-xl"></i>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fi fi-rr-check text-2xl text-green-600"></i>
                            </div>
                            <h3 className="text-xl font-bold text-green-600 mb-2">Success!</h3>
                            <p className="text-gray-600">Your consultation request has been submitted successfully. We&apos;ll get back to you soon!</p>
                        </div>
                    )}
                    
                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fi fi-rr-cross text-2xl text-red-600"></i>
                            </div>
                            <h3 className="text-xl font-bold text-red-600 mb-2">Submission Failed</h3>
                            <p className="text-gray-600 mb-4">{errorMessage}</p>
                            <Button
                                onClick={() => {
                                    setSubmitStatus('idle');
                                    setErrorMessage('');
                                }}
                                variant="outline"
                                size="sm"
                            >
                                Try Again
                            </Button>
                        </div>
                    )}
                    
                    {/* Form Content */}
                    {submitStatus === 'idle' && renderStep()}
                </div>

                {/* Footer */}
                {submitStatus === 'idle' && (
                    <div className="flex justify-center p-4 sm:p-6 border-t">
                        <button
                            onClick={currentStep === 4 ? handleSubmit : handleNext}
                            disabled={!isStepValid() || isSubmitting}
                            className={`font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-my-accent text-my-white hover:bg-[#c01e24] focus:ring-my-accent px-6 py-3 text-base ${(!isStepValid() || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Submitting...' : (currentStep === 4 ? 'Submit' : 'Next')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
