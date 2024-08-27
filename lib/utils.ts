import dotenv from 'dotenv';
import fs from 'fs';

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export function readEnvs() {
  dotenv.config({ path: ['.env', '.development'] })
}


// Not sure if this work. Ref: Domjudge@8.2.3:webapp/src/Service/DOMJudgeService.php:1008
export function isExecutable(filePath: string) {
  try {
      const stats = fs.statSync(filePath);
      return (stats.mode & 0o100) !== 0; // Check the user execute bit
  } catch (err) {
      console.error('Error reading file permissions:', err);
      return false;
  }
}