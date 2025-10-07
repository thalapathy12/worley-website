const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email configuration (replace with your real email & app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'selvamsiva4@gmail.com',          // <-- YOUR EMAIL
    pass: 'pxzk behv dduo vxgm'              // <-- YOUR APP PASSWORD (not your Gmail password)
  }
});

// Route to handle form submission
app.post('/api/contact', (req, res) => {
  const { name, email, companySize, interest } = req.body;

  if (!name || !email || phone || !companySize || !interest) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: 'selvamsiva4@gmail.com',
    to: 'sivastyleno1@gmail.com',  // <-- Email where you want to receive submissions
    subject: 'New Contact Form Submission',
    text: `
New Submission Received:

Name: ${name}
Email: ${email}
Company Size: ${companySize}
Interest: ${interest}
phone : ${phone}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email.' });
    } else {
      return res.status(200).json({ message: 'Form submitted successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
