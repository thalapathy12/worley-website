import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const resend = new Resend("re_RUHLndP7_4PWFRMsGq9u7dznGsiwbroZz"); // paste from Resend dashboard

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, companySize, interest } = req.body;
  if (!name || !email || !phone || !companySize || !interest)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const response = await resend.emails.send({
      from: "Gold Billing <onboarding@resend.dev>", // or your verified domain email
      to: "sivastyleno1@gmail.com",
      subject: "New Contact Form Submission",
      text: `
New Submission Received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Company Size: ${companySize}
Interest: ${interest}
      `,
    });
    console.log("✅ Email sent:", response.id);
    res.json({ success: true, message: "Form submitted successfully" });
  } catch (err) {
    console.error("❌ Email send failed:", err);
    res.status(500).json({ error: "Email send failed" });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
