import AboutVision from "../../componentsAbout/AboutVision";
import AboutHeader from "../../componentsAbout/AboutHeader";
import ServiceGrid from "../../componentsAbout/ServiceGrid";
import DriveUs from "../../componentsAbout/DriveUs";
import Team from "../../componentsAbout/Team";
import Accreditations from "../../componentsAbout/Accreditations";
import Newsletter from "../../components/Newsletter";
import { listEmployeesForPublic } from "@/lib/employees";
import { listAccreditationsForPublic } from "@/lib/accreditations";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | Ocean Lifespaces India Pvt Ltd",
  description:
    "Meet the team! Learn how Ocean Lifespaces India Pvt Ltd leads in civil construction with integrity, experience, and a future-focused vision.",
  keywords: "Ocean Lifespaces India Pvt Ltd",
  alternates: {
    canonical: "https://www.olipl.com/about",
  },
};

export default async function About() {
  const [teamMembers, accreditations] = await Promise.all([
    listEmployeesForPublic(),
    listAccreditationsForPublic(),
  ]);

  return (
    <>
      <AboutHeader />
      <AboutVision />
      <ServiceGrid />
      <DriveUs />
      <Team initialMembers={teamMembers} />
      <Accreditations initialItems={accreditations} />
      <Newsletter />
    </>
  );
}
