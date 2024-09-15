import { Press_Start_2P } from "next/font/google";
import CodeAnimation from "./code-animation";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default async function Home() {
  return (
    <main className="flex-1 overflow-auto">
      <main className="flex flex-col items-center p-12">
        <div className="mt-48 mb-32 relative flex flex-col gap-8 place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <h1 className={`text-7xl ${pressStart2P.className}`}>UWA Judge</h1>
          <div className="z-[1]">A solution for UWA coding assignment</div>
        </div>
        <CodeAnimation />
      </main>
    </main>

  );
}
