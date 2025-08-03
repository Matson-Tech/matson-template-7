import { Flower, Heart, Leaf } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import FadeIn from "../animations/FadeIn";
import "@/styles/Loading.css";

interface FloralElement {
    id: number;
    type: "flower" | "leaf" | "heart";
    size: number;
    duration: number;
    delay: number;
    left: string;
    top: string;
}

const FLORAL_COUNT = 15;

const Loading: React.FC = () => {
    const floralElements = useMemo<FloralElement[]>(
        () =>
            Array.from({ length: FLORAL_COUNT }).map((_, i) => {
                const types: FloralElement["type"][] = [
                    "flower",
                    "leaf",
                    "heart",
                ];
                const type = types[Math.floor(Math.random() * types.length)];
                const size = Math.random() * 20 + 10;
                const duration = Math.random() * 5 + 8;
                const delay = Math.random() * 2 - 1;

                return {
                    id: i,
                    type,
                    size,
                    duration,
                    delay,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                };
            }),
        [],
    );

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-rose-50/90 font-cursive text-rose-600 z-50">
            {/* Animated floral background */}
            <div className="absolute inset-0 overflow-hidden">
                {floralElements.map(
                    ({ id, type, size, duration, delay, left, top }) => {
                        const Icon =
                            type === "flower"
                                ? Flower
                                : type === "leaf"
                                  ? Leaf
                                  : Heart;
                        return (
                            <div
                                key={id}
                                className="absolute"
                                style={{
                                    left,
                                    top,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    animation: `drift ${duration}s ease-in-out ${delay}s infinite`,
                                }}
                            >
                                <Icon className="w-full h-full text-rose-400 opacity-60" />
                            </div>
                        );
                    },
                )}
            </div>

            {/* Content overlay */}
            <div className="relative text-center z-10">
                <FadeIn>
                    <h1 className="text-5xl md:text-6xl">Celebrating Love</h1>
                </FadeIn>
                <FadeIn delay={100}>
                    <p className="mt-4 text-xl md:text-2xl">Please wait...</p>
                </FadeIn>
                <FadeIn delay={200}>
                    <div className="loader mt-6 mx-auto"></div>
                </FadeIn>
            </div>
        </div>
    );
};

export default Loading;
