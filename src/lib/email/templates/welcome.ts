export const getWelcomeEmailHTML = ({
  name,
  verificationToken,
  qrCode
}: {
  name: string;
  verificationToken: string;
  qrCode: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SHELTR</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(to right, #4F46E5, #7C3AED);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: white;
      padding: 30px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .verification-code {
      background: #F3F4F6;
      padding: 15px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 24px;
      text-align: center;
      margin: 20px 0;
      letter-spacing: 4px;
    }
    .qr-code {
      text-align: center;
      margin: 20px 0;
    }
    .qr-code img {
      max-width: 200px;
      height: auto;
    }
    .button {
      display: inline-block;
      background: #4F46E5;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #6B7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to SHELTR</h1>
    </div>
    <div class="content">
      <h2>Hello ${name},</h2>
      <p>Welcome to SHELTR! Your account has been created successfully.</p>
      
      <h3>Your Verification Token</h3>
      <div class="verification-code">
        ${verificationToken}
      </div>
      
      <p>Please use this token to verify your account when you first log in.</p>
      
      <div class="qr-code">
        <h3>Your Personal QR Code</h3>
        <img src="${qrCode}" alt="Your QR Code" />
        <p>Keep this QR code safe as it will be used for receiving donations.</p>
      </div>
      
      <a href="https://sheltr.org/verify" class="button">
        Verify Your Account
      </a>
      
      <div class="footer">
        <p>If you didn't create this account, please ignore this email.</p>
        <p>&copy; ${new Date().getFullYear()} SHELTR. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`; 