export const getDonationReceiptHTML = ({
  donorName,
  donorEmail,
  amount,
  participantName,
  date,
  taxId,
  receiptNumber
}: {
  donorName: string;
  donorEmail: string;
  amount: number;
  participantName: string;
  date: Date;
  taxId: string;
  receiptNumber: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHELTR Donation Receipt</title>
  <style>
    /* ... (base styles) ... */
    .receipt-box {
      border: 2px solid #4F46E5;
      padding: 30px;
      border-radius: 8px;
      margin: 20px 0;
      background: #F8FAFC;
    }
    .amount {
      font-size: 36px;
      color: #4F46E5;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
    }
    .receipt-details {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 10px;
      margin: 20px 0;
    }
    .receipt-details dt {
      color: #4B5563;
      font-weight: 600;
    }
    .tax-info {
      background: #EEF2FF;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Donation!</h1>
    </div>
    <div class="content">
      <div class="receipt-box">
        <div class="amount">
          $${amount.toLocaleString()}
        </div>
        
        <dl class="receipt-details">
          <dt>Receipt Number:</dt>
          <dd>${receiptNumber}</dd>
          
          <dt>Date:</dt>
          <dd>${new Date(date).toLocaleDateString()}</dd>
          
          <dt>Donor:</dt>
          <dd>${donorName}</dd>
          
          <dt>Beneficiary:</dt>
          <dd>${participantName}</dd>
        </dl>
        
        <div class="tax-info">
          <h3>Tax Information</h3>
          <p>This donation is tax-deductible. Our Tax ID: ${taxId}</p>
          <p>Please keep this receipt for your tax records.</p>
        </div>
      </div>
      
      <p>Your generosity makes a real difference in helping individuals transition out of homelessness.</p>
      
      <div class="impact-summary">
        <h3>Your Impact</h3>
        <p>This donation will help provide essential services including housing assistance, job training, and support services.</p>
      </div>
      
      <div class="footer">
        <p>Questions? Contact us at support@sheltr.org</p>
        <p>&copy; ${new Date().getFullYear()} SHELTR. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`; 