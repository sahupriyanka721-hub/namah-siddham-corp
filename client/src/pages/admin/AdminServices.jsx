import React, { useState, useEffect } from 'react';
import {
  Code2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowUpDown,
  X,
  Globe,
  Smartphone,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notification, setNotification] = useState(null);

  // View Modal State (Read-only)
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingService, setViewingService] = useState(null);

  const initialForm = {
    title: '',
    slug: '',
    icon: 'Globe',
    shortDescription: '',
    detailedDescription: '',
    keyFeaturesText: '',
    deliverablesText: '',
    status: 'Published',
    isFeatured: true,
    displayOrder: 0,
    seoTitle: '',
    seoDescription: '',
  };

  const [form, setForm] = useState(initialForm);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getServices({ status: statusFilter, search: searchTerm });
      setServices(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadServices();
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title || '',
      slug: service.slug || '',
      icon: service.icon || 'Globe',
      shortDescription: service.shortDescription || '',
      detailedDescription: service.detailedDescription || '',
      keyFeaturesText: (service.keyFeatures || []).join('\n'),
      deliverablesText: (service.deliverables || []).join('\n'),
      status: service.status || 'Published',
      isFeatured: service.isFeatured ?? true,
      displayOrder: service.displayOrder || 0,
      seoTitle: service.seoTitle || '',
      seoDescription: service.seoDescription || '',
    });
    setModalOpen(true);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!editingId) {
      setForm((prev) => ({
        ...prev,
        title: val,
        slug: generateSlug(val),
      }));
    } else {
      setForm((prev) => ({ ...prev, title: val }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.shortDescription || !form.detailedDescription) {
      alert('Please fill in title, slug, short description, and detailed description.');
      return;
    }

    const payload = {
      ...form,
      keyFeatures: form.keyFeaturesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      deliverables: form.deliverablesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await adminApi.updateService(editingId, payload);
        setNotification({ type: 'success', message: 'Service updated successfully.' });
      } else {
        await adminApi.createService(payload);
        setNotification({ type: 'success', message: 'New IT service created.' });
      }
      setModalOpen(false);
      loadServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save service.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.deleteService(id);
      setDeleteConfirmId(null);
      setNotification({ type: 'success', message: 'Service deleted.' });
      loadServices();
    } catch (err) {
      alert('Failed to delete service.');
    }
  };

  const toggleStatus = async (service) => {
    const newStatus = service.status === 'Published' ? 'Draft' : 'Published';
    try {
      await adminApi.updateService(service._id, { status: newStatus });
      loadServices();
    } catch (err) {
      alert('Failed to toggle status.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-brand-navy flex items-center">
            <Code2 className="w-6 h-6 mr-2 text-brand-blue" />
            <span>IT Services Management</span>
          </h1>
          <p className="text-xs text-surface-500 mt-1">
            Manage Vertical 1 IT services, capabilities, deliverables, and public showcase.
          </p>
        </div>

        <Button
          onClick={openCreateModal}
          variant="primary"
          icon={Plus}
          className="text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-700 hover:to-brand-blue text-white shadow-xs"
        >
          Add New IT Service
        </Button>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs font-medium">
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-emerald-700 font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-surface-200 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearch} className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
          />
        </form>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-surface-400 font-bold uppercase font-mono">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-surface-200 text-xs font-medium bg-surface-50 text-brand-navy focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 text-surface-500 uppercase tracking-wider font-mono border-b border-surface-200">
              <tr>
                <th className="py-3.5 px-6">Service Name</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Icon</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-surface-400">
                    Loading service records...
                  </td>
                </tr>
              ) : services.length > 0 ? (
                services.map((s) => (
                  <tr key={s._id} className="hover:bg-surface-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-navy">
                      <div>{s.title}</div>
                      <div className="text-[11px] text-surface-400 font-normal line-clamp-1">
                        {s.shortDescription}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-brand-blue font-bold">{s.slug}</td>
                    <td className="py-4 px-4 text-surface-500 font-mono">{s.icon || 'Globe'}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleStatus(s)}
                        title="Click to toggle status"
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                          s.status === 'Published'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {s.status}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      {s.isFeatured ? (
                        <span className="text-[10px] font-bold text-brand-blue">Yes</span>
                      ) : (
                        <span className="text-[10px] text-surface-400">No</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setViewingService(s);
                          setViewModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-brand-navy hover:bg-surface-100 inline-block transition-colors"
                        title="View Service Details (Read Only)"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 rounded-lg text-brand-blue hover:bg-sky-50 inline-block"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(s._id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 inline-block"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-surface-400">
                    No services found. Click "Add New IT Service" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-soft-xl text-center">
            <h3 className="font-serif font-bold text-lg text-navy-900">Confirm Deletion</h3>
            <p className="text-xs text-surface-500">
              Are you sure you want to permanently remove this IT service? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-surface-200 text-surface-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B132B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 border border-surface-200 shadow-soft-xl">
            <div className="flex items-center justify-between border-b border-surface-200 pb-3">
              <h3 className="font-heading font-black text-lg text-brand-navy">
                {editingId ? 'Edit IT Service' : 'Add New IT Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-surface-400 hover:text-brand-navy p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Website Development"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="web-development"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Icon</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                  >
                    <option value="Globe">Globe (Web Development)</option>
                    <option value="Code2">Code2 (Software / ERP)</option>
                    <option value="Smartphone">Smartphone (Mobile Apps)</option>
                    <option value="TrendingUp">TrendingUp (Digital Marketing)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Display Order</label>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) =>
                      setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Summary for cards and preview..."
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={form.detailedDescription}
                  onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })}
                  placeholder="Full scope of service for detail page..."
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">
                  Key Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.keyFeaturesText}
                  onChange={(e) => setForm({ ...form, keyFeaturesText: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-brand-navy"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">
                  Typical Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.deliverablesText}
                  onChange={(e) => setForm({ ...form, deliverablesText: e.target.value })}
                  placeholder="Deliverable 1&#10;Deliverable 2"
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-brand-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                    placeholder="Custom meta title"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">SEO Description</label>
                  <input
                    type="text"
                    value={form.seoDescription}
                    onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                    placeholder="Custom meta description"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="rounded text-brand-blue focus:ring-brand-blue"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-brand-navy">
                  Feature on Homepage and Services Highlights
                </label>
              </div>

              <div className="pt-3 border-t border-surface-200 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-200 text-surface-700 text-xs font-semibold hover:bg-surface-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-700 hover:to-brand-blue text-white text-xs font-bold shadow-xs"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Service Details Modal (Read Only) */}
      {viewModalOpen && viewingService && (
        <div className="fixed inset-0 z-50 bg-[#0B132B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 border border-surface-200 shadow-soft-xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-surface-200 pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-50 text-brand-blue border border-blue-200">
                    Service Details (Read Only)
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                      viewingService.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {viewingService.status}
                  </span>
                  {viewingService.isFeatured && (
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      ★ Featured on Homepage
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-black text-xl text-brand-navy">
                  {viewingService.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-surface-500 font-mono">
                  <span>Slug: <strong className="text-brand-blue">{viewingService.slug}</strong></span>
                  <span>•</span>
                  <span>Icon: <strong className="text-brand-navy">{viewingService.icon || 'Globe'}</strong></span>
                  <span>•</span>
                  <span>Display Order: <strong className="text-brand-navy">{viewingService.displayOrder ?? 0}</strong></span>
                </div>
              </div>
              <button
                onClick={() => {
                  setViewModalOpen(false);
                  setViewingService(null);
                }}
                className="text-surface-400 hover:text-brand-navy p-1 text-sm font-bold rounded-lg hover:bg-surface-100 transition-colors"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Read-Only Form Fields */}
            <div className="space-y-4 text-xs">
              {/* Short Description */}
              <div className="bg-surface-50 p-4 rounded-2xl border border-surface-200">
                <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-1 font-mono">
                  Short Description
                </div>
                <p className="text-surface-700 leading-relaxed font-sans text-xs">
                  {viewingService.shortDescription || 'No short description provided.'}
                </p>
              </div>

              {/* Detailed Description */}
              <div className="bg-white p-4 rounded-2xl border border-surface-200">
                <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-1 font-mono">
                  Detailed Scope & Description
                </div>
                <p className="text-surface-700 leading-relaxed whitespace-pre-wrap font-sans text-xs">
                  {viewingService.detailedDescription || 'No detailed description provided.'}
                </p>
              </div>

              {/* Key Features & Deliverables Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-50 p-4 rounded-2xl border border-surface-200">
                  <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-2 font-mono flex items-center justify-between">
                    <span>Key Features</span>
                    <span className="text-[10px] text-brand-blue font-bold">
                      {(viewingService.keyFeatures || []).length} items
                    </span>
                  </div>
                  {viewingService.keyFeatures && viewingService.keyFeatures.length > 0 ? (
                    <ul className="space-y-1.5">
                      {viewingService.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-surface-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-surface-400 italic">No key features listed.</p>
                  )}
                </div>

                <div className="bg-surface-50 p-4 rounded-2xl border border-surface-200">
                  <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-2 font-mono flex items-center justify-between">
                    <span>Typical Deliverables</span>
                    <span className="text-[10px] text-brand-blue font-bold">
                      {(viewingService.deliverables || []).length} items
                    </span>
                  </div>
                  {viewingService.deliverables && viewingService.deliverables.length > 0 ? (
                    <ul className="space-y-1.5">
                      {viewingService.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-surface-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5"></span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-surface-400 italic">No deliverables listed.</p>
                  )}
                </div>
              </div>

              {/* SEO Meta */}
              <div className="bg-surface-50 p-4 rounded-2xl border border-surface-200">
                <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-2 font-mono">
                  SEO & Meta Information
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-surface-400 text-[10px] uppercase font-mono block">SEO Title:</span>
                    <span className="font-medium text-brand-navy">
                      {viewingService.seoTitle || viewingService.title || 'Default Title'}
                    </span>
                  </div>
                  <div>
                    <span className="text-surface-400 text-[10px] uppercase font-mono block">SEO Description:</span>
                    <span className="font-medium text-surface-700">
                      {viewingService.seoDescription || viewingService.shortDescription || 'Default Description'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-surface-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setViewModalOpen(false);
                  setViewingService(null);
                }}
                className="px-5 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 text-surface-700 text-xs font-semibold transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
