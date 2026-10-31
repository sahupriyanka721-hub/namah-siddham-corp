import express from 'express';
import {
  loginAdmin,
  sendAdminOtp,
  verifyAdminOtp,
  logoutAdmin,
  getMe,
  changePassword,
  updateProfile,
} from '../controllers/authController.js';
import { protectAdmin } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', authLimiter, loginAdmin);
router.post('/send-otp', authLimiter, sendAdminOtp);
router.post('/verify-otp', authLimiter, verifyAdminOtp);
router.post('/logout', logoutAdmin);
router.get('/me', protectAdmin, getMe);
router.put('/profile', protectAdmin, updateProfile);
router.post('/change-password', protectAdmin, changePassword);

export default router;
