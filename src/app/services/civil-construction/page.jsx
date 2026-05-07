import RecentProjects from "../../../componentsInnerServices/RecentProjects";
import HeaderInnerServices from "../../../componentsInnerServices/HeaderInnerServices";
import Newsletter from "../../../components/Newsletter";

export const metadata = {
  title: "Civil Construction Company in Chennai - Ocean Lifespaces Pvt Ltd",
  description:
    "Build better! civil construction in chennai with Ocean Lifespaces ensures lasting strength and value.",
  keywords: "Civil Construction in Chennai",
  alternates: {
    canonical: "https://www.olipl.com/services/civil-construction",
  },
};

function CivilConstruction() {
  // Define the dynamic content here
  const highlights = [
    { img: "/services/house.webp", text: "Residential Construction" },
    { img: "/services/hotel.webp", text: "Commercial Construction" },
    { img: "/services/factory.webp", text: "Industrial Construction" },
    { img: "/services/pickaxe.webp", text: "Earthworks & Excavation" },
    { img: "/services/ship.webp", text: "Marine Infrastructure Construction" },
  ];

  const page2Projects = [
    // {
    //   imgSrc: "/services/alf.webp",
    //   title: "Alf",
    //   link: "#",
    // },
    {
      imgSrc: "/services/braycontrols.webp",
      title: "Bray Controls",
      link: "/projects/bray-controls-india-chennai",
    },
    // {
    //   imgSrc: "/services/colgatepalmolive.webp",
    //   title: "Colgate Palmolive",
    //   link: "#",
    // },
    {
      imgSrc: "/services/hindustaninternationalschool.webp",
      title: "Hindustan International School",
      link: "/projects/hindustan-international-school-chennai",
    },
    // {
    //   imgSrc: "/services/hotelgreysuit.webp",
    //   title: "Hotel Grey Suit",
    //   link: "#",
    // },
    // {
    //   imgSrc: "/services/iocl.webp",
    //   title: "IOCL",
    //   link: "#",
    // },
    {
      imgSrc: "/services/kone.webp",
      title: "KONE",
      link: "/projects/kone-project-chennai",
    },
    // {
    //   imgSrc: "/services/pacques.webp",
    //   title: "Pacques",
    //   link: "#",
    // },
    // {
    //   imgSrc: "/services/parksonspackaging.webp",
    //   title: "Parksons Packaging",
    //   link: "#",
    // },
    {
      imgSrc: "/services/emerson.webp",
      title: "Emerson",
      link: "/projects/emersion",
    },
  ];

  return (
    <>
      <HeaderInnerServices
        pageTitle="Civil Construction"
        serviceTitle="Civil Construction"
        mainDescription="Reliable Civil Construction Services for Every Project."
        highlights={highlights}
        rightImage1="/services/civilinner1.webp"
        companyDescription1="Ocean’s civil construction services cover a wide range of projects, from residential buildings to commercial and industrial developments. Our team combines technical expertise with innovative solutions to deliver high-quality infrastructure that stands the test of time. We manage each project with a focus on safety, sustainability, and adherence to all regulatory standards."
        // companyDescription2="Having achieved a dominant position in the industry and having won the heart of numerous clients, Ocean has gathered all its expertise and grabbed opportunities for innovation and faster project delivery as one unified flow of work from initial concept through completion."
        leftImage2="/services/civilinner2.webp"
        rightImage2="/services/design3.webp"
        clientsList="Whether it’s building homes, offices, or specialized industrial facilities, we ensure that each project is completed to the highest standards. Our civil construction services extend to site preparation, foundation work, and beyond, ensuring that every phase of the construction process is completed with precision. We also provide tailored solutions for unique project requirements."
        transformationText="We bring excellence to civil construction, delivering durable and innovative structures, from commercial complexes to large-scale developments. Our commitment to precision engineering, timely execution, and sustainability ensures superior quality in every project."
      />
      <RecentProjects projects={page2Projects} />
      <Newsletter />
    </>
  );
}

export default CivilConstruction;
