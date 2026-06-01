/** Interior fit-out — all portfolio projects belong to this service line */
export const INTERIOR_FIT_OUT_SERVICE = {
  id: "interior",
  title: "Interior Fit-Out Services",
  image: "/services/Link-3.webp",
  link: "/services/interior-fit-out-services",
};

/** Shape expected by RecentProjects slider on service pages */
export function toRecentProjectCard(project) {
  return {
    imgSrc: project.image,
    title: project.title,
    link: project.href,
    location: project.area ? `${project.location} · ${project.area}` : project.location,
  };
}

export const PROJECTS_GALLERY = [
  {
    title: "Dell Project, Bangalore",
    location: "Bangalore",
    area: "2,00,000 sq. ft.",
    image: "/projectsOcean/p1.webp",
    href: "/projects/dell-project-bangalore",
  },
  {
    title: "HDFC Office, Chennai",
    location: "Chennai",
    area: "2,50,000 sq. ft.",
    image: "/projectsOcean/p2.webp",
    href: "/projects/hdfc-office-chennai",
  },
  {
    title: "Nvidia Office, Bangalore",
    location: "Bangalore",
    area: "2,50,000 sq. ft.",
    image: "/projectsOcean/p3.webp",
    href: "/projects/nvidia-office-bangalore",
  },
  {
    title: "Bray Controls India Pvt. Ltd",
    location: "Chennai",
    area: "30,000 sq. ft.",
    image: "/projectsOcean/p4.webp",
    href: "/projects/bray-controls-india-chennai",
  },
  {
    title: "Hindustan International School",
    location: "Chennai",
    area: "80,000 sq. ft.",
    image: "/projectsOcean/p5.webp",
    href: "/projects/hindustan-international-school-chennai",
  },
  {
    title: "Swiss RE",
    location: "Bangalore",
    area: "2,00,000 sq. ft.",
    image: "/projectsOcean/p6.webp",
    href: "/projects/swiss-re-200000-sq-ft-interior-works-bangalore",
  },
  {
    title: "Tek Systems",
    location: "Bangalore",
    area: "42,000 sq. ft.",
    image: "/projectsOcean/p7.webp",
    href: "/projects/tek-systems-bangalore",
  },
  {
    title: "Silicon Lab",
    location: "Hyderabad",
    area: "1,00,000 sq. ft.",
    image: "/projectsOcean/p8.webp",
    href: "/projects/silicon-lab-hyderabad",
  },
  {
    title: "Maersk Office",
    location: "Chennai",
    area: "1,65,000 sq. ft.",
    image: "/projectsOcean/p9.webp",
    href: "/projects/maersk-office-chennai",
  },
  {
    title: "Ajuba",
    location: "Chennai",
    area: "40,000 sq. ft.",
    image: "/projectsOcean/p10.webp",
    href: "/projects/ajuba",
  },
  {
    title: "Shell",
    location: "Bangalore",
    area: "2,50,000 sq. ft.",
    image: "/projectsOcean/p11.webp",
    href: "/projects/shell",
  },
  {
    title: "Olam Project",
    location: "Bangalore",
    area: "Confidential",
    image: "/projectsOcean/p12.webp",
    href: "/projects/olam-project-chennai",
  },
  {
    title: "R1RCM",
    location: "Chennai",
    area: "51,000 sq. ft.",
    image: "/projectsOcean/p13.webp",
    href: "/projects/RIRCM",
  },
  {
    title: "PWC",
    location: "Chennai",
    area: "30,000 sq. ft.",
    image: "/projectsOcean/p14.webp",
    href: "/projects/PWC",
  },
  {
    title: "Danfoss",
    location: "Chennai",
    area: "5,00,000 sq. ft.",
    image: "/projectsOcean/p15.webp",
    href: "/projects/danfoss-500000-sft-civil-interior-works-chennai",
  },
  {
    title: "Simpliworks",
    location: "Hyderabad",
    area: "3,84,000 sq. ft.",
    image: "/projectsOcean/p16.webp",
    href: "/projects/simpliworks-384000-sft-civil-interior-works-hyderabad",
  },
  {
    title: "Emerson",
    location: "Bangalore",
    area: "2,50,000 sq. ft.",
    image: "/projectsOcean/p17.webp",
    href: "/projects/emersion",
  },
  {
    title: "Taramani",
    location: "Chennai",
    area: "30,000 sq. ft.",
    image: "/projectsOcean/p18.webp",
    href: "/projects/ground-floor-lobby-works-taramani-chennai",
  },
  {
    title: "KONE Project",
    location: "Chennai",
    area: "7,00,000 sq. ft.",
    image: "/projectsOcean/p19.webp",
    href: "/projects/kone-project-chennai",
  },
  {
    title: "ZOHO",
    location: "Chennai",
    area: "3,50,000 sq. ft.",
    image: "/projectsOcean/zoho.webp",
    href: "/projects/zoho-estancia",
  },
];

export const INTERIOR_FIT_OUT_RECENT_PROJECTS =
  PROJECTS_GALLERY.map(toRecentProjectCard);
