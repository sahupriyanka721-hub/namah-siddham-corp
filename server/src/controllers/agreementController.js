import Agreement from '../models/Agreement.js';

export const defaultSeedAgreement = {
  agreementNumber: 'AGR-2025-MANSHARP-001',
  title: 'SOFTWARE DEVELOPMENT AGREEMENT',
  agreementDate: '30th day of October 2025',
  effectiveDate: '30th October 2025',
  status: 'Signed',
  developer: {
    companyName: 'Mansharp Technologies Private Limited',
    registeredOffice: 'C-18, Padmanabh Nagar, Near Prabhat Petrol Pump, Bhopal, Madhya Pradesh, India',
    role: 'Developer',
    authorizedSignatory: 'Director / Authorized Signatory',
    email: 'info@mansharptechnologies.com',
    phone: '+91 9516262715',
    jurisdictionCity: 'Bhopal, Madhya Pradesh',
  },
  client: {
    companyName: 'Qureo Technologies Private Limited',
    registeredOffice: 'H.no 95 WARD NO 10, BH. SANTOSHI MATA MANDIR, Satna Tikuria Tola, Raghurajnagar, Satna- 485001, Madhya Pradesh',
    role: 'Client',
    authorizedSignatory: 'Director / Authorized Signatory',
    email: 'contact@qureo.in',
    phone: '+91 7672200000',
    jurisdictionCity: 'Satna, Madhya Pradesh',
  },
  projectName: 'Enterprise Custom Software & Scalable Digital Platform Development',
  scopeSummary: 'Comprehensive end-to-end design, custom full-stack software development, REST/GraphQL APIs, responsive user interface, secure admin dashboard, cloud server deployment, and 90-day post-launch warranty support.',
  contractValue: '₹ 4,50,000 + 18% GST',
  paymentTerms: 'Milestone-based payment schedule: 30% Advance on signing, 30% on Alpha architecture delivery, 30% upon Beta User Acceptance Testing (UAT), and 10% upon final production deployment and source code handover.',
  deliverables: [
    {
      milestone: 'Milestone 1',
      description: 'System Architecture, UI/UX Wireframes, Database Schema & Project Kickoff',
      timeline: '2 Weeks',
      amount: '₹ 1,35,000 (30%)',
    },
    {
      milestone: 'Milestone 2',
      description: 'Core Backend APIs, Database Integration & Functional Frontend Alpha Build',
      timeline: '4 Weeks',
      amount: '₹ 1,35,000 (30%)',
    },
    {
      milestone: 'Milestone 3',
      description: 'Comprehensive Integration, Security Audit, QA Testing & Beta UAT Release',
      timeline: '3 Weeks',
      amount: '₹ 1,35,000 (30%)',
    },
    {
      milestone: 'Milestone 4',
      description: 'Final Production Deployment, Cloud Infrastructure Setup, Source Code & Documentation Handover',
      timeline: '1 Week',
      amount: '₹ 45,000 (10%)',
    },
  ],
  clauses: [
    {
      clauseNumber: '1',
      title: 'Definitions & Interpretation',
      content: 'In this Agreement, unless the context otherwise requires: (a) "Deliverables" means all software code, modules, interfaces, and documentation developed by Developer for Client; (b) "Intellectual Property Rights" means all patents, copyrights, trademarks, trade secrets, and proprietary rights; (c) "Confidential Information" means all non-public technical, operational, and financial information disclosed by either party.',
    },
    {
      clauseNumber: '2',
      title: 'Scope of Services & Developer Obligations',
      content: 'The Developer agrees to design, develop, test, and deliver the custom software application in accordance with the mutually approved technical specifications. The Developer will deploy skilled software engineers, follow industry-standard coding practices, and maintain regular sprint progress reports with the Client.',
    },
    {
      clauseNumber: '3',
      title: 'Client Obligations & Approvals',
      content: 'The Client shall provide necessary business requirements, brand assets, API credentials, and timely feedback within five (5) business days of milestone submissions. Delay in approvals will proportionally extend development schedules without penalty to the Developer.',
    },
    {
      clauseNumber: '4',
      title: 'Consideration, Fees & Invoicing',
      content: 'In consideration of the development services, the Client agrees to pay the contract value as per the milestone schedule. Invoices issued by the Developer shall be settled within seven (7) business days. All statutory taxes including Goods and Services Tax (GST) shall be payable over and above the agreed contract fee.',
    },
    {
      clauseNumber: '5',
      title: 'Intellectual Property Rights & Source Code Ownership',
      content: 'Upon full and final payment of all agreed dues and milestone invoices by the Client, the Developer shall assign and transfer all exclusive copyright, title, and ownership in the custom code specifically created for the Client. Developer retains ownership of its pre-existing tools, open-source libraries, and reusable core frameworks.',
    },
    {
      clauseNumber: '6',
      title: 'Confidentiality & Non-Disclosure',
      content: 'Both parties agree to treat all business information, source code, user databases, commercial terms, and trade secrets as strictly confidential. Neither party shall disclose Confidential Information to any third party without prior written consent, surviving for a period of three (3) years post-termination.',
    },
    {
      clauseNumber: '7',
      title: 'Warranty & 90-Day Post-Launch Maintenance',
      content: 'The Developer warrants that the delivered software will function substantially in accordance with the agreed specifications for a period of ninety (90) days following production deployment ("Warranty Period"). The Developer shall fix any reproducible bugs or system defects discovered during this period at no additional charge.',
    },
    {
      clauseNumber: '8',
      title: 'Term & Termination',
      content: 'This Agreement takes effect on the Effective Date and remains valid until completion of deliverables or termination. Either party may terminate this Agreement with thirty (30) days written notice in case of a material breach uncured within fifteen (15) days. Upon termination, Client shall pay for all work completed up to the date of termination.',
    },
    {
      clauseNumber: '9',
      title: 'Limitation of Liability & Indemnity',
      content: 'Neither party shall be liable for indirect, incidental, or consequential damages. The Developer total aggregate liability arising out of or related to this Agreement shall be limited to the total fees actually received by Developer under this Agreement.',
    },
    {
      clauseNumber: '10',
      title: 'Governing Law & Jurisdiction',
      content: 'This Agreement shall be governed by, construed, and enforced in accordance with the substantive laws of India. Any disputes or claims arising hereunder shall be subject to the exclusive jurisdiction of the competent courts situated at Bhopal, Madhya Pradesh, India.',
    },
  ],
  signedByDeveloper: true,
  signedByClient: true,
  notes: 'Executed Software Development Agreement between Mansharp Technologies Private Limited and Qureo Technologies Private Limited.',
};

