import HeaderInnerServices from "../../../componentsInnerServices/HeaderInnerServices";
import Newsletter from "../../../components/Newsletter";
import Image from "next/image";

export const metadata = {
    title: "Hospitals and Hospitality – Ocean Lifespaces Pvt Ltd",
    description:
        "End-to-End Hospitals and Hospitality Development by Ocean Lifespaces.",
    keywords: "Hospitals Development, Hospitality Services, Ocean Lifespaces",
    alternates: {
        canonical: "https://www.olipl.com/services/hospitals-and-hospitality",
    },
};

function HospitalsAndHospitality() {
    const projectsList = [
        {
            name: "NARUVI HOSPITAL, Vellore, Tamil Nadu",
            details: ["5,00,000 Sqft", "475 Beds", "Interior Works"],
            imgSrc: "/services/naruvi.png",
        },
        {
            name: "MGM Healthcare (Lalah Tower), Chennai, Tamil Nadu",
            details: ["2,83,000 Sqft", "Civil & Interior Works"],
            imgSrc: "/services/mgm health.png",
        },
        {
            name: "Panimalar Medical Hospital, Chennai, Tamil Nadu",
            details: ["6,00,000 Sqft", "Civil & Interior Works"],
            imgSrc: "/services/panimalar.png",
        },
        {
            name: "Aarupadai Veedu Medical College, Pondicherry",
            details: ["6,00,000 Sqft", "Civil & Interior Works"],
            imgSrc: "/services/aarupadai.png",
        },
        {
            name: "Sri Hospitals, Chennai, Tamil Nadu",
            details: ["30,000 Sft", "Civil Construction Works"],
            imgSrc: "/services/sri hospitals.png",
        },
        {
            name: "HOTEL GREY SUIT",
            details: ["2,84,000 Sq.ft", "Complete GC works"],
            imgSrc: "/services/hotel grey suit.png",
        },
    ];

    const highlights = [
        { img: "/services/hospital.webp", text: "End-to-End Hospital Development" },
        { img: "/services/hotel.webp", text: "Hospitality & Guest-Centric Spaces" },
        { img: "/services/shield-check.webp", text: "Healthcare Safety Standards" },
        { img: "/services/lamp.webp", text: "Optimized Efficiency & Comfort" },
        { img: "/services/zap.webp", text: "Innovative Branding & Execution" },
    ];

    return (
        <>
            <HeaderInnerServices
                pageTitle="Hospitals and Hospitality"
                serviceTitle="Hospitals and Hospitality"
                mainDescription="End-to-End Hospitals and Hospitality Development"
                highlights={highlights}
                rightImage1="/services/hotelgreysuit.webp"
                companyDescription1="Our services in these two domains shape thoughtful health consumer and guest - centric spaces that blend comfort with efficiency and help build brand character too. From concept planning to flawless execution, we create environments that enhance experiences, support smooth operations and leave lasting impressions that strengthen bonding value."
                leftImage2="/services/civilinner1.webp"
                rightImage2="/services/civilinner2.webp"
                clientsList="We are committed to delivering world-class hospital and hospitality projects that meet the highest standards of safety, comfort, and functionality."
                transformationText="Creating spaces that care, welcome, and inspire."
            />
            <div className="container" style={{ paddingBottom: "80px" }}>
                <h2 className="h3" style={{ marginBottom: "30px", color: "var(--color-dark-blue)" }}>Notable Projects:</h2>
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                    {projectsList.map((project, index) => (
                        <li key={index} style={{ border: "1px solid #eee", padding: "20px", borderRadius: "10px", background: "#f9f9f9" }}>
                            {project.imgSrc && (
                                <div style={{ marginBottom: "15px", borderRadius: "10px", overflow: "hidden" }}>
                                    <Image
                                        src={project.imgSrc}
                                        alt={project.name}
                                        width={400}
                                        height={250}
                                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                            <strong style={{ display: "block", marginBottom: "10px", color: "var(--color-dark-blue)" }}>{project.name}</strong>
                            <ul style={{ listStyle: "inside disc", color: "#666", fontSize: "14px" }}>
                                {project.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <Newsletter />
        </>
    );
}

export default HospitalsAndHospitality;
