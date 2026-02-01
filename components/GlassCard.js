
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

const GlassCard = ({ children, className, hoverEffect = false, ...props }) => {
    return (
        <div
            className={cn(
                "glass rounded-2xl p-6 transition-all duration-300",
                hoverEffect && "hover:bg-white/5 hover:border-white/10 hover:shadow-lg hover:shadow-cine-teal/5",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassCard;
