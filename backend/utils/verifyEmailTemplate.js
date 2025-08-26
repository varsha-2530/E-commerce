const verifyEmailTemplate = ({ username, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Dear <strong>${username}</strong>,</p>
      <p>Thank you for registering at <strong>MinimalMart</strong>.</p>
      <p>Please verify your email by clicking the button below:</p>

      <a 
        href="${url}" 
        style="
          display: inline-block;
          padding: 12px 20px;
          background-color: orange;
          color: black;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 10px;
          font-weight: bold;
        ">
        Verify Email
      </a>

      <p>If the button doesn't work, click this link or paste it in your browser:</p>
      <p><a href="${url}" style="color: blue;">${url}</a></p>

      <p>– The MinimalMart Team</p>
    </div>
  `;
};

export default verifyEmailTemplate;
