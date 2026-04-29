const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.MAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const emailService = {
  async enviarEmailAprovacao(emailAluno, nomeAluno, tituloCertificado) {
    await transporter.sendMail({
      from: process.env.MAIL_USER || 'hoursync.sistema@gmail.com',
      to: emailAluno,
      subject: 'Certificado Aprovado - HourSync',
      text: `Olá, ${nomeAluno}!\n\nSeu certificado "${tituloCertificado}" foi APROVADO.\n\nAcesse a plataforma HourSync para mais detalhes.\n\nAtenciosamente,\nEquipe HourSync`,
    });
  },

  async enviarEmailRejeicao(emailAluno, nomeAluno, tituloCertificado, justificativa) {
    await transporter.sendMail({
      from: process.env.MAIL_USER || 'hoursync.sistema@gmail.com',
      to: emailAluno,
      subject: 'Certificado Rejeitado - HourSync',
      text: `Olá, ${nomeAluno}!\n\nSeu certificado "${tituloCertificado}" foi REJEITADO.\n\nMotivo: ${justificativa}\n\nAcesse a plataforma HourSync para mais detalhes.\n\nAtenciosamente,\nEquipe HourSync`,
    });
  },
};

module.exports = emailService;
