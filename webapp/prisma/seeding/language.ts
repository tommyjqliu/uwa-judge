import { uwajudgeDB } from "@/lib/database-client";
import createExecutable from "@/services/executable/create";
import fs from 'fs';

// ref: DOMjudge: domjudge/webapp/src/DataFixtures/default-language/LanguageFixture.php
export default async function importLanguage() {
    // Todo: Parallelize the process
    const data = [
        // ID      external ID   name           extensions                 require  entry point   allow   allow   time   compile
        //                                                             entry point  description   submit  judge   factor script
        ['bash', 'bash', 'Bash shell', ['bash'], false, 'Main file', false, true, 1, 'bash'],
        ['c', 'c', 'C', ['c'], false, null, true, true, 1, 'c'],
        ['cpp', 'cpp', 'C++', ['cpp', 'cc', 'cxx', 'c++'], false, null, true, true, 1, 'cpp'],
        ['csharp', 'csharp', 'C#', ['csharp', 'cs'], false, null, false, true, 1, 'csharp'],
        ['java', 'java', 'Java', ['java'], false, 'Main class', true, true, 1, 'java_javac_detect'],
        ['js', 'javascript', 'JavaScript', ['js'], false, 'Main file', false, true, 1, 'js'],
        ['python', 'python3', 'Python 3', ['py'], false, 'Main file', true, true, 1, 'py3'],
        ['r', 'r', 'R', ['R'], false, 'Main file', false, true, 1, 'r'],
        ['rs', 'rust', 'Rust', ['rs'], false, null, false, true, 1, 'rs'],

        // ['adb', 'ada', 'Ada', ['adb', 'ads'], false, null, false, true, 1, 'adb'],
        // ['awk', 'awk', 'AWK', ['awk'], false, null, false, true, 1, 'awk'],
        // ['f95', 'f95', 'Fortran', ['f95', 'f90'], false, null, false, true, 1, 'f95'],
        // ['hs', 'haskell', 'Haskell', ['hs', 'lhs'], false, null, false, true, 1, 'hs'],
        // ['lua', 'lua', 'Lua', ['lua'], false, null, false, true, 1, 'lua'],
        // ['kt', 'kotlin', 'Kotlin', ['kt'], true, 'Main class', false, true, 1, 'kt'],
        // ['pas', 'pascal', 'Pascal', ['pas', 'p'], false, 'Main file', false, true, 1, 'pas'],
        // ['pl', 'pl', 'Perl', ['pl'], false, 'Main file', false, true, 1, 'pl'],
        // ['plg', 'prolog', 'Prolog', ['plg'], false, 'Main file', false, true, 1, 'plg'],
        // ['rb', 'ruby', 'Ruby', ['rb'], false, 'Main file', false, true, 1, 'rb'],
        // ['scala', 'scala', 'Scala', ['scala'], false, null, false, true, 1, 'scala'],
        // ['sh', 'sh', 'POSIX shell', ['sh'], false, 'Main file', false, true, 1, 'sh'],
        // ['swift', 'swift', 'Swift', ['swift'], false, 'Main file', false, true, 1, 'swift'],
    ] as const;

    for (const item of data) {
        const existingLanguage = await uwajudgeDB.language.findUnique({
            where: { id: item[0] },
        });

        if (!existingLanguage) {
            let executable = await uwajudgeDB.executable.findUnique({
                where: { id: item[9] }
            });

            if (!executable) {
                const folderPath = `./prisma/default-language/${item[9]}`;
                const fileNames = fs.readdirSync(folderPath);
                const filePaths = fileNames.map((file) => `${folderPath}/${file}`);

                executable = await createExecutable(item[9], item[2], 'compile', filePaths);
            }

            await uwajudgeDB.language.create({
                data: {
                    id: item[0],
                    externalId: item[1],
                    name: item[2],
                    extensions: [...item[3]],
                    requireEntryPoint: item[4],
                    entryPointDescription: item[5],
                    allowSubmit: item[6],
                    allowJudge: item[7],
                    timeFactor: item[8],
                    executable: {
                        connect: { id: executable.id },
                    },
                },
            });
        } else {
            console.log(`Language ${item[0]} already exists, not created`);
        }
    }
}