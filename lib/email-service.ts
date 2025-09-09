import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      html: `
    <div style="background-color:#f9fafb; padding:24px; font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#111827;">
      <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:24px;">
        <h2 style="margin-top:0; color:#111827; font-size:20px; font-weight:600; border-bottom:1px solid #e5e7eb; padding-bottom:12px;">
          New Contact Form Submission
        </h2>
        <p style="margin:16px 0; font-size:14px; color:#374151;">
          <strong style="color:#111827;">Name:</strong> ${name}
        </p>
        <p style="margin:16px 0; font-size:14px; color:#374151;">
          <strong style="color:#111827;">Email:</strong> ${email}
        </p>
        <div style="margin:16px 0;">
          <p style="font-size:14px; margin-bottom:8px; color:#111827; font-weight:500;">Message:</p>
          <div style="background-color:#f3f4f6; padding:12px; border-radius:6px; font-size:14px; color:#374151; line-height:1.5;">
            ${message}
          </div>
        </div>
      </div>
      <p style="text-align:center; font-size:12px; color:#6b7280; margin-top:16px;">
        This email was generated automatically from your website’s contact form.
      </p>
    </div>
  `,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
