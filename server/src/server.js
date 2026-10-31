import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { ENV } from './config/env.js';
import { connectDB, getDBStatus } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { autoSeedIfEmpty } from './scripts/seed.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// Security Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [
  ENV.CLIENT_URL,
  'https://namahsiddham.in',
  'https://www.namahsiddham.in',
  'https://namah-siddham-corp.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in development, can be restricted in strict prod
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(ENV.COOKIE_SECRET));

// Request Logger
if (ENV.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Serve uploaded assets statically
const uploadDir = path.resolve(process.cwd(), ENV.UPLOAD_DIR);
app.use('/uploads', express.static(uploadDir));

// Base root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Namah Siddham Corporation API Server is running.',
    company: 'Namah Siddham Corporation Private Limited',
    cin: 'U77100MP2026PTC087531',
    portal: 'https://namahsiddham.in',
    health: '/api/health',
  });
});

// System Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    company: 'Namah Siddham Corporation Private Limited',
    cin: 'U77100MP2026PTC087531',
    database: getDBStatus(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route '${req.originalUrl}' does not exist on this server.`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    // Auto-provision initial data if database is fresh
    try {
      await autoSeedIfEmpty();
    } catch (seedErr) {
      console.warn('[AutoSeed] Non-fatal initialization notice:', seedErr.message);
    }

    const server = app.listen(ENV.PORT, () => {
      console.log(`[Server] Namah Siddham API running on http://localhost:${ENV.PORT}`);
      console.log(`[Server] Environment: ${ENV.NODE_ENV}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`[Server] Port ${ENV.PORT} is in use by an old background process. Run 'taskkill /F /IM node.exe' to free it.`);
      } else {
        console.error('[Server Error]', err);
      }
    });
  } catch (error) {
    console.error(`[Server] Failed to start:`, error);
  }
};

startServer();

export default app;
