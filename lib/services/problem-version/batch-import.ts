import importProblemVersion from "./import";

export default function batchImportProblemVersion(files: File[]) {
    return Promise.all(files.map(importProblemVersion));
}