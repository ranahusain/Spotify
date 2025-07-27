const transporter = require("./email.config");

const SendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Spotify" <capthussain2point0@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      text: "Verify Your Email", // plain‑text body
      html: verificationCode, // HTML body
    });
    console.log("Email sent Successfully!");
  } catch (error) {
    console.log("Error while sending Email", error);
  }
};
const SendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: '"Spotify" <capthussain2point0@gmail.com>',
      to: email,
      subject: "Welcome to Spotify!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Your email has been <strong>successfully verified</strong>.</p>
        <p>Welcome to <strong>Spotify</strong>! We're excited to have you onboard. 🎧</p>
        <p>Start discovering music, creating playlists, and sharing your vibes!</p>
      `,
    });

    console.log("Welcome email sent!");
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
  }
};

module.exports = { SendVerificationCode, SendWelcomeEmail };
