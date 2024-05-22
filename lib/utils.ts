import dotenv from 'dotenv';

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const KEYS = ["ADMIN_PASSWORD", "JUDGEDAEMON_PASSWORD"];

export function checkEnvs() {
  for (const key of KEYS) {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`)
    }
  }
}

export function readEnvs() {
  dotenv.config({ path: ['.env', '.development'] })
  checkEnvs()
}