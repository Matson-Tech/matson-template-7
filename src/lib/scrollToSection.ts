import type { NavIds } from "@/components/Navigation";

const scrollToSection = (id: NavIds) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

export default scrollToSection;
