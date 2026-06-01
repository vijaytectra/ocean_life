import RecentProjects from "../../../componentsInnerServices/RecentProjects";
import HeaderInnerServices from "../../../componentsInnerServices/HeaderInnerServices";
import DynamicCategoryServices from "../../../componentsInnerServices/DynamicCategoryServices";
import Newsletter from "../../../components/Newsletter";
import { INTERIOR_FIT_OUT_RECENT_PROJECTS } from "@/data/projectsGallery";

export const metadata = {
  title: "Interior Fit-Out Services in Chennai - Ocean Lifespaces Pvt Ltd",
  description:
    "Design smart! interior fit-out services in chennai crafted for productivity and brand presence.",
  keywords: "Interior Fit-Out Services in Chennai",
  alternates: {
    canonical: "https://www.olipl.com/services/interior-fit-out-services",
  },
};

function FitOuts() {
  // Define the dynamic content here
  const highlights = [
    { img: "/services/lamp-desk.webp", text: "Office Fit-Outs" },
    { img: "/services/store.webp", text: "Retail Fit-Outs" },
    { img: "/services/hospital.webp", text: "Hospitality Fit-Outs" },
    { img: "/services/lamp.webp", text: "Interior Refurbishments" },
    { img: "/services/blocks.webp", text: "Design & Build Services" },
  ];

  return (
    <>
      <HeaderInnerServices
        pageTitle="Interior Fit-Out Services"
        serviceTitle="Interior Fit-Out Services"
        mainDescription="Tailored Fit-Out Solutions to Transform Your Space."
        highlights={highlights}
        rightImage1="/services/fitout1.webp"
        companyDescription1="Ocean specializes in delivering high-quality fit-out solutions that are customized to your specific needs. Whether you are renovating an office, retail space, or hospitality venue, our fit-out services ensure that every space is functional, stylish, and built to suit your business’s goals. We collaborate with you throughout the design and build process to ensure your vision is realized."
        // companyDescription2="Having achieved a dominant position in the industry and having won the heart of numerous clients, Ocean has gathered all its expertise and grabbed opportunities for innovation and faster project delivery as one unified flow of work from initial concept through completion."
        leftImage2="/services/fitout2.webp"
        rightImage2="/services/fit-flow.webp"
        clientsList="From creating modern and ergonomic office spaces to refreshing retail environments, our fit-out services prioritize both aesthetics and practicality. We combine our expertise in interior design and construction to deliver solutions that meet your needs while also promoting operational efficiency and brand alignment. Whether it's a small refurbishment or a large-scale fit-out, we deliver exceptional results."
        transformationText="Enhance your space with our expert interior fit-out solutions, seamlessly blending style and functionality to create environments that reflect your vision and unique aesthetic."
      />
      <DynamicCategoryServices categoryType="Interior fit-out services" />
      <RecentProjects
        projects={INTERIOR_FIT_OUT_RECENT_PROJECTS}
        eyebrow="Interior fit-out portfolio"
        title="Recent Projects"
        description="Corporate campuses, offices, and workspace transformations delivered across South India — scroll through our complete interior fit-out work."
      />
      <Newsletter />
    </>
  );
}

export default FitOuts;
