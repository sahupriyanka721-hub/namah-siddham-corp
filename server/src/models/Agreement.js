import mongoose from 'mongoose';

const ClauseSchema = new mongoose.Schema(
  {
    clauseNumber: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const DeliverableSchema = new mongoose.Schema(
  {
    milestone: { type: String, required: true },
    description: { type: String, required: true },
    timeline: { type: String, default: '' },
    amount: { type: String, default: '' },
  },
  { _id: false }
);

const AgreementSchema = new mongoose.Schema(
  {
    agreementNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Agreement title is required'],
      default: 'SOFTWARE DEVELOPMENT AGREEMENT',
      trim: true,
    },
    agreementDate: {
      type: String,
      required: true,
      default: '30th day of October 2025',
    },
    effectiveDate: {
      type: String,
      default: '30th October 2025',
    },
    status: {
      type: String,
      enum: ['Draft', 'Under Review', 'Active', 'Signed', 'Completed', 'Terminated'],
      default: 'Signed',
    },
    developer: {
      companyName: {
        type: String,
        required: true,
        default: 'Mansharp Technologies Private Limited',
      },
      registeredOffice: {
        type: String,
        required: true,
        default: 'C-18, Padmanabh Nagar, Near Prabhat Petrol Pump, Bhopal, Madhya Pradesh, India',
      },
      role: {
        type: String,
        default: 'Developer',
      },
      authorizedSignatory: {
        type: String,
        default: 'Authorized Signatory / Director',
      },
      email: {
        type: String,
        default: 'info@mansharptechnologies.com',
      },
      phone: {
        type: String,
        default: '+91 9516262715',
      },
      jurisdictionCity: {
        type: String,
        default: 'Bhopal, Madhya Pradesh',
      },
    },
    client: {
      companyName: {
        type: String,
        required: true,
        default: 'Qureo Technologies Private Limited',
      },
      registeredOffice: {
        type: String,
        required: true,
        default: 'H.no 95 WARD NO 10, BH. SANTOSHI MATA MANDIR, Satna Tikuria Tola, Raghurajnagar, Satna- 485001, Madhya Pradesh',
      },
      role: {
        type: String,
        default: 'Client',
      },
      authorizedSignatory: {
        type: String,
        default: 'Authorized Signatory / Director',
      },
      email: {
        type: String,
        default: 'contact@qureo.in',
      },
      phone: {
        type: String,
        default: '+91 7672200000',
      },
      jurisdictionCity: {
        type: String,
        default: 'Satna / Bhopal, Madhya Pradesh',
      },
    },
    projectName: {
      type: String,
      default: 'Custom Software & Digital Application Platform Development',
    },
    scopeSummary: {
      type: String,
      default: 'End-to-end design, full-stack software development, cloud infrastructure setup, API integration, QA testing, deployment, and 90-day post-launch maintenance.',
    },
    contractValue: {
      type: String,
      default: '₹ 4,50,000 + 18% GST',
    },
    paymentTerms: {
      type: String,
      default: 'Milestone based: 30% Advance on signing, 30% on Alpha Build delivery, 30% on Beta testing & UAT approval, 10% on Final deployment and code handover.',
    },
    deliverables: [DeliverableSchema],
    clauses: [ClauseSchema],
    signedByDeveloper: {
      type: Boolean,
      default: true,
    },
    signedByClient: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
      default: 'Original executed contract between Mansharp Technologies Pvt. Ltd. and Qureo Technologies Pvt. Ltd.',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Agreement', AgreementSchema);
