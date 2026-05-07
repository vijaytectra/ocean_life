import ServicesGrid from "../../componentServices/ServicesGrid";
import ServiceHeader from "../../componentServices/ServiceHeader";
import React from "react";
import Newsletter from "../../components/Newsletter";

export const metadata = {
  title: "Civil Construction Services in Chennai - Ocean Lifespaces Pvt Ltd",
  description:
    "Choose expertise! civil construction services chennai by Ocean Lifespaces ensure durability and design.",
  keywords: "Civil Construction Services Chennai",
  alternates: {
    canonical: "https://www.olipl.com/services",
  },
};

function Services() {
  return (
    <>
      <ServiceHeader />
      <ServicesGrid />
      <Newsletter />
    </>
  );
}

export default Services;
