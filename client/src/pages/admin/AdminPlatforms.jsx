import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Search,
  Upload,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sparkles,
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const AdminPlatforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formError, setFormError] = useState(null);

  // View Modal State (Read-only)
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingPlatform, setViewingPlatform] = useState(null);

  const initialForm = {
    name: '',
    slug: '',
    category: '',
    shortDescription: '',
    detailedDescription: '',
    problemSolved: '',
    websiteUrl: '',
    keyFeaturesText: '',
    partnerOpportunitiesText: '',
    targetAudience: '',
    status: 'Under Development',
    displayOrder: 0,
    logoUrl: '',
    seoTitle: '',
    seoDescription: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchPlatforms = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getPlatforms({
        search,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      setPlatforms(res.data.data || []);
    } catch (err) {
      console.error('Failed to load platforms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, [search, statusFilter]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setFormData({
      name: p.name || '',
      slug: p.slug || '',
      category: p.category || '',
      shortDescription: p.shortDescription || '',
      detailedDescription: p.detailedDescription || '',
      problemSolved: p.problemSolved || '',
      websiteUrl: p.websiteUrl || '',
      keyFeaturesText: Array.isArray(p.keyFeatures)
        ? p.keyFeatures.join('\n')
        : (typeof p.keyFeatures === 'string' ? p.keyFeatures : ''),
      partnerOpportunitiesText: Array.isArray(p.partnerOpportunities)
        ? p.partnerOpportunities.join('\n')
        : (typeof p.partnerOpportunities === 'string' ? p.partnerOpportunities : ''),
      targetAudience: p.targetAudience || '',
      status: p.status || 'Under Development',
      displayOrder: p.displayOrder || 0,
      logoUrl: p.logoUrl || '',
      seoTitle: p.seoTitle || '',
      seoDescription: p.seoDescription || '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploadingLogo(true);
    try {
      const res = await adminApi.uploadImage(data);
      if (res.data?.url) {
        setFormData((prev) => ({ ...prev, logoUrl: res.data.url }));
      }
    } catch (err) {
      setFormError('Failed to upload logo image.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    try {
      const featuresArray = formData.keyFeaturesText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const partnerArray = formData.partnerOpportunitiesText
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        shortDescription: formData.shortDescription,
        detailedDescription: formData.detailedDescription,
        problemSolved: formData.problemSolved,
        websiteUrl: formData.websiteUrl,
        keyFeatures: featuresArray,
        partnerOpportunities: partnerArray,
        targetAudience: formData.targetAudience,
        status: formData.status,
        displayOrder: Number(formData.displayOrder) || 0,
        logoUrl: formData.logoUrl,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
      };

      if (editingId) {
        await adminApi.updatePlatform(editingId, payload);
      } else {
        await adminApi.createPlatform(payload);
      }

      setIsModalOpen(false);
      fetchPlatforms();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save digital product/platform.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete '${name}'?`)) {
      try {
        await adminApi.deletePlatform(id);
        fetchPlatforms();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete platform.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-brand-navy tracking-tight flex items-center">
            <Layers className="w-6 h-6 mr-2.5 text-brand-blue" />
            Digital Products & Aggregator Platforms
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage corporate platforms (HomeServixo, Carrento, Jainamshree, SuperiorMart) and control public availability status.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="primary" icon={Plus} size="sm">
          Add New Platform
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-brand-navy font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-medium text-brand-navy"
          >
            <option value="all">All Statuses</option>
            <option value="Live">Live</option>
            <option value="Under Development">Under Development</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Hidden">Hidden</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Platforms Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">Loading digital platforms...</div>
        ) : platforms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-brand-navy uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4 w-16">Order</th>
                  <th className="py-3.5 px-4">Platform Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Platform Status</th>
                  <th className="py-3.5 px-4">Official URL</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {platforms.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-navy">
                      {p.displayOrder}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        {p.logoUrl ? (
                          <img
                            src={p.logoUrl}
                            alt=""
                            className="w-9 h-9 rounded-lg object-contain border border-slate-200 p-1 bg-white"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-brand-navy text-brand-gold font-bold flex items-center justify-center text-xs shadow-inner">
                            {p.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-heading font-bold text-sm text-brand-navy">{p.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">/products/{p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-brand-blue">{p.category}</td>
                    <td className="py-3.5 px-4">
                      <Badge status={p.status}>{p.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.websiteUrl ? (
                        <a
                          href={p.websiteUrl.startsWith('http') ? p.websiteUrl : `https://${p.websiteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-blue hover:text-blue-800 font-medium inline-flex items-center"
                        >
                          <span className="truncate max-w-[150px]">{p.websiteUrl}</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setViewingPlatform(p);
                          setViewModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-brand-navy inline-block hover:bg-slate-100 transition-colors"
                        title="View Platform Details (Read Only)"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-brand-blue hover:bg-sky-50 inline-block font-semibold transition-colors"
                        title="Edit Details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 inline-block transition-colors"
                        title="Delete Platform"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-slate-400">
            No platforms found matching your criteria.
          </div>
        )}
      </div>

      {/* Add / Edit Platform Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Digital Platform' : 'Add New Digital Platform'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-800 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Platform Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. HomeServixo"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Slug (URL Identifier) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. homeservixo"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-brand-navy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Home Services and Appliance Repair"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Official Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://homeservixo.in"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-brand-navy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Availability Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-brand-navy"
              >
                <option value="Live">Live (Operational)</option>
                <option value="Under Development">Under Development</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Hidden">Hidden</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
              <p className="text-[10px] text-slate-500">
                Never mark Live unless fully operational.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Platform Logo
              </label>
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium hover:bg-slate-50 inline-flex items-center shadow-sm">
                  <Upload className="w-3.5 h-3.5 mr-1 text-brand-blue" />
                  <span>{uploadingLogo ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={uploadingLogo}
                  />
                </label>
                {formData.logoUrl && (
                  <span className="text-[11px] text-emerald-700 font-semibold truncate max-w-[110px]">
                    Image ready
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
              Short Description (Card Summary) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Concise 1-2 sentence description"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
              Problem Solved by Platform
            </label>
            <textarea
              rows={2}
              value={formData.problemSolved}
              onChange={(e) => setFormData({ ...formData, problemSolved: e.target.value })}
              placeholder="What core consumer or business pain point does this platform solve?"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
              Detailed Platform Overview <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              placeholder="Comprehensive description of platform operations, catalog, workflow..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Key Features (One per line)
              </label>
              <textarea
                rows={3}
                value={formData.keyFeaturesText}
                onChange={(e) => setFormData({ ...formData, keyFeaturesText: e.target.value })}
                placeholder="Verified Technicians&#10;Upfront Transparent Pricing&#10;Standard Service Warranty"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-xs text-brand-navy"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Partner Opportunities (One per line)
              </label>
              <textarea
                rows={3}
                value={formData.partnerOpportunitiesText}
                onChange={(e) => setFormData({ ...formData, partnerOpportunitiesText: e.target.value })}
                placeholder="Service Professionals&#10;Independent Workshop Owners&#10;Regional Distributors"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-xs text-brand-navy"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
              Target Audience
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="e.g. Homeowners, vehicle owners, retail shoppers, community merchants"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={saving}
            >
              {editingId ? 'Update Platform' : 'Create Platform'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Platform Details Modal (Read Only) */}
      <Modal
        isOpen={viewModalOpen && !!viewingPlatform}
        onClose={() => {
          setViewModalOpen(false);
          setViewingPlatform(null);
        }}
        title="Digital Platform Details (Read Only)"
        maxWidth="max-w-3xl"
      >
        {viewingPlatform && (
          <div className="space-y-5 text-xs">
            {/* Header / Identity Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-3">
                {viewingPlatform.logoUrl ? (
                  <img
                    src={viewingPlatform.logoUrl}
                    alt=""
                    className="w-12 h-12 rounded-xl object-contain border border-slate-200 p-1 bg-white shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-gold font-bold flex items-center justify-center text-sm shadow-inner">
                    {viewingPlatform.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-bold text-brand-navy font-heading">{viewingPlatform.name}</h4>
                    <Badge status={viewingPlatform.status}>{viewingPlatform.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 text-slate-500 font-mono text-[11px]">
                    <span className="text-brand-blue font-bold">{viewingPlatform.category || 'Platform'}</span>
                    <span>•</span>
                    <span>Slug: <strong>{viewingPlatform.slug}</strong></span>
                    <span>•</span>
                    <span>Display Order: <strong>{viewingPlatform.displayOrder ?? 0}</strong></span>
                  </div>
                </div>
              </div>

              {viewingPlatform.websiteUrl && (
                <a
                  href={viewingPlatform.websiteUrl.startsWith('http') ? viewingPlatform.websiteUrl : `https://${viewingPlatform.websiteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-brand-blue font-medium hover:bg-slate-50 transition-colors flex items-center space-x-1.5 shadow-2xs text-[11px]"
                >
                  <span className="truncate max-w-[180px]">{viewingPlatform.websiteUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              )}
            </div>

            {/* Target Audience & Problem Solved */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-1 font-mono">
                  Target Audience
                </div>
                <p className="text-slate-700 font-medium">
                  {viewingPlatform.targetAudience || 'Not specified'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-1 font-mono">
                  Problem Solved
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {viewingPlatform.problemSolved || 'Not specified'}
                </p>
              </div>
            </div>

            {/* Short Description */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-1 font-mono">
                Short Description
              </div>
              <p className="text-slate-700 leading-relaxed font-sans">
                {viewingPlatform.shortDescription || 'No short description provided.'}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-1 font-mono">
                Detailed Platform Overview
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                {viewingPlatform.detailedDescription || 'No detailed description provided.'}
              </p>
            </div>

            {/* Key Features & Partner Opportunities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-2 font-mono flex items-center justify-between">
                  <span>Key Features & Modules</span>
                </div>
                {Array.isArray(viewingPlatform.keyFeatures) && viewingPlatform.keyFeatures.length > 0 ? (
                  <ul className="space-y-1.5">
                    {viewingPlatform.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                ) : typeof viewingPlatform.keyFeatures === 'string' && viewingPlatform.keyFeatures.trim() ? (
                  <p className="text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">{viewingPlatform.keyFeatures}</p>
                ) : (
                  <p className="text-slate-400 italic">No features listed.</p>
                )}
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-2 font-mono flex items-center justify-between">
                  <span>Partner & Business Opportunities</span>
                </div>
                {Array.isArray(viewingPlatform.partnerOpportunities) && viewingPlatform.partnerOpportunities.length > 0 ? (
                  <ul className="space-y-1.5">
                    {viewingPlatform.partnerOpportunities.map((opp, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-1.5"></span>
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                ) : typeof viewingPlatform.partnerOpportunities === 'string' && viewingPlatform.partnerOpportunities.trim() ? (
                  <p className="text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">{viewingPlatform.partnerOpportunities}</p>
                ) : (
                  <p className="text-slate-400 italic">No partner opportunities listed.</p>
                )}
              </div>
            </div>

            {/* SEO Information */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-2 font-mono">
                SEO & Meta Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">SEO Title:</span>
                  <span className="font-medium text-brand-navy">
                    {viewingPlatform.seoTitle || viewingPlatform.name || 'Default Title'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">SEO Description:</span>
                  <span className="font-medium text-slate-700">
                    {viewingPlatform.seoDescription || viewingPlatform.shortDescription || 'Default Description'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setViewModalOpen(false);
                  setViewingPlatform(null);
                }}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPlatforms;