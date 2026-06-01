import prisma from "@/lib/prisma";
import { saveResumeFile } from "@/lib/careerResume";
import {
  getAdminNotificationEmail,
  getMailTransporter,
} from "@/lib/mailConfig";

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

  try {
    const { transporter, fromEmail } = getMailTransporter();
    const notifyEmail = await getAdminNotificationEmail();

    const applicantMail = {
      from: `Ocean Lifespaces Careers <${fromEmail}>`,
      to: email,
      subject: "Application Received — Ocean Lifespaces",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h1 style="color: #1a365d;">Thank you, ${fullName}</h1>
          <p>We received your application for <strong>${position}</strong>.</p>
          <p>Our HR team will review your profile and contact you if your qualifications match our requirements.</p>
          <p style="color: #64748b; font-size: 14px;">Reference ID: #${application.id}</p>
        </div>
      `,
    };

    const adminMail = {
      from: `Ocean Careers ATS <${fromEmail}>`,
      to: notifyEmail,
      subject: `New Career Application: ${position} — ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h1 style="color: #1a365d;">New Job Application</h1>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Experience:</strong> ${experience || "—"}</p>
          <p><strong>City:</strong> ${location}</p>
          <p><strong>LinkedIn:</strong> ${linkedin || "—"}</p>
          <p><strong>Resume:</strong> ${resumeMeta.resumeName}</p>
          <p><strong>Cover letter:</strong></p>
          <p>${(coverLetter || "—").replace(/\n/g, "<br>")}</p>
          <p style="color: #64748b;">Review in Admin → Careers (ATS). Application ID: #${application.id}</p>
        </div>
      `,
    };

    await transporter.sendMail(applicantMail);
    await transporter.sendMail(adminMail);
  } catch (error) {
    console.error("Career application email:", error);
  }

  return Response.json({
    success: true,
    message:
      "Thank you! Your application has been submitted. Our team will be in touch soon.",
    applicationId: application.id,
  });
}
