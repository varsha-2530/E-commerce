const forgotPasswordTemplate = ({ username, otp }) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="color: #333;">Hello ${username},</h2>
    <p style="font-size: 16px; color: #555;">
      You requested a password reset for your <strong>MinimalMart</strong> account.
      Please use the OTP below to reset your password.
    </p>

    <div style="margin: 30px 0; text-align: center;">
      <div style="display: inline-block; background-color: #ffeb3b; color: #222; font-size: 24px; padding: 15px 30px; font-weight: bold; border-radius: 8px; letter-spacing: 4px;">
        ${otp}
      </div>
    </div>

    <p style="font-size: 14px; color: #777;">
      This OTP is valid for <strong>1 hour</strong>. Enter it on the MinimalMart website to complete the password reset process.
    </p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 14px; color: #555;">Thanks,</p>
    <p style="font-weight: bold; font-size: 16px; color: #333;">The MinimalMart Team</p>
  </div>
  `;
};

export default forgotPasswordTemplate;
