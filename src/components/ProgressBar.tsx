import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
    value: number;
    max?: number;
    color?: string;
    height?: string;
    animate?: boolean;
    showGlow?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max = 100,
    color = 'bg-primary',
    height = 'h-1.5',
    animate = false,
    showGlow = true
}) => {
    const [currentPercentage, setCurrentPercentage] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPercentage(Math.min(Math.max((value / max) * 100, 0), 100));
        }, 100);

        return () => clearTimeout(timer);
    }, [value, max]);

    return (
        <div className={`w-full ${height} bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden`}>
            <div
                className={`h-full ${color} transition-all duration-[1500ms] ease-out ${animate ? 'animate-progress' : ''} ${showGlow ? 'shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''}`}
                style={{ width: `${currentPercentage}%` }}
            ></div>
        </div>
    );
};
