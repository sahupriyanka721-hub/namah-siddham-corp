import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  CheckCircle2,
  AlertCircle,
  Camera,
  Trash2,
  Edit2,
  X,
  Check,
  User,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';

export const AdminProfile = () => {
  const { admin, updateAdminProfile } = useAuth();
  const fileInputRef = useRef(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    phone: admin?.phone || '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  // Global notification banner
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    if (admin) {
      setProfileForm({
        name: admin.name || '',
        email: admin.email || '',
        phone: admin.phone || '',
      });
    }
  }, [admin]);

  // Handle Profile Photo selection
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be re-selected if needed
    e.target.value = '';

    // Validate type
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ type: 'error', text: 'Please choose an image file (JPG, PNG, WEBP).' });
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({ type: 'error', text: 'Image size should not exceed 5MB.' });
      return;
    }

    setStatusMessage(null);
    setUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const uploadRes = await adminApi.uploadImage(formData);
      const newAvatarUrl = uploadRes.url;

      // Persist to admin profile
      await adminApi.updateProfile({ avatarUrl: newAvatarUrl });
      updateAdminProfile({ avatarUrl: newAvatarUrl });

      setStatusMessage({ type: 'success', text: 'Profile photo updated successfully.' });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to upload profile photo.',
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Remove Profile Photo
  const handleRemoveAvatar = async () => {
    if (!window.confirm('Are you sure you want to remove your profile photo?')) return;

    setStatusMessage(null);
    setUploadingAvatar(true);
    try {
      await adminApi.updateProfile({ avatarUrl: '' });
      updateAdminProfile({ avatarUrl: '' });
      setStatusMessage({ type: 'success', text: 'Profile photo removed.' });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to remove profile photo.',
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Save profile information
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!profileForm.name.trim()) {
      setStatusMessage({ type: 'error', text: 'Administrator name cannot be empty.' });
      return;
    }

    if (!profileForm.email.trim()) {
      setStatusMessage({ type: 'error', text: 'Email identifier cannot be empty.' });
      return;
    }

    setSavingProfile(true);
    try {
      const res = await adminApi.updateProfile(profileForm);
      const updated = res.data?.admin || {
        ...admin,
        ...profileForm,
      };
      updateAdminProfile(updated);
      setIsEditingProfile(false);
      setStatusMessage({ type: 'success', text: 'Administrator information saved successfully.' });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update administrator profile.',
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    setProfileForm({
      name: admin?.name || '',
      email: admin?.email || '',
      phone: admin?.phone || '',
    });
    setIsEditingProfile(false);
  };

  // Password change submission
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

    setSavingPassword(true);
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
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading font-black text-2xl text-brand-navy tracking-tight">
          Admin Profile & Security
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage administrator profile details, avatar photo, and account security.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center space-x-2.5 transition-all ${
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
          <span className="font-medium">{statusMessage.text}</span>
        </div>
      )}

      {/* Administrator Information Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-heading font-bold text-lg text-brand-navy">
                Administrator Information
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-brand-gold/15 text-amber-800 uppercase border border-brand-gold/30">
                {admin?.role || 'Superadmin'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Personal credentials and profile photo for corporate portal access.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditingProfile ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={Edit2}
                onClick={() => setIsEditingProfile(true)}
              >
                Edit Details
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={X}
                onClick={handleCancelEdit}
                disabled={savingProfile}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Profile Avatar & Details Section */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 pt-2">
          {/* Left: Profile Photo Avatar with Upload / Remove */}
          <div className="flex flex-col items-center sm:items-start space-y-3 shrink-0">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-slate-100 shadow-md bg-gradient-to-tr from-brand-navy via-brand-blue to-blue-500 flex items-center justify-center text-white relative">
                {admin?.avatarUrl ? (
                  <img
                    src={admin.avatarUrl}
                    alt={admin.name || 'Admin'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <User className="w-12 h-12 text-white/90" />
                    <span className="text-[10px] font-bold tracking-wider uppercase mt-1 text-white/80">
                      {admin?.role || 'Admin'}
                    </span>
                  </div>
                )}

                {/* Upload spinner overlay */}
                {uploadingAvatar && (
                  <div className="absolute inset-0 bg-brand-navy/70 backdrop-blur-xs flex flex-col items-center justify-center text-white text-[10px] font-bold">
                    <Loader2 className="w-6 h-6 animate-spin text-white mb-1" />
                    <span>Saving...</span>
                  </div>
                )}
              </div>

              {/* Quick Camera action button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                title="Change Profile Photo"
                className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-brand-blue hover:bg-blue-700 text-white shadow-md ring-2 ring-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />

            {/* Avatar buttons & note */}
            <div className="flex flex-col items-center sm:items-start space-y-1.5 text-center sm:text-left">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="text-xs font-bold text-brand-blue hover:underline cursor-pointer inline-flex items-center"
                >
                  <Camera className="w-3 h-3 mr-1" />
                  {admin?.avatarUrl ? 'Change Photo' : 'Upload Photo'}
                </button>

                {admin?.avatarUrl && (
                  <>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      disabled={uploadingAvatar}
                      className="text-xs font-semibold text-red-600 hover:underline cursor-pointer inline-flex items-center"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove
                    </button>
                  </>
                )}
              </div>
              <p className="text-[10px] text-slate-400">JPG, PNG or WEBP (Max 5MB)</p>
            </div>
          </div>

          {/* Right: Details / Edit Form */}
          <div className="flex-1 w-full">
            {!isEditingProfile ? (
              /* VIEW MODE */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                    Full Name:
                  </span>
                  <div className="font-bold text-brand-navy text-sm">
                    {admin?.name || 'Chief Administrator'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                    Email Identifier:
                  </span>
                  <div className="font-mono text-slate-800 text-xs sm:text-sm font-semibold break-all">
                    {admin?.email || 'admin@namahsiddham.com'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                    Contact Mobile:
                  </span>
                  <div className="font-mono text-slate-800 text-xs sm:text-sm font-semibold">
                    {admin?.phone ? `+91 ${admin.phone}` : '+91 8319955741'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                    Administrative Role:
                  </span>
                  <div className="capitalize font-semibold text-brand-gold flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{admin?.role || 'Superadmin'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                    Account Status:
                  </span>
                  <div className="text-emerald-700 font-semibold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active & Verified</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                    Last Authenticated:
                  </span>
                  <div className="text-slate-600 text-[11px] flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>
                      {admin?.lastLogin
                        ? new Date(admin.lastLogin).toLocaleString()
                        : 'Active Session'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* EDIT MODE */
              <form onSubmit={handleProfileSubmit} className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Administrator Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="e.g. Chief Administrator"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy font-medium shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Email Identifier <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="admin@namahsiddham.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy font-mono shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Mobile Number (For OTP Login)
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="e.g. 8319955741"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-navy font-mono shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Role (Security Tier)
                    </label>
                    <div className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-semibold cursor-not-allowed">
                      Superadmin (Managed by System Security)
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    disabled={savingProfile}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    loading={savingProfile}
                    icon={Check}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
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
            <Button type="submit" variant="primary" loading={savingPassword} icon={Lock}>
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
