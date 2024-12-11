export const getServiceNotificationHTML = ({
  name,
  serviceName,
  appointmentDate,
  location,
  provider,
  additionalInfo
}: {
  name: string;
  serviceName: string;
  appointmentDate?: Date;
  location?: string;
  provider?: string;
  additionalInfo?: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHELTR Service Notification</title>
  <style>
    /* ... (same base styles as welcome email) ... */
    .service-details {
      background: #F3F4F6;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .service-details dt {
      font-weight: bold;
      color: #4F46E5;
      margin-top: 10px;
    }
    .service-details dd {
      margin-left: 0;
      margin-bottom: 10px;
    }
    .calendar-link {
      display: inline-block;
      background: #10B981;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Service Notification</h1>
    </div>
    <div class="content">
      <h2>Hello ${name},</h2>
      <p>This is a notification regarding your ${serviceName} service.</p>
      
      <div class="service-details">
        <dl>
          <dt>Service</dt>
          <dd>${serviceName}</dd>
          
          ${appointmentDate ? `
            <dt>Appointment Date</dt>
            <dd>${new Date(appointmentDate).toLocaleString()}</dd>
          ` : ''}
          
          ${location ? `
            <dt>Location</dt>
            <dd>${location}</dd>
          ` : ''}
          
          ${provider ? `
            <dt>Provider</dt>
            <dd>${provider}</dd>
          ` : ''}
        </dl>
      </div>
      
      ${additionalInfo ? `
        <div class="additional-info">
          <h3>Additional Information</h3>
          <p>${additionalInfo}</p>
        </div>
      ` : ''}
      
      ${appointmentDate ? `
        <a href="https://sheltr.org/calendar/add?date=${appointmentDate}" class="calendar-link">
          Add to Calendar
        </a>
      ` : ''}
      
      <div class="footer">
        <p>Need to make changes? Contact your case manager or support team.</p>
        <p>&copy; ${new Date().getFullYear()} SHELTR. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`; 