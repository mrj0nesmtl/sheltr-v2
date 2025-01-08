export const getDonorWelcomeHTML = ({
  name,
  verificationToken
}: {
  name: string;
  verificationToken: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SHELTR - Donor Community</title>
  <style>
    /* ... (base styles from welcome.ts) ... */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to SHELTR's Donor Community</h1>
    </div>
    <div class="content">
      <h2>Hello ${name},</h2>
      <p>Thank you for joining SHELTR as a donor. Your commitment to helping others makes real change possible.</p>
      
      <h3>Next Steps:</h3>
      <ol>
        <li>Verify your email using the code below</li>
        <li>Complete your donor profile</li>
        <li>Explore available donation opportunities</li>
      </ol>

      <div class="verification-code">
        ${verificationToken}
      </div>
      
      <a href="https://sheltr.org/verify" class="button">
        Verify Your Account
      </a>
      
      <div class="features">
        <h3>As a SHELTR donor, you can:</h3>
        <ul>
          <li>Track your donation impact</li>
          <li>Receive tax receipts automatically</li>
          <li>Connect with other donors</li>
          <li>See real-time impact updates</li>
        </ul>
      </div>
      
      <div class="footer">
        <p>Questions? Contact our donor support team at donors@sheltr.org</p>
        <p>&copy; ${new Date().getFullYear()} SHELTR. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`; 