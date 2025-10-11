import React, { useState } from 'react';

interface ApiConfig {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
}

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    openModal?: boolean;
    apiConfig?: ApiConfig;
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
        if (apiConfig) {
            setIsLoading(true);
            try {
                const response = await fetch(apiConfig.url, {
                    method: apiConfig.method || 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...apiConfig.headers
                    },
                    body: apiConfig.body ? JSON.stringify(apiConfig.body) : undefined
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                onApiSuccess?.(data);
            } catch (error) {
                console.error('API call failed:', error);
                onApiError?.(error);
            } finally {
                setIsLoading(false);
            }
        }
        
        onClick?.();
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
