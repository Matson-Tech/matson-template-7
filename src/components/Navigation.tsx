import { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WeddingContext } from "@/context/WeddingContext";
import { Button } from "@/components/ui/button";
import { X, Menu, LogOut } from "lucide-react";
import useWedding from "@/hooks/useWedding";

type NavIds =
    | "home"
    | "story"
    | "details"
    | "schedule"
    | "gallery"
    | "wishes"
    | "contact"
    | "info";

export default function Navigation() {
    const { isLoggedIn, logout, weddingData } = useWedding();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = useCallback((id: NavIds) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false);
    }, []);

    const toggleSidebar = useCallback(() => setIsMenuOpen((prev) => !prev), []);

    const closeSidebar = useCallback(() => setIsMenuOpen(false), []);

    return (
        <nav className="w-full bg-blush-50/80 backdrop-blur-sm border-b border-blush-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="font-serif text-2xl text-rose-600"
                        >
                            {weddingData.couple.groomName} &{" "}
                            {weddingData.couple.brideName}
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8 font-serif font-medium">
                            <button
                                type="button"
                                className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide uppercase"
                                onClick={() => scrollToSection("home")}
                            >
                                Home
                            </button>
                            <button
                                type="button"
                                className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide uppercase"
                                onClick={() => scrollToSection("story")}
                            >
                                Story
                            </button>
                            <button
                                type="button"
                                className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide uppercase"
                                onClick={() => scrollToSection("details")}
                            >
                                Details
                            </button>
                            <button
                                type="button"
                                className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide uppercase"
                                onClick={() => scrollToSection("schedule")}
                            >
                                Schedule
                            </button>
                            <button
                                type="button"
                                className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide uppercase"
                                onClick={() => scrollToSection("gallery")}
                            >
                                Gallery
                            </button>
                            <button
                                type="button"
                                className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide uppercase"
                                onClick={() => scrollToSection("wishes")}
                            >
                                Wish
                            </button>
                            <button
                                type="button"
                                className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide uppercase"
                                onClick={() => scrollToSection("contact")}
                            >
                                Contact
                            </button>
                            {isLoggedIn && (
                                <Button
                                    type="button"
                                    className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide uppercase bg-rose-200 hover:bg-rose-100"
                                    onClick={logout}
                                >
                                    Logout
                                    <LogOut className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden p-2 rounded-md text-foreground hover:text-primary"
                        type="button"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
