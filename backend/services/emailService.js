
const { Resend } = require('resend');

const emailEnabled = process.env.EMAIL_ENABLED === 'true';

const clientAcknowledgementEnabled =
  process.env.SEND_CLIENT_ACKNOWLEDGEMENT === 'true';

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

function getEmailClient() {
  if (!emailEnabled) return null;

  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing');
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error('EMAIL_FROM is missing');
  }

  return new Resend(process.env.RESEND_API_KEY);
}

async function sendEmail(payload) {
  const client = getEmailClient();

  if (!client) {
    return { skipped: true };
  }

  const { data, error } = await client.emails.send(payload);

  if (error) {
    throw new Error(
      `Email provider rejected request: ${error.name || 'Unknown error'}`
    );
  }

  return {
    skipped: false,
    id: data?.id,
  };
}

async function sendAdminNotification(enquiry) {
  if (!emailEnabled) {
    return { skipped: true };
  }

  const to = process.env.EMAIL_TO;

  if (!to) {
    throw new Error('EMAIL_TO is missing');
  }

  const name = escapeHtml(enquiry.name);
  const email = escapeHtml(enquiry.email);
  const phone = escapeHtml(enquiry.phone || 'Not provided');
  const service = escapeHtml(enquiry.service);
  const budget = escapeHtml(enquiry.budget || 'Not specified');
  const message = escapeHtml(enquiry.message);

  return sendEmail({
    from: process.env.EMAIL_FROM,
    to: [to],
    replyTo: enquiry.email,
    subject: `New Project Enquiry - ${enquiry.service}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#222">
        <div style="background:#151122;color:#fff;padding:24px;border-radius:12px 12px 0 0">
          <h2 style="margin:0">DAN IT CONSULTANCY SERVICE</h2>
          <p style="color:#c4b5fd">New Project Enquiry</p>
        </div>
        <div style="padding:24px;border:1px solid #eee">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <hr style="border:0;border-top:1px solid #eee;margin:24px 0">
          <h3>Project Description</h3>
          <p style="white-space:pre-wrap;overflow-wrap:anywhere">${message}</p>
          <p style="font-size:12px;color:#777">
            Enquiry ID: ${escapeHtml(enquiry._id)}
          </p>
        </div>
      </div>
    `,
    text: [
      'New Project Enquiry',
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || 'Not provided'}`,
      `Service: ${enquiry.service}`,
      `Budget: ${enquiry.budget || 'Not specified'}`,
      `Message: ${enquiry.message}`,
    ].join('\n'),
  });
}

async function sendClientAcknowledgement(enquiry) {
  if (!emailEnabled || !clientAcknowledgementEnabled) {
    return { skipped: true };
  }

  const name = escapeHtml(enquiry.name);

  return sendEmail({
    from: process.env.EMAIL_FROM,
    to: [enquiry.email],
    replyTo: process.env.EMAIL_TO,
    subject: 'We received your enquiry - DAN IT CONSULTANCY SERVICE',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto">
        <h2 style="color:#8b5cf6">DAN IT CONSULTANCY SERVICE</h2>
        <p>Hello ${name},</p>
        <p>Thank you for contacting us.</p>
        <p>We have received your project enquiry and will review your requirements.</p>
        <p>Our team will get back to you as soon as possible.</p>
        <p>Regards,<br><strong>DAN IT CONSULTANCY SERVICE</strong></p>
      </div>
    `,
    text: `Hello ${enquiry.name},

Thank you for contacting DAN IT CONSULTANCY SERVICE.

We have received your project enquiry and will review your requirements.

Our team will get back to you as soon as possible.

Regards,
DAN IT CONSULTANCY SERVICE`,
  });
}

module.exports = {
  sendAdminNotification,
  sendClientAcknowledgement,
};
