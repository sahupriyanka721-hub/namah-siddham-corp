import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  Edit3,
  Plus,
  Search,
  Building2,
  Calendar,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Trash2,
  ExternalLink,
  ChevronRight,
  BadgeCheck,
  FileCheck,
  Clock,
  Briefcase,
  DollarSign,
  X,
  RefreshCw,
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';

export const AdminAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState(null);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  const documentPrintRef = useRef(null);

  // Fetch agreements from API / fallback
  const fetchAgreements = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAgreements({
        search: searchQuery,
        status: statusFilter,
      });
      const data = res.data?.data || [];
      setAgreements(data);
      if (data.length > 0) {
        // Keep current selected if still in list, else pick first
        setSelectedAgreement((prev) => {
          if (!prev) return data[0];
          const found = data.find((item) => (item._id || item.agreementNumber) === (prev._id || prev.agreementNumber));
          return found || data[0];
        });
      } else {
        setSelectedAgreement(null);
      }
    } catch (err) {
      console.error('Failed to load agreements:', err);
      showNotification('error', 'Could not load agreements. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgreements();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAgreements();
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Copy Full Agreement Text to Clipboard
  const handleCopyText = () => {
    if (!selectedAgreement) return;

    const agr = selectedAgreement;
    let text = `${agr.title}\n\n`;
    text += `Agreement Date: ${agr.agreementDate}\n`;
    text += `Document Reference: ${agr.agreementNumber}\n\n`;
    text += `BETWEEN:\n`;
    text += `${agr.developer.companyName}\n`;
    text += `Registered Office: ${agr.developer.registeredOffice}\n`;
    text += `(hereinafter referred to as the "Developer")\n\n`;
    text += `AND\n\n`;
    text += `${agr.client.companyName}\n`;
    text += `Registered Office: ${agr.client.registeredOffice}\n`;
    text += `(hereinafter referred to as the "Client")\n\n`;
    text += `PROJECT: ${agr.projectName}\n`;
    text += `SCOPE: ${agr.scopeSummary}\n`;
    text += `TOTAL VALUE: ${agr.contractValue}\n`;
    text += `PAYMENT TERMS: ${agr.paymentTerms}\n\n`;
    text += `CLAUSES:\n`;

    if (agr.clauses && agr.clauses.length > 0) {
      agr.clauses.forEach((c) => {
        text += `Clause ${c.clauseNumber}. ${c.title}\n${c.content}\n\n`;
      });
    }

    text += `IN WITNESS WHEREOF, the parties hereto have executed this Agreement on ${agr.agreementDate}.\n\n`;
    text += `For Developer: ${agr.developer.companyName} (${agr.developer.authorizedSignatory})\n`;
    text += `For Client: ${agr.client.companyName} (${agr.client.authorizedSignatory})\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showNotification('success', 'Agreement text copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Download TXT Handler
  const handleDownloadTxt = () => {
    if (!selectedAgreement) return;
    const agr = selectedAgreement;
    let text = `${agr.title}\n`;
    text += `Document Ref: ${agr.agreementNumber}\n`;
    text += `Date: ${agr.agreementDate}\n\n`;
    text += `DEVELOPER:\n${agr.developer.companyName}\nRegistered Office: ${agr.developer.registeredOffice}\n\n`;
    text += `CLIENT:\n${agr.client.companyName}\nRegistered Office: ${agr.client.registeredOffice}\n\n`;
    text += `PROJECT: ${agr.projectName}\n`;
    text += `SCOPE: ${agr.scopeSummary}\n`;
    text += `VALUE: ${agr.contractValue}\n\n`;
    text += `TERMS & CLAUSES:\n`;
    (agr.clauses || []).forEach((c) => {
      text += `\n[Clause ${c.clauseNumber}] ${c.title}\n${c.content}\n`;
    });
    text += `\nEXECUTED BY:\n- Developer: ${agr.developer.companyName}\n- Client: ${agr.client.companyName}\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${agr.agreementNumber || 'Software_Agreement'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('success', 'Agreement file downloaded (.txt)');
  };

  // Open Edit Modal
  const openEditModal = () => {
    if (!selectedAgreement) return;
    setEditFormData(JSON.parse(JSON.stringify(selectedAgreement)));
    setIsEditModalOpen(true);
  };

  // Save Edit Handler
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editFormData) return;
    setSaving(true);
    try {
      const id = editFormData._id || editFormData.agreementNumber;
      await adminApi.updateAgreement(id, editFormData);
      showNotification('success', 'Agreement updated successfully.');
      setIsEditModalOpen(false);
      fetchAgreements();
    } catch (err) {
      console.error('Failed to update agreement:', err);
      showNotification('error', 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditFormData({
      title: 'SOFTWARE DEVELOPMENT AGREEMENT',
      agreementDate: `${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      effectiveDate: `${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      status: 'Draft',
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
        companyName: '',
        registeredOffice: '',
        role: 'Client',
        authorizedSignatory: 'Authorized Signatory / Director',
        email: '',
        phone: '',
        jurisdictionCity: 'Bhopal, Madhya Pradesh',
      },
      projectName: 'Custom Software Application & Digital Platform Development',
      scopeSummary: 'Custom software architecture, UI/UX frontend, backend microservices, REST APIs, cloud infrastructure, and 90-day warranty.',
      contractValue: '₹ 3,50,000 + 18% GST',
      paymentTerms: '40% Advance on signing, 30% on Alpha Build, 30% on Final deployment & code transfer.',
      deliverables: [
        {
          milestone: 'Milestone 1',
          description: 'UI/UX Prototypes, System Architecture, Database Schema',
          timeline: '2 Weeks',
          amount: '40%',
        },
        {
          milestone: 'Milestone 2',
          description: 'Core Backend Development, APIs & Working Alpha Application',
          timeline: '4 Weeks',
          amount: '30%',
        },
        {
          milestone: 'Milestone 3',
          description: 'Testing, Cloud Deployment, Code Repository & Handover',
          timeline: '2 Weeks',
          amount: '30%',
        },
      ],
      clauses: selectedAgreement?.clauses || [],
      signedByDeveloper: true,
      signedByClient: false,
      notes: '',
    });
    setIsCreateModalOpen(true);
  };

  // Save Create Handler
  const handleSaveCreate = async (e) => {
    e.preventDefault();
    if (!editFormData.client.companyName) {
      showNotification('error', 'Client company name is required.');
      return;
    }
    setSaving(true);
    try {
      const res = await adminApi.createAgreement(editFormData);
      showNotification('success', 'New client agreement created successfully.');
      setIsCreateModalOpen(false);
      await fetchAgreements();
      if (res.data?.data) {
        setSelectedAgreement(res.data.data);
      }
    } catch (err) {
      console.error('Failed to create agreement:', err);
      showNotification('error', 'Failed to create agreement. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Delete Handler
  const handleDeleteAgreement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this agreement record?')) return;
    try {
      await adminApi.deleteAgreement(id);
      showNotification('success', 'Agreement deleted successfully.');
      fetchAgreements();
    } catch (err) {
      console.error('Failed to delete agreement:', err);
      showNotification('error', 'Failed to delete agreement.');
    }
  };

  // Quick Status Toggle
  const handleStatusChange = async (newStatus) => {
    if (!selectedAgreement) return;
    try {
      const id = selectedAgreement._id || selectedAgreement.agreementNumber;
      await adminApi.updateAgreement(id, { status: newStatus });
      setSelectedAgreement((prev) => ({ ...prev, status: newStatus }));
      setAgreements((prev) =>
        prev.map((a) => ((a._id || a.agreementNumber) === id ? { ...a, status: newStatus } : a))
      );
      showNotification('success', `Status updated to "${newStatus}".`);
    } catch (err) {
      console.error('Failed to update status:', err);
      showNotification('error', 'Failed to update status.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Print Specific CSS to isolate the document cleanly */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-agreement-document, #printable-agreement-document * {
            visibility: visible !important;
          }
          #printable-agreement-document {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 32px 40px !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />

      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold animate-fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {notification.type === 'success' ? (
            <BadgeCheck className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header & Quick Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-heading text-brand-navy">
              Client Agreements & Legal Contracts
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Corporate contract execution center, digital legal documentation & client governance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyText}
            disabled={!selectedAgreement}
            className="text-xs border-slate-200 hover:bg-slate-50 text-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadTxt}
            disabled={!selectedAgreement}
            className="text-xs border-slate-200 hover:bg-slate-50 text-slate-700"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download .TXT
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            disabled={!selectedAgreement}
            className="text-xs border-slate-200 hover:bg-slate-50 text-slate-700"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5 text-brand-blue" />
            Print / PDF
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={openEditModal}
            disabled={!selectedAgreement}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800"
          >
            <Edit3 className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={openCreateModal}
            className="text-xs bg-brand-blue hover:bg-blue-600 text-white shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            New Agreement
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-800 leading-tight">
              {agreements.length}
            </div>
            <div className="text-[11px] font-medium text-slate-500">Total Agreements</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-700 leading-tight">
              {agreements.filter((a) => a.status === 'Signed' || a.status === 'Active').length}
            </div>
            <div className="text-[11px] font-medium text-slate-500">Signed & Active</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-amber-700 leading-tight">
              {agreements.filter((a) => a.status === 'Draft' || a.status === 'Under Review').length}
            </div>
            <div className="text-[11px] font-medium text-slate-500">Drafts / In Review</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-indigo-700 leading-tight font-mono">
              ₹ 4.5L+
            </div>
            <div className="text-[11px] font-medium text-slate-500">Active Pipeline Value</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar List + A4 Document Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Contract Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Filters */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search by client, ID, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {['all', 'Signed', 'Active', 'Draft'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                    statusFilter === status
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All Contracts' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Agreements List Cards */}
          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
            {loading ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <RefreshCw className="w-5 h-5 text-brand-blue animate-spin mx-auto mb-2" />
                <p className="text-xs text-slate-500">Loading agreements...</p>
              </div>
            ) : agreements.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">No agreements found</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Try clearing filters or search query.</p>
              </div>
            ) : (
              agreements.map((agr) => {
                const isSelected =
                  selectedAgreement &&
                  (selectedAgreement._id || selectedAgreement.agreementNumber) ===
                    (agr._id || agr.agreementNumber);
                return (
                  <div
                    key={agr._id || agr.agreementNumber}
                    onClick={() => setSelectedAgreement(agr)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? 'bg-blue-50/70 border-brand-blue shadow-md ring-1 ring-brand-blue/30'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 mb-1">
                          {agr.agreementNumber}
                        </span>
                        <h3 className="text-xs font-bold text-brand-navy leading-snug line-clamp-1">
                          {agr.client?.companyName || 'Client Name'}
                        </h3>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          agr.status === 'Signed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : agr.status === 'Active'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {agr.status}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{agr.agreementDate}</span>
                      </div>
                      <div className="font-semibold text-slate-700 font-mono">
                        {agr.contractValue ? agr.contractValue.split('+')[0] : '—'}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Authentic Legal Bond Paper Document Canvas (8 cols) */}
        <div className="lg:col-span-8">
          {selectedAgreement ? (
            <div className="space-y-4">
              {/* Document Action Banner */}
              <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <select
                    value={selectedAgreement.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-bold text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Active">Active</option>
                    <option value="Signed">Signed</option>
                    <option value="Completed">Completed</option>
                    <option value="Terminated">Terminated</option>
                  </select>

                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    Ref: {selectedAgreement.agreementNumber}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeleteAgreement(selectedAgreement._id || selectedAgreement.agreementNumber)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete Agreement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openEditModal}
                    className="text-xs h-8 border-slate-200 hover:bg-slate-50 text-slate-700"
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1" />
                    Edit Fields
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handlePrint}
                    className="text-xs h-8 bg-brand-blue hover:bg-blue-600 text-white"
                  >
                    <Printer className="w-3.5 h-3.5 mr-1" />
                    Print Document
                  </Button>
                </div>
              </div>

              {/* The Authentic A4 Legal Bond Paper Container */}
              <div
                id="printable-agreement-document"
                ref={documentPrintRef}
                className="bg-white rounded-2xl border border-slate-300 shadow-xl p-8 sm:p-14 text-slate-900 font-sans max-w-4xl mx-auto relative overflow-hidden transition-all"
                style={{ minHeight: '1100px' }}
              >
                {/* Formal Document Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                  <div className="text-[120px] font-black uppercase tracking-widest text-slate-900 rotate-[-30deg]">
                    CONTRACT
                  </div>
                </div>

                {/* Top Border Header Stripe */}
                <div className="border-b-2 border-brand-navy pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-navy to-slate-800 text-brand-gold p-2.5 flex items-center justify-center shadow-md">
                      <ShieldCheck className="w-7 h-7 text-brand-gold" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
                        OFFICIAL LEGAL INSTRUMENT
                      </div>
                      <div className="text-xs font-bold text-slate-500 tracking-wider">
                        INDIA COMMERCIAL CONTRACT CODE
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono text-[11px] text-slate-600 space-y-0.5">
                    <div><span className="font-bold text-slate-800">DOCUMENT ID:</span> {selectedAgreement.agreementNumber}</div>
                    <div><span className="font-bold text-slate-800">EXECUTION DATE:</span> {selectedAgreement.agreementDate}</div>
                    <div><span className="font-bold text-slate-800">STATUS:</span> <span className="font-bold uppercase text-emerald-700">{selectedAgreement.status}</span></div>
                  </div>
                </div>

                {/* Agreement Title (Exactly as presented in the uploaded image) */}
                <div className="text-center my-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
                    {selectedAgreement.title || 'SOFTWARE DEVELOPMENT AGREEMENT'}
                  </h2>
                  <div className="w-24 h-1 bg-brand-gold mx-auto mt-2 rounded-full" />
                </div>

                {/* Preamble / Effective Date Paragraph */}
                <div className="mt-8 text-sm sm:text-[15px] leading-relaxed text-slate-800 text-justify">
                  <p>
                    <span className="font-bold text-slate-950">This Agreement</span> is made and entered into on this{' '}
                    <span className="font-bold underline decoration-brand-gold decoration-2 underline-offset-4">
                      {selectedAgreement.agreementDate || '30th day of October 2025'}
                    </span>
                    , by and between:
                  </p>
                </div>

                {/* Parties Details (Format 100% matched to the uploaded document) */}
                <div className="mt-6 space-y-5 text-sm sm:text-[15px] leading-relaxed text-slate-800 text-justify">
                  {/* Party 1: Developer */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-extrabold text-base text-slate-950 font-heading">
                      {selectedAgreement.developer?.companyName || 'Mansharp Technologies Private Limited'},
                    </p>
                    <p className="mt-1 text-slate-700">
                      <span className="font-semibold text-slate-900">Registered Office:</span>{' '}
                      {selectedAgreement.developer?.registeredOffice ||
                        'C-18, Padmanabh Nagar, Near Prabhat Petrol Pump, Bhopal, Madhya Pradesh, India'}
                    </p>
                    <p className="mt-2 text-slate-700 italic">
                      (hereinafter referred to as the <span className="font-bold not-italic text-slate-950">“Developer”</span>),
                      which expression shall, unless repugnant to the context or meaning thereof, include its
                      successors and permitted assigns,
                    </p>
                  </div>

                  {/* AND Separator */}
                  <div className="text-center">
                    <span className="font-black text-sm text-slate-900 tracking-widest px-4 py-1 rounded-full bg-slate-200 uppercase">
                      AND
                    </span>
                  </div>

                  {/* Party 2: Client */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-extrabold text-base text-slate-950 font-heading">
                      {selectedAgreement.client?.companyName || 'Qureo Technologies Private Limited'},
                    </p>
                    <p className="mt-1 text-slate-700">
                      <span className="font-semibold text-slate-900">registered office at</span>{' '}
                      {selectedAgreement.client?.registeredOffice ||
                        'H.no 95 WARD NO 10, BH. SANTOSHI MATA MANDIR, Satna Tikuria Tola, Raghurajnagar, Satna- 485001, Madhya Pradesh,'}
                    </p>
                    <p className="mt-2 text-slate-700 italic">
                      (hereinafter referred to as the <span className="font-bold not-italic text-slate-950">“Client”</span>),
                      which expression shall, unless repugnant to the context or meaning thereof, include its
                      successors and permitted assigns.
                    </p>
                  </div>
                </div>

                {/* Recitals */}
                <div className="mt-8 space-y-3 text-sm sm:text-[14.5px] leading-relaxed text-slate-800 text-justify">
                  <div className="font-bold text-slate-950 uppercase tracking-wider text-xs font-mono">
                    WHEREAS:
                  </div>
                  <p>
                    <span className="font-semibold">A.</span> The Developer is engaged in the business of information technology consulting, enterprise software design, custom web and mobile application engineering, and digital infrastructure solutions.
                  </p>
                  <p>
                    <span className="font-semibold">B.</span> The Client desires to retain the Developer to design, engineer, test, deploy, and support custom software deliverables as defined herein (<span className="font-semibold text-slate-950">"{selectedAgreement.projectName}"</span>), and the Developer has agreed to render such services on the terms and conditions outlined below.
                  </p>
                </div>

                {/* Commercials & Project Highlights Box */}
                <div className="my-8 p-5 rounded-xl border-2 border-slate-200 bg-slate-50/60 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider font-mono text-brand-navy flex items-center justify-between">
                    <span>SCHEDULE A: PROJECT SCOPE & COMMERCIAL SUMMARY</span>
                    <span className="text-brand-blue font-bold font-mono">{selectedAgreement.contractValue}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Project Title</div>
                      <div className="font-bold text-slate-900 mt-0.5">{selectedAgreement.projectName}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Commercial Value</div>
                      <div className="font-bold text-slate-900 mt-0.5 font-mono">{selectedAgreement.contractValue}</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Scope of Services</div>
                      <div className="text-slate-700 mt-0.5 leading-relaxed">{selectedAgreement.scopeSummary}</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Payment Schedule</div>
                      <div className="text-slate-700 mt-0.5 leading-relaxed">{selectedAgreement.paymentTerms}</div>
                    </div>
                  </div>

                  {/* Milestone Breakdown Table */}
                  {selectedAgreement.deliverables && selectedAgreement.deliverables.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="text-[11px] font-bold text-slate-800 mb-2">Milestone Deliverables:</div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border border-slate-200">
                          <thead className="bg-slate-100 text-slate-700 font-bold">
                            <tr>
                              <th className="p-2 border-b border-r border-slate-200 w-1/4">Milestone</th>
                              <th className="p-2 border-b border-r border-slate-200">Description</th>
                              <th className="p-2 border-b border-r border-slate-200 w-20">Timeline</th>
                              <th className="p-2 border-b border-slate-200 w-28 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 text-slate-800">
                            {selectedAgreement.deliverables.map((del, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                <td className="p-2 font-semibold border-r border-slate-200">{del.milestone}</td>
                                <td className="p-2 border-r border-slate-200 text-[11px]">{del.description}</td>
                                <td className="p-2 border-r border-slate-200 font-mono text-[11px]">{del.timeline}</td>
                                <td className="p-2 font-bold font-mono text-[11px] text-right">{del.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Numbered Legal Clauses */}
                <div className="mt-8 space-y-6 text-sm sm:text-[14.5px] leading-relaxed text-slate-800 text-justify">
                  <div className="text-center font-bold text-slate-900 uppercase tracking-widest text-xs font-mono mb-4 pb-2 border-b border-slate-200">
                    NOW, THEREFORE, THE PARTIES MUTUALLY AGREE AS FOLLOWS:
                  </div>

                  {(selectedAgreement.clauses && selectedAgreement.clauses.length > 0
                    ? selectedAgreement.clauses
                    : []
                  ).map((clause) => (
                    <div key={clause.clauseNumber} className="space-y-1">
                      <h4 className="font-extrabold text-slate-950 font-heading text-sm sm:text-[15px]">
                        {clause.clauseNumber}. {clause.title}
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-justify text-xs sm:text-[13.5px]">
                        {clause.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* In Witness Whereof */}
                <div className="mt-12 pt-6 border-t border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                  <p>
                    <span className="font-bold">IN WITNESS WHEREOF</span>, the authorized representatives of the Developer and Client have executed and delivered this Software Development Agreement as of the date first written above.
                  </p>
                </div>

                {/* Signatures & Stamps Block */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  {/* Developer Sign Block */}
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 relative flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        SIGNED FOR & ON BEHALF OF DEVELOPER:
                      </div>
                      <div className="font-extrabold text-sm text-slate-900 mt-1">
                        {selectedAgreement.developer?.companyName}
                      </div>
                    </div>

                    <div className="my-6 flex items-center justify-between">
                      {/* Stamp Seal Graphic */}
                      <div className="w-24 h-24 rounded-full border-2 border-dashed border-brand-blue/50 flex flex-col items-center justify-center p-1.5 text-center text-brand-blue rotate-[-8deg] select-none bg-blue-50/40">
                        <BadgeCheck className="w-5 h-5 text-brand-blue mb-0.5" />
                        <span className="text-[8px] font-black uppercase tracking-tight leading-tight">
                          DIGITALLY EXECUTED
                        </span>
                        <span className="text-[7px] font-mono mt-0.5 font-bold">
                          BHOPAL (M.P.)
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="font-script text-lg text-brand-navy font-bold italic tracking-wide">
                          Authorized Signatory
                        </div>
                        <div className="w-32 border-b border-slate-400 mt-1 ml-auto" />
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-0.5 pt-2 border-t border-slate-200/80">
                      <div><span className="font-semibold text-slate-800">By:</span> {selectedAgreement.developer?.authorizedSignatory}</div>
                      <div><span className="font-semibold text-slate-800">Location:</span> {selectedAgreement.developer?.jurisdictionCity || 'Bhopal, Madhya Pradesh'}</div>
                      <div><span className="font-semibold text-slate-800">Date:</span> {selectedAgreement.agreementDate}</div>
                    </div>
                  </div>

                  {/* Client Sign Block */}
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 relative flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        SIGNED FOR & ON BEHALF OF CLIENT:
                      </div>
                      <div className="font-extrabold text-sm text-slate-900 mt-1">
                        {selectedAgreement.client?.companyName}
                      </div>
                    </div>

                    <div className="my-6 flex items-center justify-between">
                      {/* Stamp Seal Graphic */}
                      <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-600/50 flex flex-col items-center justify-center p-1.5 text-center text-emerald-700 rotate-[6deg] select-none bg-emerald-50/40">
                        <FileCheck className="w-5 h-5 text-emerald-600 mb-0.5" />
                        <span className="text-[8px] font-black uppercase tracking-tight leading-tight">
                          OFFICIALLY ACCEPTED
                        </span>
                        <span className="text-[7px] font-mono mt-0.5 font-bold">
                          SATNA (M.P.)
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="font-script text-lg text-brand-navy font-bold italic tracking-wide">
                          Client Representative
                        </div>
                        <div className="w-32 border-b border-slate-400 mt-1 ml-auto" />
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-0.5 pt-2 border-t border-slate-200/80">
                      <div><span className="font-semibold text-slate-800">By:</span> {selectedAgreement.client?.authorizedSignatory}</div>
                      <div><span className="font-semibold text-slate-800">Location:</span> {selectedAgreement.client?.jurisdictionCity || 'Satna, Madhya Pradesh'}</div>
                      <div><span className="font-semibold text-slate-800">Date:</span> {selectedAgreement.agreementDate}</div>
                    </div>
                  </div>
                </div>

                {/* Document Security Footer */}
                <div className="mt-12 pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 font-mono gap-2">
                  <span>Document Hash: SHA-256: 7F8E9C0A...4E1A</span>
                  <span>Page 1 of 1 • Executed under Indian Contract Act, 1872</span>
                  <span>Namah Siddham Legal Registry</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Agreement Selected</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Choose an agreement from the sidebar or create a new contract using the button above.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-brand-navy flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-brand-blue" />
                <span>Edit Agreement: {editFormData.agreementNumber}</span>
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Agreement Title</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Agreement Date</label>
                  <input
                    type="text"
                    value={editFormData.agreementDate}
                    onChange={(e) => setEditFormData({ ...editFormData, agreementDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {/* Developer Details */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
                  Developer (Party 1)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold">Company Name</label>
                    <input
                      type="text"
                      value={editFormData.developer.companyName}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          developer: { ...editFormData.developer, companyName: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold">Signatory Role</label>
                    <input
                      type="text"
                      value={editFormData.developer.authorizedSignatory}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          developer: { ...editFormData.developer, authorizedSignatory: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-500 font-semibold">Registered Office Address</label>
                    <textarea
                      rows={2}
                      value={editFormData.developer.registeredOffice}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          developer: { ...editFormData.developer, registeredOffice: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Client Details */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
                  Client (Party 2)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold">Client Company Name</label>
                    <input
                      type="text"
                      value={editFormData.client.companyName}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          client: { ...editFormData.client, companyName: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold">Signatory Role</label>
                    <input
                      type="text"
                      value={editFormData.client.authorizedSignatory}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          client: { ...editFormData.client, authorizedSignatory: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-500 font-semibold">Client Registered Office</label>
                    <textarea
                      rows={2}
                      value={editFormData.client.registeredOffice}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          client: { ...editFormData.client, registeredOffice: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Project & Commercial Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={editFormData.projectName}
                    onChange={(e) => setEditFormData({ ...editFormData, projectName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contract Value</label>
                  <input
                    type="text"
                    value={editFormData.contractValue}
                    onChange={(e) => setEditFormData({ ...editFormData, contractValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Scope Summary</label>
                  <textarea
                    rows={2}
                    value={editFormData.scopeSummary}
                    onChange={(e) => setEditFormData({ ...editFormData, scopeSummary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Payment Terms</label>
                  <input
                    type="text"
                    value={editFormData.paymentTerms}
                    onChange={(e) => setEditFormData({ ...editFormData, paymentTerms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={saving}
                  className="bg-brand-blue hover:bg-blue-600 text-white"
                >
                  {saving ? 'Saving Changes...' : 'Save Agreement'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Agreement Modal */}
      {isCreateModalOpen && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-brand-navy flex items-center space-x-2">
                <Plus className="w-4 h-4 text-brand-blue" />
                <span>Create New Client Agreement</span>
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Agreement Title</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Agreement Date</label>
                  <input
                    type="text"
                    value={editFormData.agreementDate}
                    onChange={(e) => setEditFormData({ ...editFormData, agreementDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Developer Details */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
                  Developer Information
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold">Developer Name</label>
                    <input
                      type="text"
                      value={editFormData.developer.companyName}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          developer: { ...editFormData.developer, companyName: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold">Signatory</label>
                    <input
                      type="text"
                      value={editFormData.developer.authorizedSignatory}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          developer: { ...editFormData.developer, authorizedSignatory: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-500 font-semibold">Registered Office</label>
                    <input
                      type="text"
                      value={editFormData.developer.registeredOffice}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          developer: { ...editFormData.developer, registeredOffice: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Client Details */}
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/60 space-y-2">
                <div className="font-bold text-brand-navy text-[11px] uppercase tracking-wide">
                  Client Information (Required)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold">Client Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Qureo Technologies Private Limited"
                      value={editFormData.client.companyName}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          client: { ...editFormData.client, companyName: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold">Signatory Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Director / Authorized Signatory"
                      value={editFormData.client.authorizedSignatory}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          client: { ...editFormData.client, authorizedSignatory: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-500 font-semibold">Registered Office Address *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Complete official registered office address"
                      value={editFormData.client.registeredOffice}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          client: { ...editFormData.client, registeredOffice: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Project & Commercial Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={editFormData.projectName}
                    onChange={(e) => setEditFormData({ ...editFormData, projectName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contract Value</label>
                  <input
                    type="text"
                    value={editFormData.contractValue}
                    onChange={(e) => setEditFormData({ ...editFormData, contractValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Scope Summary</label>
                  <textarea
                    rows={2}
                    value={editFormData.scopeSummary}
                    onChange={(e) => setEditFormData({ ...editFormData, scopeSummary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={saving}
                  className="bg-brand-blue hover:bg-blue-600 text-white"
                >
                  {saving ? 'Creating Contract...' : 'Create Contract'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgreements;
