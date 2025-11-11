import React, { useState } from 'react';

interface ApiConfig {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
}

type ApiConfigFunction = () => ApiConfig;

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    openModal?: boolean;
    apiConfig?: ApiConfig | ApiConfigFunction;
    onApiSuccess?: (response: unknown) => void;
    onApiError?: (error: unknown) => void;
    loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    openModal = false,
    apiConfig,
    onApiSuccess,
    onApiError,
    loadingText = 'Loading...'
}) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const baseClasses = 'font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
        primary: 'bg-my-accent text-my-white hover:bg-[#c01e24] focus:ring-my-accent',
        secondary: 'bg-my-black text-my-white hover:bg-gray-800 focus:ring-my-black',
        outline: 'bg-my-white text-my-black border border-my-black hover:bg-my-black hover:text-my-white focus:ring-my-black'
    };
    
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };
    
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    const handleClick = async () => {
        console.log('Button clicked, apiConfig:', !!apiConfig);
        if (apiConfig) {
            setIsLoading(true);
            try {
                // Get the actual config (call function if it's a function)
                const config = typeof apiConfig === 'function' ? apiConfig() : apiConfig;
                
                console.log('Making API call to:', config.url);
                console.log('Request body:', config.body);
                
                const response = await fetch(config.url, {
                    method: config.method || 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...config.headers
                    },
                    body: config.body ? JSON.stringify(config.body) : undefined
                });
                
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('API Error Response:', errorText);

                    let errorMessage = `Request failed with status ${response.status}. Please try again later.`;
                    try {
                        const parsed = JSON.parse(errorText);
                        if (parsed?.message) {
                            errorMessage = parsed.message;
                        } else if (typeof parsed === 'string') {
                            errorMessage = parsed;
                        }
                    } catch {
                        const text = errorText.replace(/<[^>]*>/g, '').trim();
                        if (text.length > 0) {
                            errorMessage = text.length > 200 ? `${text.slice(0, 200)}…` : text;
                        }
                    }

                    throw new Error(errorMessage);
                }
                
                const data = await response.json();
                console.log('API Success Response:', data);
                onApiSuccess?.(data);
            } catch (error) {
                console.error('API call failed:', error);
                onApiError?.(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Only call onClick if there's no API config
            onClick?.();
        }
    };
    
    return (
        <button
            type={type}
            className={combinedClasses}
            onClick={handleClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? loadingText : children}
        </button>
    );
};
