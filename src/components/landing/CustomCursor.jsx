import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // Detect if hovering over clickable elements or specific cards
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.interactive-card')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    const variants = {
        default: {
            x: mousePosition.x - 16, // offset by half width to center (32px width = 16px offset)
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: 'rgba(0, 182, 122, 0.08)', // grovix mint
            borderColor: 'rgba(0, 182, 122, 0.65)',
            borderWidth: '2px',
            borderStyle: 'solid',
            opacity: isVisible ? 1 : 0
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 2.2, // Grow large
            backgroundColor: 'rgba(0, 182, 122, 0.06)',
            borderColor: 'rgba(0, 182, 122, 0.3)',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            opacity: isVisible ? 1 : 0
        }
    };

    return (
        <>
            {/* The trailing animated circle */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:block backdrop-blur-[2px]"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    mass: 0.5
                }}
            />
            {/* Small solid dot exactly at the cursor */}
            <div 
                className="fixed top-0 left-0 w-2 h-2 bg-[#00B67A] rounded-full pointer-events-none z-[10000] hidden md:block transition-opacity duration-300 shadow-[0_0_8px_rgba(0,182,122,0.8)]"
                style={{
                    transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
                    opacity: isVisible ? (isHovering ? 0 : 1) : 0
                }}
            />
        </>
    );
};

export default CustomCursor;
