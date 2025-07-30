import nodemailer from "nodemailer";

export async function POST(request) {
  const body = await request.json();

  const {
    villaName,
    start,
    end,
    rooms,
    guests,
    price,
    nom,
    email,
    telephone,
    message,
    token,
  } = body;

  if (!token) {
    return Response.json({ error: "reCAPTCHA manquant." }, { status: 400 });
  }

  const recaptchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    { method: "POST" }
  );
  const recaptchaData = await recaptchaRes.json();

  if (!recaptchaData.success) {
    return Response.json({ error: "Échec reCAPTCHA" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.fr",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Mail pour le propriétaire
  const mailToOwner = {
    from: `"Villas Grande Anse" <${process.env.SMTP_USER}>`,
    to: "villasgrandeanse@hotmail.com",
    subject: `Demande de réservation - ${villaName}`,
    html: `
      <h2>Nouvelle demande de réservation</h2>
      <p><strong>Villa :</strong> ${villaName}</p>
      <p><strong>Dates :</strong> du ${start} au ${end}</p>
      <p><strong>Chambres :</strong> ${rooms}</p>
      <p><strong>Nombre de personnes :</strong> ${guests}</p>
      <p><strong>Prix :</strong> ${price} €</p>
      <hr>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${telephone}</p>
      ${
        message
          ? `<p><strong>Message :</strong><br>${message.replace(
              /\n/g,
              "<br>"
            )}</p>`
          : ""
      }
    `,
  };

  // Mail de confirmation au client
  const mailToClient = {
    from: `"Villas Grande Anse" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Confirmation de votre demande de réservation",
    html: `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="public/logo.png" alt="Logo Villas Grande Anse" style="max-width: 180px; height: auto;" />
    </div>

    <h2>Bonjour ${nom},</h2>
    <p>Merci pour votre demande de réservation.</p>
    <p>Voici un récapitulatif de votre demande :</p>
    <ul>
      <li><strong>Villa :</strong> ${villaName}</li>
      <li><strong>Dates :</strong> du ${start} au ${end}</li>
      <li><strong>Nombre de chambres :</strong> ${rooms}</li>
      <li><strong>Nombre de personnes :</strong> ${guests}</li>
      <li><strong>Prix estimé :</strong> ${price} €</li>
    </ul>
    ${
      message
        ? `<p><strong>Message transmis :</strong><br>${message.replace(
            /\n/g,
            "<br>"
          )}</p>`
        : ""
    }
    <p>Nous vous contacterons sous 24h pour finaliser votre réservation.</p>
    <br>
    <p>Bien cordialement,<br>L’équipe Villas Grande Anse</p>

    <hr style="margin: 30px 0;">

    <div style="text-align: center;">
      <p style="margin-bottom: 10px; color: #999;">Suivez-nous sur les réseaux :</p>
      <a href="https://www.facebook.com/profile.php?id=61560053927118&locale=fr_FR" target="_blank" style="margin: 0 10px;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" style="width: 24px; height: 24px;" />
      </a>
      <a href="https://www.instagram.com/villasgrandeansedeshaies/" target="_blank" style="margin: 0 10px;">
        <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;" />
      </a>
    </div>

    <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
      Ceci est un accusé de réception automatique, merci de ne pas répondre à ce message.
    </p>
  `,
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToClient);
    return Response.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi mail :", err);
    return Response.json({ error: "Erreur serveur mail" }, { status: 500 });
  }
}
