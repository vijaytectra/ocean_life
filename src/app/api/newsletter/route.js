import {
  getAdminNotificationEmail,
  getMailTransporter,
} from "@/lib/mailConfig";

const SUPPORT_EMAIL = "salesinfra@olipl.com";

export async function POST(request) {
  let email;
  try {
    const body = await request.json();
    email = (body?.email || "").trim().toLowerCase();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return Response.json(
      { success: false, error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  let transporter;
  let fromEmail;
  let notifyEmail;

  try {
    ({ transporter, fromEmail } = getMailTransporter());
    notifyEmail = await getAdminNotificationEmail();
  } catch (error) {
    console.error("Newsletter mail config:", error);
    return Response.json(
      {
        success: false,
        error:
          "Newsletter is temporarily unavailable. Please try again later or email salesinfra@olipl.com.",
      },
      { status: 500 }
    );
  }

  const subscriberMailOptions = {
    from: `Ocean Lifespaces Newsletter <${fromEmail}>`,
    to: email,
    subject: "Thank You for Subscribing to Ocean Lifespaces Newsletter",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a365d;">Thank You for Subscribing!</h1>
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>You've successfully subscribed to the Ocean Lifespaces newsletter. We'll keep you updated with our latest news, events, and updates.</p>
          <p>Your email: <strong>${email}</strong> has been added to our mailing list.</p>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 0.9em; color: #718096;">
          <p>If this was a mistake, contact us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
          <p>© ${new Date().getFullYear()} Ocean Lifespaces. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  const adminMailOptions = {
    from: `Ocean Lifespaces Newsletter <${fromEmail}>`,
    to: notifyEmail,
    subject: `New Newsletter Subscriber: ${email}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a365d;">New Newsletter Subscription</h1>
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>A new subscriber joined the Ocean Lifespaces newsletter:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString("en-IN")}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(subscriberMailOptions);
    await transporter.sendMail(adminMailOptions);

    return Response.json({
      success: true,
      message: "Thank you! You have successfully subscribed to our newsletter.",
    });
  } catch (error) {
    console.error("Newsletter send error:", error);
    return Response.json(
      {
        success: false,
        error:
          "We could not complete your subscription right now. Please try again later or email salesinfra@olipl.com.",
      },
      { status: 500 }
    );
  }
}
