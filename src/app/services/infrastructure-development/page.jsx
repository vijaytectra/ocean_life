import RecentProjects from "../../../componentsInnerServices/RecentProjects";
import HeaderInnerServices from "../../../componentsInnerServices/HeaderInnerServices";
import Newsletter from "../../../components/Newsletter";

export const metadata = {
  title: "Infrastructure Development in Chennai – Ocean Lifespaces Pvt Ltd",
  description:
    "Develop with us! infrastructure development in chennai powered by Ocean's innovative vision.",
  keywords: "Infrastructure Development in Chennai",
  alternates: {
    canonical: "https://www.olipl.com/services/infrastructure-development",
  },
};

function InfrastructureDevelopment() {
  // Define the dynamic content here
  const highlights = [
    { img: "/services/coins.webp", text: "Transportation Infrastructure" },
    { img: "/services/waves.webp", text: "Utilities & Water Management" },
    { img: "/services/zap.webp", text: "Energy Infrastructure" },
    { img: "/services/train-front.webp", text: "Urban Infrastructure" },
    { img: "/services/ship.webp", text: "Marine Infrastructure Development" },
  ];

  const page5Projects = [
    {
      imgSrc: "/services/marine-slide-1.webp",
      title: "Project One",
      location: "Chennai, India",
    },
    {
      imgSrc: "/services/marine-slide-2.webp",
      title: "Project Two",
      location: "Chennai, India",
    },
    {
      imgSrc: "/services/marine-slide-1.webp",
      title: "Project Three",
      location: "Chennai, India",
    },
  ];

  return (
    <>
      <HeaderInnerServices
        pageTitle="Infrastructure Development"
        serviceTitle="Infrastructure Development"
        mainDescription="Innovative Infrastructure Solutions for a Sustainable Future."
        highlights={highlights}
        rightImage1="/services/infra1.webp"
        companyDescription1="Ocean leads the way in infrastructure development, offering cutting-edge solutions for both urban and rural projects. Our focus is on building sustainable, long-lasting infrastructure that supports growth, improves quality of life, and enhances economic development. We specialize in transportation, utilities, and energy infrastructure, ensuring that all projects contribute to a better future."
        // companyDescription2="Having achieved a dominant position in the industry and having won the heart of numerous clients, Ocean has gathered all its expertise and grabbed opportunities for innovation and faster project delivery as one unified flow of work from initial concept through completion."
        leftImage2="/services/infra2.webp"
        rightImage2="/services/Infra-float.webp"
        clientsList="Our infrastructure solutions include everything from road construction and utilities to energy distribution and urban planning. We are committed to integrating sustainable practices in every project to minimize environmental impact while ensuring that the infrastructure we build is robust and future-ready."
        transformationText="We develop resilient infrastructure, from roads to large-scale public projects, ensuring innovation, sustainability, and excellence for a better future."
      />
      {/* <RecentProjects projects={page5Projects} /> */}
      <Newsletter />
    </>
  );
}

export default InfrastructureDevelopment;
