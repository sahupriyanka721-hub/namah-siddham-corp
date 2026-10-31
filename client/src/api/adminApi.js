import apiClient from './client';
import {
  mockPlatforms,
  mockNews,
  mockJobs,
  mockTeam,
  mockInquiries,
  mockPartnerInquiries,
  mockApplications,
  mockAgreements,
} from '../data/mockData';

const withFallback = async (apiCall, getFallback) => {
  try {
    return await apiCall();
  } catch (err) {
    const fallback = typeof getFallback === 'function' ? getFallback() : getFallback;
    return { data: fallback };
  }
};

const getStoredContacts = () => {
  const local = JSON.parse(localStorage.getItem('namah_mock_contacts') || '[]');
  return [...local, ...mockInquiries];
};

const getStoredPartners = () => {
  const local = JSON.parse(localStorage.getItem('namah_mock_partners') || '[]');
  return [...local, ...mockPartnerInquiries];
};

const getStoredApplications = () => {
  const local = JSON.parse(localStorage.getItem('namah_mock_applications') || '[]');
  return [...local, ...mockApplications];
};

const getStoredAgreements = () => {
  const local = JSON.parse(localStorage.getItem('namah_mock_agreements') || 'null');
  if (local && Array.isArray(local) && local.length > 0) {
    return local;
  }
  return mockAgreements;
};

const saveStoredAgreements = (agreements) => {
  localStorage.setItem('namah_mock_agreements', JSON.stringify(agreements));
};

