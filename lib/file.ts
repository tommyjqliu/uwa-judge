import axios from "axios";
import fs from "fs-extra"
import path from "path";
import archiver from "archiver"
import decompress from "decompress"

export function isFile(f: unknown): f is File {
  return f instanceof File;
}

// recursive async function to create a directory
export function ensureDir(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

export async function getHash(input: File | Buffer) {
  let buffer: ArrayBuffer;
  if (input instanceof File) {
    buffer = Buffer.from(await input.arrayBuffer());
  } else {
    buffer = input;
  }

  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function extractAndCheckFile(zipFile: string, tempDir: string) {
  await fs.ensureDir(tempDir); // Ensure the temporary directory exists

  // Extract the ZIP file into the temporary directory

  await decompress(zipFile, tempDir)
  const files = await fs.readdir(tempDir);

  const problemStatements = files.filter(file =>
    file === 'problem.pdf' || file === 'problem.html' || file === 'problem.txt'
  );

  return problemStatements.length > 0;
}

export async function callProblemToolAndSavePDF(file: File, tempDir: string) {
  const PROBLEM_TOOL_URL = process.env.PROBLEM_TOOL_URL;
  if (!PROBLEM_TOOL_URL) {
    throw new Error('PROBLEM_TOOL_URL is not defined in the environment variables.');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.postForm(`${PROBLEM_TOOL_URL}/problem2pdf`, formData, {
    responseType: 'arraybuffer'
  });

  const pdfPath = path.join(tempDir, 'problem.pdf');
  await fs.promises.writeFile(pdfPath, response.data);
}

export async function rezipDirectory(sourceDir: string, outPath: string) {
  const output = fs.createWriteStream(outPath);
  const archive = archiver('zip');

  return new Promise((resolve, reject) => {
    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}