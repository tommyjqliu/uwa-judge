import dotenv from 'dotenv';
import fs from 'fs';

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export function readEnvs() {
  dotenv.config({ path: ['.env', '.development'] })
}

export function isExecutable(filePath: string) {
  const stats = fs.statSync(filePath);
  
  // Check if the file is executable by the owner
  const executableBit = (stats.mode & 0o100) !== 0;

  return executableBit;
}
export function decodeBase64(data: string) {
  return Buffer.from(data, 'base64').toString('utf-8');
}