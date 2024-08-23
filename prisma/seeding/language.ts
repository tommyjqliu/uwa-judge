import { uwajudgeDB } from "@/lib/database-client";
import { isExecutable } from "@/lib/utils";
import fs from 'fs';

// ref: DOMjudge: domjudge/webapp/src/DataFixtures/default-language/LanguageFixture.php
export default async function main() {
    // Todo: Parallelize the process
    const data = [
        // ID      external ID   name           extensions                 require  entry point   allow   allow   time   compile              compiler version      runner version
        //                                                             entry point  description   submit  judge   factor script               command               command
        ['adb', 'ada', 'Ada', ['adb', 'ads'], false, null, false, true, 1, 'adb', 'gnatmake --version', ''],
        ['awk', 'awk', 'AWK', ['awk'], false, null, false, true, 1, 'awk', 'awk --version', 'awk --version'],
        ['bash', 'bash', 'Bash shell', ['bash'], false, 'Main file', false, true, 1, 'bash', 'bash --version', 'bash --version'],
        ['c', 'c', 'C', ['c'], false, null, true, true, 1, 'c', 'gcc --version', ''],
        ['cpp', 'cpp', 'C++', ['cpp', 'cc', 'cxx', 'c++'], false, null, true, true, 1, 'cpp', 'g++ --version', ''],
        ['csharp', 'csharp', 'C#', ['csharp', 'cs'], false, null, false, true, 1, 'csharp', 'mcs --version', 'mono --version'],
        ['f95', 'f95', 'Fortran', ['f95', 'f90'], false, null, false, true, 1, 'f95', 'gfortran --version', ''],
        ['hs', 'haskell', 'Haskell', ['hs', 'lhs'], false, null, false, true, 1, 'hs', 'ghc --version', ''],
        ['java', 'java', 'Java', ['java'], false, 'Main class', true, true, 1, 'java_javac_detect', 'javac -version', 'java -version'],
        ['js', 'javascript', 'JavaScript', ['js', 'mjs'], false, 'Main file', false, true, 1, 'js', 'nodejs --version', 'nodejs --version'],
        ['lua', 'lua', 'Lua', ['lua'], false, null, false, true, 1, 'lua', 'luac -v', 'lua -v'],
        ['kt', 'kotlin', 'Kotlin', ['kt'], true, 'Main class', false, true, 1, 'kt', 'kotlinc -version', 'kotlin -version'],
        ['pas', 'pascal', 'Pascal', ['pas', 'p'], false, 'Main file', false, true, 1, 'pas', 'fpc -iW', ''],
        ['pl', 'pl', 'Perl', ['pl'], false, 'Main file', false, true, 1, 'pl', 'perl -v', 'perl -v'],
        ['plg', 'prolog', 'Prolog', ['plg'], false, 'Main file', false, true, 1, 'plg', 'swipl --version', ''],
        ['py3', 'python3', 'Python 3', ['py'], false, 'Main file', true, true, 1, 'py3', 'pypy3 --version', 'pypy3 --version'],
        ['ocaml', 'ocaml', 'OCaml', ['ml'], false, null, false, true, 1, 'ocaml', 'ocamlopt --version', ''],
        ['r', 'r', 'R', ['R'], false, 'Main file', false, true, 1, 'r', 'Rscript --version', 'Rscript --version'],
        ['rb', 'ruby', 'Ruby', ['rb'], false, 'Main file', false, true, 1, 'rb', 'ruby --version', 'ruby --version'],
        ['rs', 'rust', 'Rust', ['rs'], false, null, false, true, 1, 'rs', 'rustc --version', ''],
        ['scala', 'scala', 'Scala', ['scala'], false, null, false, true, 1, 'scala', 'scalac -version', 'scala -version'],
        ['sh', 'sh', 'POSIX shell', ['sh'], false, 'Main file', false, true, 1, 'sh', 'md5sum /bin/sh', 'md5sum /bin/sh'],
        ['swift', 'swift', 'Swift', ['swift'], false, 'Main file', false, true, 1, 'swift', 'swiftc --version', ''],
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
                const files = filePaths.map((file) => fs.readFileSync(file));

                executable = await uwajudgeDB.executable.create({
                    data: {
                        id: item[9],
                        description: item[9],
                        type: 'compile',
                        files: {
                            create: files.map((file, index) => ({
                                name: fileNames[index],
                                content: file,
                                isExecutable: isExecutable(filePaths[index]) || ['compile', 'run'].includes(fileNames[index]),
                            })),
                        },
                    },
                });
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
                    Executable: {
                        connect: { execId: executable.execId },
                    },
                    compilerVersionCommand: item[10] || null,
                    runnerVersionCommand: item[11] || null,
                },
            });
        } else {
            console.log(`Language ${item[0]} already exists, not created`);
        }
    }
}