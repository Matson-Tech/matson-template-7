import { LogOut, Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useWedding from "@/hooks/useWedding";
import scrollToSection from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";
import onEnterKeyDown from "@/utils/onEnterKeyDown";

export type NavIds =
    | "home"
    | "story"
    | "details"
    | "schedule"
    | "gallery"
    | "wishes"
    | "contact"
    | "info"
    | "jeweller";

type NavItems = Array<{
    id: NavIds;
    text: string;
    disabled: boolean;
}>;

export default function Navigation() {
    const { isLoggedIn, logout, weddingData } = useWedding();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<NavIds | null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const mainObserver = useRef<IntersectionObserver | null>(null);

    const navItems: NavItems = useMemo(
        () => [
            { id: "home", text: "Home", disabled: false },
            {
                id: "story",
                text: "Story",
                disabled: weddingData.story.disabled,
            },
            {
                id: "details",
                text: "Details",
                disabled: weddingData.weddingDetails.disabled,
            },
            { id: "schedule", text: "Schedule", disabled: false },
            { id: "gallery", text: "Gallery", disabled: false },
            {
                id: "wishes",
                text: "Wishes",
                disabled: weddingData.wishDisabled,
            },
            {
                id: "contact",
                text: "Contact",
                disabled: weddingData.contact.disabled,
            },
            {
                id: "info",
                text: "Info",
                disabled: weddingData.moreInfo.disabled,
            },
            {
                id: "jeweller",
                text: "Jeweller",
                disabled: weddingData.jeweller.disabled,
            },
        ],
        [weddingData],
    );

    const toggleSidebar = useCallback(() => setIsMenuOpen((prev) => !prev), []);
    const closeSidebar = useCallback(() => setIsMenuOpen(false), []);

    const handleClick = useCallback(
        (id: NavIds) => {
            if (location.pathname !== "/") {
                navigate("/", { state: { section: id } });
                return;
            }
            scrollToSection(id);
            closeSidebar();
        },
        [location, navigate, closeSidebar],
    );

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0,
        };

        mainObserver.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id as NavIds);
                }
            });
        }, options);

        navItems.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                mainObserver.current?.observe(element);
            }
        });

        return () => {
            if (mainObserver.current) mainObserver.current.disconnect();
        };
    }, [navItems]);

    return (
        <>
            <nav className="w-full bg-blush-50/80 backdrop-blur-xs border-b border-blush-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <div className="shrink-0">
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
                            <div className="ml-10 flex items-baseline space-x-8 font-serif font-medium child-cursor-pointer">
                                {navItems
                                    .slice(0, 7)
                                    .filter((item) => !item.disabled)
                                    .map(({ id, text }) => (
                                        <button
                                            key={id}
                                            type="button"
                                            className={cn(
                                                "text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide",
                                                activeSection === id &&
                                                    "text-rose-600",
                                            )}
                                            onClick={() => handleClick(id)}
                                            onKeyDown={(e) =>
                                                onEnterKeyDown(e, () =>
                                                    handleClick(id),
                                                )
                                            }
                                        >
                                            {text}
                                        </button>
                                    ))}
                                {isLoggedIn && (
                                    <Button
                                        type="button"
                                        className="text-foreground hover:text-rose-600 transition-colors duration-200 text-sm tracking-wide bg-rose-200 hover:bg-rose-100"
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
            <div
                className={cn(
                    "fixed inset-0 z-50 md:hidden",
                    isMenuOpen
                        ? "pointer-events-auto backdrop-blur-sm"
                        : "pointer-events-none",
                )}
            >
                {/* Backdrop */}
                <div
                    className={cn(
                        "fixed inset-0 bg-black transition-opacity duration-300",
                        isMenuOpen ? "opacity-50" : "opacity-0",
                    )}
                    onClick={closeSidebar}
                    onKeyDown={(e) => onEnterKeyDown(e, closeSidebar)}
                    role="button"
                    tabIndex={0}
                />

                {/* Sidebar */}
                <div
                    className={cn(
                        "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
                        isMenuOpen ? "translate-x-0" : "translate-x-full",
                    )}
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="text-lg font-Ibarra text-primary truncate">
                            {weddingData.couple.groomName} &{" "}
                            {weddingData.couple.brideName}
                        </div>
                        <button
                            onClick={closeSidebar}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close menu"
                            type="button"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex flex-col p-4 space-y-4">
                        {navItems
                            .filter((item) => !item.disabled)
                            .map(({ text, id }) => (
                                <button
                                    key={`section-${text}`}
                                    onClick={() => handleClick(id)}
                                    type="button"
                                    className={cn(
                                        "text-left py-3 px-4 rounded-lg text-base font-medium transition-all duration-200",
                                        activeSection === id
                                            ? "text-primary bg-primary/10 border-l-4 border-primary"
                                            : "text-gray-600 hover:text-primary hover:bg-primary/10",
                                    )}
                                >
                                    {text}
                                </button>
                            ))}
                        {isLoggedIn && (
                            <>
                                <hr className="border-gray-200 my-2" />
                                <button
                                    onClick={() => {
                                        logout();
                                        toggleSidebar();
                                    }}
                                    type="button"
                                    className="text-left py-3 px-4 rounded-lg text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
