import mongoose from 'mongoose';
import dns from 'dns';
import { ENV } from './env.js';

// Resolve DNS SRV query issues on Windows & ISP networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if custom dns servers cannot be set
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // Instead of crashing the server, retry connection gracefully in background
    setTimeout(() => {
      console.log('[MongoDB] Retrying database connection in 5s...');
      connectDB();
    }, 5000);
  }
};

export const getDBStatus = () => {
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
};
