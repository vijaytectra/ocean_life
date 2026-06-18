import prisma from "@/lib/prisma";
import {
  formatMailFrom,
  getAdminNotificationEmail,
  getMailTransporter,
} from "@/lib/mailConfig";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const phone = (body.phone || "").trim();
  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !phone || !subject || !message) {
    return Response.json(
      { success: false, error: "Please fill all required fields" },
      { status: 400 }
    );
  }

  try {
    await prisma.enquiry.create({
      data: {
        type: "Contact",
        name,
        email,
        mobile: phone,
        subject,
        message,
        status: "new",
      },
    });
  } catch (error) {
    console.error("Contact enquiry save:", error);
    return Response.json(
      {
        success: false,
        error: "Could not save your message. Please try again or email salesinfra@olipl.com.",
      },
      { status: 500 }
    );
  }

  let emailSent = false;

  try {
    const { transporter, fromEmail } = getMailTransporter();
    const notifyEmail = await getAdminNotificationEmail();
    const from = formatMailFrom("Ocean Lifespaces", fromEmail);

    const adminMailOptions = {
      from,
      to: notifyEmail,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a365d;">New Contact Request</h1>
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      </div>
    `,
    };

    const userMailOptions = {
      from,
      to: email,
      subject: "Thank You for Contacting Ocean Lifespaces",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a365d;">Thank You for Contacting Us!</h1>
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>We've received your message and will get back to you soon.</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
        <p style="font-size: 0.9em; color: #718096;">© ${new Date().getFullYear()} Ocean Lifespaces.</p>
      </div>
    `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    emailSent = true;
  } catch (error) {
    console.error("Contact send error:", error);
  }

  return Response.json({
    success: true,
    emailSent,
    message: emailSent
      ? "Thank you for reaching out. Our team will get back to you shortly."
      : "Thank you — your message was received. Our team will follow up soon.",
  });
}
