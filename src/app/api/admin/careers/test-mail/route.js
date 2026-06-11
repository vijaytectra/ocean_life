import { NextResponse } from "next/server";
import {
  formatMailFrom,
  getCareerNotificationEmail,
  getMailTransporter,
} from "@/lib/mailConfig";
import { careerApplicantEmail, careerHrNotificationEmail } from "@/lib/mailTemplates";

export async function POST() {
  try {
    const { transporter, fromEmail } = getMailTransporter();
    const hrEmail = await getCareerNotificationEmail();
    const from = formatMailFrom("Ocean Lifespaces Careers", fromEmail);

    await transporter.verify();

    const sampleApplicant = {
      fullName: "Test Applicant",
      position: "Civil Engineer",
      applicationId: "TEST",
      hrEmail,
    };

    await transporter.sendMail({
      from,
      to: hrEmail,
      subject: "Careers mail test — HR notification | Ocean Lifespaces",
      html: careerHrNotificationEmail({
        fullName: "Test Applicant",
        email: "applicant@example.com",
        phone: "+91 98765 43210",
        position: "Civil Engineer",
        experience: "3–5 years",
        location: "Chennai",
        linkedin: "",
        coverLetter: "This is a test email from Admin → Careers. SMTP is working.",
        resumeName: "Test Applicant — Chennai.pdf",
        resumeUrl: "https://www.olipl.com/",
        applicationId: "TEST",
      }),
    });

    await transporter.sendMail({
      from,
      to: hrEmail,
      subject: "Careers mail test — applicant confirmation | Ocean Lifespaces",
      html: careerApplicantEmail(sampleApplicant),
    });

    return NextResponse.json({
      success: true,
      message: `Test emails sent to ${hrEmail}. Check inbox and spam folder.`,
      hrEmail,
    });
  } catch (error) {
    console.error("Careers mail test:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Could not send test email",
      },
      { status: 500 }
    );
  }
}