// Fetch all agreements (auto-seeds default agreement if empty)
export const getAllAgreements = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { agreementNumber: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { 'developer.companyName': { $regex: search, $options: 'i' } },
        { 'client.companyName': { $regex: search, $options: 'i' } },
        { projectName: { $regex: search, $options: 'i' } },
      ];
    }

    let agreements = await Agreement.find(query).sort({ createdAt: -1 });

    // Auto-seed if collection is completely empty
    if (agreements.length === 0 && !search && (!status || status === 'all')) {
      const existingCount = await Agreement.countDocuments();
      if (existingCount === 0) {
        const seeded = await Agreement.create(defaultSeedAgreement);
        agreements = [seeded];
      }
    }

    res.status(200).json({
      success: true,
      count: agreements.length,
      data: agreements,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch single agreement by ID
export const getAgreementById = async (req, res, next) => {
  try {
    const agreement = await Agreement.findById(req.params.id);
    if (!agreement) {
      return res.status(404).json({
        success: false,
        message: 'Agreement not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: agreement,
    });
  } catch (error) {
    next(error);
  }
};

// Create new agreement
export const createAgreement = async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.agreementNumber) {
      const count = await Agreement.countDocuments();
      payload.agreementNumber = `AGR-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    }

    const agreement = await Agreement.create(payload);

    res.status(201).json({
      success: true,
      message: 'Agreement created successfully.',
      data: agreement,
    });
  } catch (error) {
    next(error);
  }
};

// Update agreement
export const updateAgreement = async (req, res, next) => {
  try {
    const agreement = await Agreement.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!agreement) {
      return res.status(404).json({
        success: false,
        message: 'Agreement not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Agreement updated successfully.',
      data: agreement,
    });
  } catch (error) {
    next(error);
  }
};

// Delete agreement
export const deleteAgreement = async (req, res, next) => {
  try {
    const agreement = await Agreement.findByIdAndDelete(req.params.id);

    if (!agreement) {
      return res.status(404).json({
        success: false,
        message: 'Agreement not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Agreement deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
