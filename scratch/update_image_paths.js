const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update Employees
  const employees = await prisma.employee.findMany({
    where: { image: { startsWith: '/uploads/' } }
  });
  for (const emp of employees) {
    const newPath = emp.image.replace('/uploads/', '/api/images/');
    await prisma.employee.update({ where: { id: emp.id }, data: { image: newPath } });
  }

  // Update Blogs
  const blogs = await prisma.blog.findMany({
    where: { image: { startsWith: '/uploads/' } }
  });
  for (const blog of blogs) {
    const newPath = blog.image.replace('/uploads/', '/api/images/');
    await prisma.blog.update({ where: { id: blog.id }, data: { image: newPath } });
  }

  // Update Logos
  const logos = await prisma.clientLogo.findMany({
    where: { image: { startsWith: '/uploads/' } }
  });
  for (const logo of logos) {
    const newPath = logo.image.replace('/uploads/', '/api/images/');
    await prisma.clientLogo.update({ where: { id: logo.id }, data: { image: newPath } });
  }

  console.log('Database image paths updated.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
