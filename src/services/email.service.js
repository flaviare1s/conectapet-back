import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Verificação de Email - ConectaPet 🐾",
    html: `
            <h1>Verificação de e-mail</h1>
            <p>Seu código de verificação é: <strong>${verificationCode}</strong></p>
            <p>Este código expira em 20 minutos.</p>
            <p>Se você não solicitou esta verificação, favor ignorar o e-mail!</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error); // Mostra erro detalhado
    return false;
  }
};
