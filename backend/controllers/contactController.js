
const Contact = require('../models/Contact');

const {
  sendAdminNotification,
  sendClientAcknowledgement,
} = require('../services/emailService');

const emailEnabled = () =>
  process.env.EMAIL_ENABLED === 'true';

const acknowledgementEnabled = () =>
  emailEnabled() &&
  process.env.SEND_CLIENT_ACKNOWLEDGEMENT === 'true';

async function createContact(req, res, next) {
  try {
    const enquiry = await Contact.create({
      ...req.validatedContact,

      emailNotification: {
        status: emailEnabled() ? 'pending' : 'disabled',
      },

      clientAcknowledgement: {
        status: acknowledgementEnabled()
          ? 'pending'
          : 'disabled',
      },
    });

    // Return only after the database write succeeds.
    // Email processing follows without affecting the result.
    res.status(201).json({
      success: true,
      message: 'Your enquiry has been received successfully.',
      data: {
        id: enquiry.id,
        createdAt: enquiry.createdAt,
      },
    });

    // This is a best-effort approach for a single running server.
    // A durable job queue is recommended for production reliability.
    void processEnquiryEmails(enquiry.id).catch((error) => {
      console.error('Enquiry email processing failed:', error.message);
    });
  } catch (error) {
    next(error);
  }
}

async function processEnquiryEmails(enquiryId) {
  const enquiry = await Contact.findById(enquiryId);

  if (!enquiry) return;

  if (emailEnabled()) {
    try {
      const result = await sendAdminNotification(enquiry);

      await Contact.updateOne(
        { _id: enquiryId },
        {
          $set: {
            'emailNotification.status': result.skipped
              ? 'disabled'
              : 'sent',
            'emailNotification.sentAt': result.skipped
              ? null
              : new Date(),
            'emailNotification.lastError': '',
          },
        }
      );
    } catch (error) {
      await Contact.updateOne(
        { _id: enquiryId },
        {
          $set: {
            'emailNotification.status': 'failed',
            'emailNotification.lastError':
              error.message.slice(0, 500),
          },
        }
      );

      console.error(
        'Admin notification failed for enquiry:',
        String(enquiryId)
      );
    }
  }

  if (acknowledgementEnabled()) {
    try {
      const result = await sendClientAcknowledgement(enquiry);

      await Contact.updateOne(
        { _id: enquiryId },
        {
          $set: {
            'clientAcknowledgement.status': result.skipped
              ? 'disabled'
              : 'sent',
            'clientAcknowledgement.sentAt': result.skipped
              ? null
              : new Date(),
          },
        }
      );
    } catch (error) {
      await Contact.updateOne(
        { _id: enquiryId },
        {
          $set: {
            'clientAcknowledgement.status': 'failed',
          },
        }
      );

      console.error(
        'Client acknowledgement failed for enquiry:',
        String(enquiryId)
      );
    }
  }
}

module.exports = {
  createContact,
};
