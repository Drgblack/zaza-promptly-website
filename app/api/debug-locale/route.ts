import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const buildPath = path.join(process.cwd(), '.next/server/app');
  
  const localeFiles = ['en.html', 'de.html', 'fr.html', 'es.html', 'it.html'];
  const fileStatus = localeFiles.map(file => {
    const filePath = path.join(buildPath, file);
    return {
      file,
      exists: fs.existsSync(filePath),
      path: filePath
    };
  });

  return NextResponse.json({
    status: 'debug',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL,
    buildPath,
    localeFiles: fileStatus,
    middlewareExists: fs.existsSync(path.join(process.cwd(), 'middleware.ts'))
  });
}