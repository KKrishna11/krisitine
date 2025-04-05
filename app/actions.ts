"use server"

import nodemailer from "nodemailer"

type EmailData = {
  name: string
  email: string
  phone: string
  message: string
}

export async function sendEmail(data: EmailData) {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
     service: "gmail",
      auth: {
        user: process.env.SMTP_USER ,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "kushwaha.krishna1233@gmail.com",
      subject: `Adoption Inquiry from ${data.name}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        
        Message:
        ${data.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Adoption Inquiry</h2>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <div style="margin-top: 20px;">
            <h3>Message:</h3>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    }

    // In development or if SMTP is not configured, log instead of sending
    // if (process.env.NODE_ENV === "development" || !process.env.SMTP_HOST) {
    //   console.log("Email would be sent:", mailOptions)
    //   return { success: true }
    // }

    // Send email
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