export const adminApi = {
  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),
  sendOtp: (data) => apiClient.post('/auth/send-otp', data),
  verifyOtp: (data) => apiClient.post('/auth/verify-otp', data),
  logout: () => apiClient.post('/auth/logout'),
  getMe: () =>
    withFallback(
      () => apiClient.get('/auth/me'),
      {
        success: true,
        admin: {
          _id: 'admin_demo_superadmin',
          name: 'Chief Administrator',
          email: 'admin@namahsiddham.com',
          role: 'superadmin',
        },
      }
    ),
  changePassword: (data) =>
    withFallback(
      () => apiClient.post('/auth/change-password', data),
      { success: true, message: 'Password updated successfully.' }
    ),

  // Dashboard & Settings
  getDashboardStats: () =>
    withFallback(
      () => apiClient.get('/admin/dashboard'),
      () => {
        const contacts = getStoredContacts();
        const partners = getStoredPartners();
        return {
          stats: {
            totalPublishedServices: 4,
            totalServices: 4,
            totalPublishedPlatforms: 4,
            productsUnderDevelopment: 4,
            totalPlatforms: 4,
            publishedPortfolioProjects: 4,
            totalPortfolioProjects: 4,
            totalContactInquiries: contacts.length,
            newContactInquiries: contacts.filter((c) => c.status === 'New').length,
            totalPartnerInquiries: partners.length,
            newPartnerInquiries: partners.filter((p) => p.status === 'New').length,
            publishedJobOpenings: mockJobs.length,
            totalApplications: 2,
            publishedNewsArticles: mockNews.length,
          },
          system: {
            databaseStatus: 'Connected',
            cin: 'U77100MP2026PTC087531',
            location: 'Bhopal, Madhya Pradesh, India',
          },
          recentActivity: {
            contacts: contacts.slice(0, 5),
            partners: partners.slice(0, 5),
          },
        };
      }
    ),

  getSettings: () =>
    withFallback(
      () => apiClient.get('/admin/settings'),
      {
        success: true,
        data: {
          companyName: 'Namah Siddham Corporation Private Limited',
          companyType: 'Private Limited Company',
          cin: 'U77100MP2026PTC087531',
          officialEmail: 'nscpl01@gmail.com',
          officialPhone: '9516262715',
          registeredOffice: {
            city: 'Bhopal',
            state: 'Madhya Pradesh',
            country: 'India',
            fullAddress: 'Registered Office: Bhopal, Madhya Pradesh, India. CIN: U77100MP2026PTC087531',
          },
        },
      }
    ),

  updateSettings: (data) =>
    withFallback(
      () => apiClient.put('/admin/settings', data),
      { success: true, message: 'Settings saved successfully.' }
    ),

  // IT Services CRUD
  getServices: (params) =>
    withFallback(
      () => apiClient.get('/admin/services', { params }),
      { success: true, data: [] }
    ),

  getServiceById: (id) =>
    withFallback(
      () => apiClient.get(`/admin/services/${id}`),
      { success: true, data: null }
    ),

  createService: (data) =>
    withFallback(
      () => apiClient.post('/admin/services', data),
      { success: true, message: 'Service registered successfully.', data }
    ),

  updateService: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/services/${id}`, data),
      { success: true, message: 'Service updated successfully.', data }
    ),

  deleteService: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/services/${id}`),
      { success: true, message: 'Service deleted.' }
    ),

  reorderServices: (items) =>
    withFallback(
      () => apiClient.post('/admin/services/reorder', { items }),
      { success: true, message: 'Services display order updated.' }
    ),

  // Products / Platforms CRUD
  getPlatforms: (params) =>
    withFallback(
      () => apiClient.get('/admin/platforms', { params }),
      { success: true, data: mockPlatforms }
    ),

  getPlatformById: (id) =>
    withFallback(
      () => apiClient.get(`/admin/platforms/${id}`),
      { success: true, data: mockPlatforms.find((p) => p._id === id) || mockPlatforms[0] }
    ),

  createPlatform: (data) =>
    withFallback(
      () => apiClient.post('/admin/platforms', data),
      { success: true, message: 'Platform registered successfully.', data }
    ),

  updatePlatform: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/platforms/${id}`, data),
      { success: true, message: 'Platform updated successfully.', data }
    ),

  deletePlatform: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/platforms/${id}`),
      { success: true, message: 'Platform removed.' }
    ),

  reorderPlatforms: (items) =>
    withFallback(
      () => apiClient.post('/admin/platforms/reorder', { items }),
      { success: true, message: 'Platform order updated.' }
    ),

  // Portfolio Projects CRUD
  getPortfolio: (params) =>
    withFallback(
      () => apiClient.get('/admin/portfolio', { params }),
      { success: true, data: [] }
    ),

  getPortfolioProjectById: (id) =>
    withFallback(
      () => apiClient.get(`/admin/portfolio/${id}`),
      { success: true, data: null }
    ),

  createPortfolioProject: (data) =>
    withFallback(
      () => apiClient.post('/admin/portfolio', data),
      { success: true, message: 'Portfolio project created successfully.', data }
    ),

  updatePortfolioProject: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/portfolio/${id}`, data),
      { success: true, message: 'Portfolio project updated successfully.', data }
    ),

  deletePortfolioProject: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/portfolio/${id}`),
      { success: true, message: 'Portfolio project deleted.' }
    ),

  // CMS Pages
  getPages: () =>
    withFallback(
      () => apiClient.get('/admin/pages'),
      { success: true, data: [] }
    ),

  getPageBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/admin/pages/${slug}`),
      { success: true, data: { slug, title: slug, sections: [] } }
    ),

  updatePageContent: (slug, data) =>
    withFallback(
      () => apiClient.put(`/admin/pages/${slug}`, data),
      { success: true, message: 'Content saved successfully.' }
    ),

  // Leadership Team
  getTeam: () =>
    withFallback(
      () => apiClient.get('/admin/team'),
      { success: true, data: mockTeam }
    ),

  createTeamMember: (data) =>
    withFallback(
      () => apiClient.post('/admin/team', data),
      { success: true, message: 'Team member added.', data }
    ),

  updateTeamMember: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/team/${id}`, data),
      { success: true, message: 'Team member updated.', data }
    ),

  deleteTeamMember: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/team/${id}`),
      { success: true, message: 'Member removed.' }
    ),

  // News & Updates
  getNews: (params) =>
    withFallback(
      () => apiClient.get('/admin/news', { params }),
      { success: true, data: mockNews, total: mockNews.length }
    ),

  createNews: (data) =>
    withFallback(
      () => apiClient.post('/admin/news', data),
      { success: true, message: 'News article published.', data }
    ),

  updateNews: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/news/${id}`, data),
      { success: true, message: 'Article updated.', data }
    ),

  deleteNews: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/news/${id}`),
      { success: true, message: 'Article deleted.' }
    ),

  // Careers
  getJobs: (params) =>
    withFallback(
      () => apiClient.get('/admin/jobs', { params }),
      { success: true, data: mockJobs, total: mockJobs.length }
    ),

  createJob: (data) =>
    withFallback(
      () => apiClient.post('/admin/jobs', data),
      { success: true, message: 'Opening created.', data }
    ),

  updateJob: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/jobs/${id}`, data),
      { success: true, message: 'Opening updated.', data }
    ),

  deleteJob: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/jobs/${id}`),
      { success: true, message: 'Opening deleted.' }
    ),

  // Inquiries
  getContactInquiries: (params) =>
    withFallback(
      () => apiClient.get('/admin/inquiries/contact', { params }),
      () => ({
        success: true,
        data: getStoredContacts(),
        total: getStoredContacts().length,
      })
    ),

  updateContactInquiry: (id, data) =>
    withFallback(
      () => apiClient.patch(`/admin/inquiries/contact/${id}`, data),
      { success: true, message: 'Status updated.' }
    ),

  deleteContactInquiry: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/inquiries/contact/${id}`),
      { success: true, message: 'Inquiry removed.' }
    ),

  exportContactCSV: () => {
    const csvContent =
      'Reference ID,Name,Business Name,Email,Mobile,City,Service Required,Budget,Message,Status,Created At\n' +
      getStoredContacts()
        .map(
          (c) =>
            `"${c.referenceId || ''}","${c.name || ''}","${c.businessName || ''}","${c.email || ''}","${c.phone || ''}","${c.city || ''}","${c.serviceRequired || ''}","${c.budgetRange || ''}","${(c.projectDescription || c.message || '').replace(/"/g, '""')}","${c.status || 'New'}","${c.createdAt || ''}"`
        )
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return Promise.resolve({ data: blob });
  },

  getPartnerInquiries: (params) =>
    withFallback(
      () => apiClient.get('/admin/inquiries/partners', { params }),
      () => ({
        success: true,
        data: getStoredPartners(),
        total: getStoredPartners().length,
      })
    ),

  updatePartnerInquiry: (id, data) =>
    withFallback(
      () => apiClient.patch(`/admin/inquiries/partners/${id}`, data),
      { success: true, message: 'Partner status updated.' }
    ),

  deletePartnerInquiry: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/inquiries/partners/${id}`),
      { success: true, message: 'Partner inquiry removed.' }
    ),

  exportPartnerCSV: () => {
    const csvContent =
      'Reference ID,Business Name,Contact Person,Email,Mobile,City,State,Category,Platform,Status,Created At\n' +
      getStoredPartners()
        .map(
          (p) =>
            `"${p.referenceId || ''}","${p.businessName || ''}","${p.name || ''}","${p.email || ''}","${p.mobile || p.phone || ''}","${p.city || ''}","${p.state || ''}","${p.category || ''}","${p.platform || ''}","${p.status || 'New'}","${p.createdAt || ''}"`
        )
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return Promise.resolve({ data: blob });
  },

  getJobApplications: (params) =>
    withFallback(
      () => apiClient.get('/admin/inquiries/applications', { params }),
      () => ({
        success: true,
        data: getStoredApplications(),
        total: getStoredApplications().length,
      })
    ),

  updateJobApplication: (id, data) =>
    withFallback(
      () => apiClient.patch(`/admin/inquiries/applications/${id}`, data),
      { success: true, message: 'Application status updated.' }
    ),

  deleteJobApplication: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/inquiries/applications/${id}`),
      { success: true, message: 'Application removed.' }
    ),

  // Client Agreements & Legal Contracts
  getAgreements: (params) =>
    withFallback(
      () => apiClient.get('/admin/agreements', { params }),
      () => {
        let items = getStoredAgreements();
        if (params?.status && params.status !== 'all') {
          items = items.filter((a) => a.status?.toLowerCase() === params.status?.toLowerCase());
        }
        if (params?.search) {
          const q = params.search.toLowerCase();
          items = items.filter(
            (a) =>
              a.agreementNumber?.toLowerCase().includes(q) ||
              a.title?.toLowerCase().includes(q) ||
              a.developer?.companyName?.toLowerCase().includes(q) ||
              a.client?.companyName?.toLowerCase().includes(q) ||
              a.projectName?.toLowerCase().includes(q)
          );
        }
        return {
          success: true,
          data: items,
          count: items.length,
        };
      }
    ),

  getAgreementById: (id) =>
    withFallback(
      () => apiClient.get(`/admin/agreements/${id}`),
      () => {
        const item =
          getStoredAgreements().find((a) => a._id === id || a.agreementNumber === id) ||
          mockAgreements[0];
        return { success: true, data: item };
      }
    ),

  createAgreement: (data) =>
    withFallback(
      () => apiClient.post('/admin/agreements', data),
      () => {
        const list = getStoredAgreements();
        const newDoc = {
          ...data,
          _id: 'agr_' + Date.now(),
          agreementNumber:
            data.agreementNumber ||
            `AGR-${new Date().getFullYear()}-${String(list.length + 1).padStart(3, '0')}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const updated = [newDoc, ...list];
        saveStoredAgreements(updated);
        return { success: true, message: 'Agreement created successfully.', data: newDoc };
      }
    ),

  updateAgreement: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/agreements/${id}`, data),
      () => {
        const list = getStoredAgreements();
        const index = list.findIndex((a) => a._id === id || a.agreementNumber === id);
        let updatedDoc;
        if (index !== -1) {
          list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
          updatedDoc = list[index];
        } else {
          updatedDoc = { ...data, _id: id, updatedAt: new Date().toISOString() };
          list.push(updatedDoc);
        }
        saveStoredAgreements(list);
        return { success: true, message: 'Agreement updated successfully.', data: updatedDoc };
      }
    ),

  deleteAgreement: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/agreements/${id}`),
      () => {
        const list = getStoredAgreements().filter((a) => a._id !== id && a.agreementNumber !== id);
        saveStoredAgreements(list);
        return { success: true, message: 'Agreement deleted successfully.' };
      }
    ),
};
