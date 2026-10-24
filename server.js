import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';
const distPath = path.join(__dirname, 'dist');

// Health check endpoint for Cloud Run and monitoring
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist directory
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: true,
  index: 'index.html'
}));

// Fallback for all other routes to support client-side SPA routing (Express 5 compatible)
app.use((_req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send('Application build in progress. Please run npm run build.');
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`[Sree Ranganadha Jewellers] Server running on http://${HOST}:${PORT}`);
});

const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed successfully.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Forced shutdown timeout expired.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
