import * as fs from "fs";

export function isFile(f: unknown): f is File {
  return f instanceof File;
}

// recursive async function to create a directory
export function ensureDir(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

export async function getHash(file: File) {
  const reader = file.stream().getReader();
  const chunks: Uint8Array[] = [];
  let chunk;
  while (!(chunk = await reader?.read()).done) {
    chunks.push(chunk.value);
  }
  const fileData = new Blob(chunks);
  const buffer = await fileData.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
