import { useEffect, useState } from "react";
import "./backgroundAnimation.css";

interface FloatingElement {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    type: "petal" | "sparkle" | "heart";
}

export default function BackgroundAnimations() {
    const [elements, setElements] = useState<FloatingElement[]>([]);

    useEffect(() => {
        const generateElements = () => {
            const newElements: FloatingElement[] = [];

            for (let i = 0; i < 4; i++) {
                newElements.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 20 + 20,
                    duration: Math.random() * 20 + 20,
                    delay: Math.random() * 15,
                    type: "petal",
                });
            }

            for (let i = 5; i < 7; i++) {
                newElements.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 12 + 10,
                    duration: 2000,
                    delay: 3000,
                    type: "sparkle",
                });
            }

            for (let i = 8; i < 11; i++) {
                newElements.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 18 + 16,
                    duration: Math.random() * 25 + 25,
                    delay: Math.random() * 15,
                    type: "heart",
                });
            }

            setElements(newElements);
        };

        generateElements();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {elements.map((element) => (
                <div
                    key={element.id}
                    className={`floating-element ${element.type}`}
                    style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        fontSize: `${element.size}px`,
                        animationDuration: `${element.duration}s`,
                        animationDelay: `${element.delay}s`,
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-overlay animate-pulse-slow z-0"></div>
        </div>
    );
}
