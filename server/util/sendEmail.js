const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  console.log("📨 ENVIANDO EMAIL PARA:", to);

  const response = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  console.log("📧 RESPOSTA RESEND:", response);
};

module.exports = sendEmail;
