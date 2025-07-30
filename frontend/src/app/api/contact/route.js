import nodemailer from "nodemailer";

export async function POST(req) {
  const { nom, prenom, email, message, token } = await req.json();

  // 🔐 Vérification du reCAPTCHA Google
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const recaptchaJson = await recaptchaRes.json();
  if (!recaptchaJson.success) {
    return new Response(JSON.stringify({ error: "reCAPTCHA invalide" }), {
      status: 400,
    });
  }

  // ✉️ Configuration SMTP IONOS
  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.fr",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Villas Grande Anse" <${process.env.SMTP_USER}>`,
      to: "villasgrandeanse@hotmail.com",
      replyTo: email,
      subject: "Demande de contact - Villas Grande Anse",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 24px; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://villas-grande-anse.com/logo.png" alt="Logo Villas Grande Anse" style="max-width: 180px;" />
    </div>

    <h2 style="color: #223e50;">📬 Nouveau message de contact</h2>

    <p><strong>Nom :</strong> ${prenom} ${nom}</p>
    <p><strong>Email :</strong> <a href="mailto:${email}" style="color: #eeb868;">${email}</a></p>

    <p style="margin-top: 16px;"><strong>Message :</strong></p>
    <blockquote style="border-left: 4px solid #eeb868; margin: 12px 0; padding-left: 12px; color: #333;">
      ${message.replace(/\n/g, "<br>")}
    </blockquote>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 0.9em; color: #888;">
      Ce message a été envoyé depuis le site <a href="https://villas-grande-anse.com" style="color: #eeb868;">villas-grande-anse.com</a>.
    </p>
  </div>
`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur email :", error);
    return new Response(JSON.stringify({ error: "Erreur email" }), {
      status: 500,
    });
  }
}
