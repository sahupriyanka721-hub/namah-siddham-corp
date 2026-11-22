import express from 'express';
import { upload } from '../middleware/upload.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Upload image (requires admin auth)
router.post('/image', protectAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  // Determine base host (Render, local, or custom domain)
  const isLocal = req.hostname === 'localhost' || req.hostname === '127.0.0.1';
  const protocol = req.headers['x-forwarded-proto'] || (isLocal ? req.protocol : 'https');
  const host = req.get('host') || 'namah-siddham-corp.onrender.com';
  const baseUrl = `${protocol}://${host}`;

  const relativePath = `/uploads/images/${req.file.filename}`;
  const fullUrl = `${baseUrl}${relativePath}`;

  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully.',
    url: fullUrl,
    relativePath,
    filename: req.file.filename,
    size: req.file.size,
  });
});

// Upload resume/document (used by job applicants or admin)
router.post('/document', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  const isLocal = req.hostname === 'localhost' || req.hostname === '127.0.0.1';
  const protocol = req.headers['x-forwarded-proto'] || (isLocal ? req.protocol : 'https');
  const host = req.get('host') || 'namah-siddham-corp.onrender.com';
  const baseUrl = `${protocol}://${host}`;

  const relativePath = `/uploads/documents/${req.file.filename}`;
  const fullUrl = `${baseUrl}${relativePath}`;

  res.status(200).json({
    success: true,
    message: 'Document uploaded successfully.',
    url: fullUrl,
    relativePath,
    filename: req.file.filename,
    size: req.file.size,
  });
});

export default router;
