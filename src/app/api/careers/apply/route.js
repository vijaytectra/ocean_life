import prisma from "@/lib/prisma";
import { saveResumeFile } from "@/lib/careerResume";
import {
  formatMailFrom,
  getCareerNotificationEmail,
  getMailTransporter,
} from "@/lib/mailConfig";
import {
  careerApplicantEmail,
  careerHrNotificationEmail,
} from "@/lib/mailTemplates";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData, key) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json(
      { success: false, error: "Invalid form submission" },
      { status: 400 }
    );
  }

  const fullName = field(formData, "fullName");
  const email = field(formData, "email").toLowerCase();
  const phone = field(formData, "phone");
  const position = field(formData, "position");
  const experience = field(formData, "experience");
  const location = field(formData, "location");
  const linkedin = field(formData, "linkedin");
  const coverLetter = field(formData, "coverLetter");
  const resumeFile = formData.get("resume");

  if (!fullName || !email || !phone || !position || !location) {
    return Response.json(
      { success: false, error: "Please fill all required fields" },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json(
      { success: false, error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  let resumeMeta;
  try {
    resumeMeta = await saveResumeFile(resumeFile, {
      fullName,
      city: location,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  let application;
  try {
    application = await prisma.careerApplication.create({
      data: {
        fullName,
        email,
        phone,
        position,
        experience: experience || null,
        location: location || null,
        linkedin: linkedin || null,
        coverLetter: coverLetter || null,
        resumePath: resumeMeta.resumePath,
        resumeName: resumeMeta.resumeName,
        status: "new",
      },
    });
  } catch (error) {
    console.error("Career application save:", error);
    return Response.json(
      { success: false, error: "Could not save your application" },
      { status: 500 }
    );
  }

  let emailSent = false;
  let emailWarning = null;

  try {
    const { transporter, fromEmail } = getMailTransporter();
    const hrEmail = await getCareerNotificationEmail();
    const from = formatMailFrom("Ocean Lifespaces Careers", fromEmail);

    const applicantMail = {
      from,
      to: email,
      subject: `Application Received — ${position} | Ocean Lifespaces`,
      html: careerApplicantEmail({
        fullName,
        position,
        applicationId: application.id,
        hrEmail,
      }),
    };

    const adminMail = {
      from,
      to: hrEmail,
      subject: `New Application: ${position} — ${fullName}`,
      html: careerHrNotificationEmail({
        fullName,
        email,
        phone,
        position,
        experience,
        location,
        linkedin,
        coverLetter,
        resumeName: resumeMeta.resumeName,
        resumeUrl: resumeMeta.resumeUrl,
        applicationId: application.id,
      }),
    };

    await transporter.verify();
    await transporter.sendMail(applicantMail);
    await transporter.sendMail(adminMail);
    emailSent = true;
  } catch (error) {
    console.error("Career application email:", error);
    emailWarning =
      "Your application was saved, but we could not send the confirmation email. Our team has your details in the ATS.";
  }

  return Response.json({
    success: true,
    emailSent,
    emailWarning,
    message: emailSent
      ? "Thank you! Your application has been submitted. Our team will be in touch soon."
      : emailWarning,
    applicationId: application.id,
  });
}
