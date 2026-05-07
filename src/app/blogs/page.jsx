import BlogsUpdates from "@/components/BlogsUpdates";

export const metadata = {
  title: "Blogs | Ocean Lifespaces India Pvt Ltd",
  description:
    "Explore our latest blogs and updates on civil construction, architecture, and design. Stay informed with Ocean Lifespaces India Pvt Ltd.",
  keywords: "Ocean Lifespaces India Pvt Ltd",
  alternates: {
    canonical: "https://www.olipl.com/blogs/",
  },
};

function page() {
  return (
    <div>
      <BlogsUpdates />
    </div>
  );
}

export default page;
