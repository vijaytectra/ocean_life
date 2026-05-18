/** Maps admin `Service.type` to public service section URL for breadcrumbs. */
export const SERVICE_TYPE_TO_PATH = {
  "Turnkey solutions": "/services/turnkey-solutions",
  "Interior fit-out services": "/services/interior-fit-out-services",
  "Civil construction": "/services/civil-construction",
  "Real estate development": "/services/real-estate-development",
  "Infrastructure development": "/services/infrastructure-development",
  "Hospitals and hospitality": "/services/hospitals-and-hospitality",
  "Data Centre Project Expertise": "/services/data-centre-project-expertise",
};

export function getServiceCategoryPath(type) {
  if (!type || typeof type !== "string") return "/services";
  return SERVICE_TYPE_TO_PATH[type.trim()] || "/services";
}
