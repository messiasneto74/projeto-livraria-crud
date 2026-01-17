const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📨 ENVIANDO EMAIL PARA:", to);

    const response = await resend.emails.send({
      from: "Livraria 📚 <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("✅ EMAIL ENVIADO COM SUCESSO:", response);
    return response;
  } catch (error) {
    console.error("❌ ERRO AO ENVIAR EMAIL:", error);
    throw error;
  }
};

module.exports = sendEmail;
