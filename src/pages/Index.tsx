import BackgroundAnimations from "@/components/decorative/BackgroundAnimations";
import Navigation from "@/components/Navigation";
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

export default function Index() {
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
        </div>
    );
}
