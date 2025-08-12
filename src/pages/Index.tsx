import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/custom/Loading";
import BackgroundAnimations from "@/components/decorative/BackgroundAnimations";
import Footer from "@/components/Footer";
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
import useWedding from "@/hooks/useWedding";
import scrollToSection from "@/lib/scrollToSection";
import useSyncUsername from "@/hooks/useSyncUsername";

export default function Index() {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = useParams();
    const { globalIsLoading } = useWedding();

    useSyncUsername(username);

    useEffect(() => {
        const section: NavIds = location.state?.section as NavIds | undefined;
        if (section) {
            scrollToSection(section);
            navigate(location.pathname, { replace: true });
        }
    }, [location.pathname, location.state, navigate]);

    if (globalIsLoading) {
        return <Loading />;
    }

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
