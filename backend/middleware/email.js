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

module.exports = SendVerificationCode;
