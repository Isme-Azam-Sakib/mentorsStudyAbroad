import React from 'react';

interface CustomRadioProps {
    id: string;
    name: string;
    value: string;
    label: string;
    checked: boolean;
    onChange: (value: string) => void;
    className?: string;
}

export const CustomRadio: React.FC<CustomRadioProps> = ({
    id,
    name,
    value,
    label,
    checked,
    onChange,
    className = ''
}) => {
    return (
        <div className={`relative ${className}`}>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className="sr-only"
            />
            <label
                htmlFor={id}
                className={`block px-3 sm:px-6 py-3 sm:py-4 text-center font-medium rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-200 border-2 text-sm sm:text-base ${
                    checked
                        ? 'bg-my-accent text-white '
                        : 'bg-my-white text-gray-700 border-gray-200 transition-all duration-300 hover:bg-gray-200'
                }`}
            >
                {label}
            </label>
        </div>
    );
};
