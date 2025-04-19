'use client';

import React, { useEffect, useState } from 'react';

interface LoadingProgressBarProps {
    /**
     * Progress value (0-100)
     */
    progress?: number;

    /**
     * If true, component will auto-increment progress
     */
    autoIncrement?: boolean;

    /**
     * Time in ms for the bar to reach 100% when autoIncrement is true
     */
    duration?: number;

    /**
     * Color class for the progress bar (Tailwind class or custom)
     */
    color?: string;

    /**
     * Callback when progress reaches 100%
     */
    onComplete?: () => void;

    /**
     * Additional CSS classes
     */
    className?: string;
}

/**
 * A loading progress component that shows specific numbers sequentially
 */
export default function LoadingProgressBar({
    progress: externalProgress,
    autoIncrement = true,
    duration = 10000,
    color = 'text-white',
    onComplete,
    className = '',
}: LoadingProgressBarProps) {
    const [internalProgress, setInternalProgress] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Predefined sequence of numbers to display
    const numberSequence = ['00', '27', '59', '77', '99'];

    // Use external progress if provided, otherwise use internal progress
    const progress = externalProgress !== undefined ? externalProgress : internalProgress;

    // Position map for each number (percentage from left)
    const positionMap = [10, 30, 50, 70, 90]; // Position percentages

    useEffect(() => {
        // Handle auto-increment functionality
        if (autoIncrement && !isCompleted) {
            let startTime: number;
            let animationFrame: number;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const elapsedTime = timestamp - startTime;

                // Calculate progress based on elapsed time and duration
                const calculatedProgress = Math.min((elapsedTime / duration) * 100, 99.5);
                setInternalProgress(calculatedProgress);

                // Continue animation if not yet at 99.5%
                if (calculatedProgress < 99.5) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        }
    }, [autoIncrement, duration, isCompleted]);

    // Handle discrete number transitions with visibility
    useEffect(() => {
        // Determine which threshold we've crossed
        const thresholds = [0, 20, 40, 60, 80, 100];

        for (let i = 0; i < thresholds.length - 1; i++) {
            // If we've just crossed this threshold
            if (progress >= thresholds[i] && progress < thresholds[i + 1] && currentNumberIndex !== i) {
                setIsVisible(false); // Hide current number

                // After a brief delay, show the new number
                setTimeout(() => {
                    setCurrentNumberIndex(i);
                    setIsVisible(true);
                }, 300);

                // After 1.5 seconds, hide again if not the last number
                if (i < numberSequence.length - 1) {
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 1800); // 1.5s + 0.3s transition
                }

                break;
            }
        }
    }, [progress, currentNumberIndex]);

    // Watch for progress completion
    useEffect(() => {
        if (progress >= 99.5 && !isCompleted) {
            setInternalProgress(100);
            setIsCompleted(true);
            setCurrentNumberIndex(numberSequence.length - 1);
            setIsVisible(true);

            // Slight delay to ensure animation completes
            setTimeout(() => {
                if (onComplete) {
                    onComplete();
                }
            }, 1500); // Allow time to show the final number
        }
    }, [progress, isCompleted, onComplete, numberSequence.length]);

    return (
        <div className={`fixed bottom-0 left-0 w-full ${className}`} style={{ zIndex: 1010 }}>
            {/* Progress line */}
            <div className="absolute bottom-16 md:bottom-24 left-0 w-full h-[1px] bg-[#333] opacity-30"></div>

            {/* Number display - positioned based on current index */}
            <div
                className={`absolute bottom-0 ${color} text-[15vmin] md:text-[20vmin] font-serif transform -translate-x-1/2 leading-none transition-opacity duration-300`}
                style={{
                    left: `${positionMap[currentNumberIndex]}%`,
                    fontWeight: 200,
                    opacity: isVisible ? 0.95 : 0,
                    paddingBottom: '20px',
                    fontFamily: 'serif'
                }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                {numberSequence[currentNumberIndex]}
            </div>
        </div>
    );
}

/**
 * Hook to control the loading progress
 */
export function useLoadingProgress(initialProgress = 0) {
    const [progress, setProgress] = useState(initialProgress);

    const updateProgress = (newProgress: number) => {
        setProgress(Math.min(Math.max(newProgress, 0), 100));
    };

    const completeProgress = () => {
        setProgress(100);
    };

    return {
        progress,
        setProgress: updateProgress,
        completeProgress
    };
} 