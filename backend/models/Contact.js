
const mongoose = require('mongoose');

const serviceValues = [
    'website-development',
    'website-redesign',
    'ui-ux-design',
    'software-solutions',
    'logo-branding',
    'social-media-design',
    'business-support',
    'digital-assistance',
    'other',
];

const budgetValues = [
    'not-sure',
    'below-10000',
    '10000-25000',
    '25000-50000',
    '50000-100000',
    'above-100000',
];

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 254,
        },

        phone: {
            type: String,
            default: '',
            trim: true,
            maxlength: 20,
        },

        service: {
            type: String,
            required: true,
            enum: serviceValues,
        },

        budget: {
            type: String,
            default: '',
            enum: ['', ...budgetValues],
        },

        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 20,
            maxlength: 3000,
        },

        status: {
            type: String,
            enum: ['new', 'contacted', 'in-progress', 'closed'],
            default: 'new',
        },


        emailNotification: {
            status: {
                type: String,
                enum: ['pending', 'sent', 'failed', 'disabled'],
                default: 'pending',
            },
            sentAt: {
                type: Date,
                default: null,
            },
            lastError: {
                type: String,
                default: '',
                maxlength: 500,
            },
        },

        clientAcknowledgement: {
            status: {
                type: String,
                enum: ['pending', 'sent', 'failed', 'disabled'],
                default: 'disabled',
            },
            sentAt: {
                type: Date,
                default: null,
            },
        },

    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'contact_enquiries',
    }
);

contactSchema.index({ createdAt: -1 });

module.exports =
    mongoose.models.Contact ||
    mongoose.model('Contact', contactSchema);
