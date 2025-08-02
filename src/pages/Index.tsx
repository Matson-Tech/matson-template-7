import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackgroundAnimations from "@/components/decorative/BackgroundAnimations";
import Navigation, { type NavIds } from "@/components/Navigation";
import {
    AdditionalInfoSection,
    ContactSection,
    GallerySection,
    GuestWishesSection,
    HeroSection,
    JewellerSection,
    OurStorySection,
    ScheduleSection,
    WeddingDetailsSection,
} from "@/components/section";
import scrollToSection from "@/lib/scrollToSection";
import Footer from "@/components/Footer";

export default function Index() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const section: NavIds = location.state?.section as NavIds | undefined;
        if (section) {
            scrollToSection(section);
            navigate(location.pathname, { replace: true });
        }
    }, [location.pathname, location.state, navigate]);

    return (
        <div className="min-h-screen bg-background relative">
            {/* Dynamic background animations */}
            <BackgroundAnimations />

            <Navigation />

            <HeroSection />
            <OurStorySection />
            <WeddingDetailsSection />
            <ScheduleSection />
            <GallerySection />
            <GuestWishesSection />
            <AdditionalInfoSection />
            <ContactSection />
            <JewellerSection />
            <Footer />
        </div>
    );
}
