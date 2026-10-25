import React, { useState } from 'react';
import { UserCircle, Lock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';

export const AdminProfile = () => {
  const { admin } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    if (newPassword.length < 8) {
      setStatusMessage({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    setSaving(true);
    try {
      await adminApi.changePassword({ currentPassword, newPassword });
      setStatusMessage({ type: 'success', text: 'Password updated successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update password.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading font-black text-2xl text-brand-navy tracking-tight">
          Admin Profile & Security
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review authenticated credentials and manage password security.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center space-x-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Account Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-base text-brand-navy border-b border-slate-200 pb-2">
          Administrator Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold text-brand-navy block">Name:</span>
            <span className="text-slate-700">{admin?.name || 'Administrator'}</span>
          </div>
          <div>
            <span className="font-bold text-brand-navy block">Email Identifier:</span>
            <span className="text-slate-700 font-mono">{admin?.email}</span>
          </div>
          <div>
            <span className="font-bold text-brand-navy block">Role:</span>
            <span className="capitalize font-semibold text-brand-gold">{admin?.role || 'Admin'}</span>
          </div>
          <div>
            <span className="font-bold text-brand-navy block">Last Login:</span>
            <span className="text-slate-500">
              {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Active Session'}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-base text-brand-navy border-b border-slate-200 pb-2">
          Change Secret Password
        </h3>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
              New Password (Min 8 characters) <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" loading={saving} icon={Lock}>
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
