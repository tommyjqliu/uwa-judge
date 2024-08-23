import * as fs from 'fs';
import * as path from 'path';
import decompress from 'decompress';
import * as tmp from 'tmp';

interface ZipController {
    hasFile: (filePath: string) => boolean;
    readFile: (filePath: string) => File | null;
    readFileString: (filePath: string) => string | null;
    readFileBuffer: (filePath: string) => Buffer | null;
    /**
     * Obtain entries in path
     * @returns {string[]} entries
     */
    getEntries: (filePath?: string) => string[];
}

export async function withZipFile<T>(file: File, callback: (controller: ZipController) => Promise<T>): Promise<T> {
    const tempDir = tmp.dirSync({ unsafeCleanup: true });
    const unzippedPath = tempDir.name;

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        await decompress(buffer, unzippedPath);

        const controller: ZipController = {
            hasFile: (filePath: string): boolean => {
                const fullPath = path.join(unzippedPath, filePath);
                return fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
            },
    
            readFile: (filePath: string): File | null => {
                const fullPath = path.join(unzippedPath, filePath);
                if (controller.hasFile(filePath)) {
                    return new File([fs
                        .readFileSync(fullPath
                        )], filePath);
                }
                return null;
            },

            readFileString: (filePath: string): string | null => {
                const fullPath = path.join(unzippedPath, filePath);
                if (controller.hasFile(filePath)) {
                    return fs.readFileSync(fullPath, 'utf8');
                }
                return null;
            },

            readFileBuffer: (filePath: string): Buffer | null => {
                const fullPath = path.join(unzippedPath, filePath);
                if (controller.hasFile(filePath)) {
                    return fs.readFileSync(fullPath);
                }
                return null;
            },

            getEntries: (filePath: string = ""): string[] => {
                const entries: string[] = [];
                const readDirRecursively = (dir: string) => {
                    const files = fs.readdirSync(dir);
                    for (const file of files) {
                        const fullPath = path.join(dir, file);
                        const relativePath = path.relative(unzippedPath, fullPath);
                        if (fs.statSync(fullPath).isDirectory()) {
                            readDirRecursively(fullPath);
                        } else {
                            entries.push(relativePath);
                        }
                    }
                };
                readDirRecursively(path.join(unzippedPath, filePath));
                return entries;
            }
        };

        return await callback(controller);

    } finally {
        tempDir.removeCallback();
    }
}