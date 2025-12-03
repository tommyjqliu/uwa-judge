import { Press_Start_2P } from "next/font/google";
import CodeAnimation from "./code-animation";
import { Code2, Database, Layers, Zap, Shield, Users } from "lucide-react";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default async function Home() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center p-12 bg-gradient-to-b from-transparent via-transparent to-blue-950/10">
          <div className="mt-48 mb-32 relative flex flex-col gap-8 place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <h1 className={`text-7xl ${pressStart2P.className}`}>UWA Judge</h1>
            <div className="z-[1] text-xl text-center max-w-2xl">
              A modern code judging platform for UWA coding assignments
            </div>
          </div>
          <CodeAnimation />
        </section>

        {/* Features Section */}
        <section className="py-20 px-12 bg-gradient-to-b from-blue-950/10 via-blue-950/20 to-blue-950/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all">
                <Code2 className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2">Multi-Language Support</h3>
                <p className="text-gray-800">
                  Execute and test code in multiple programming languages with isolated sandboxed environments.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all">
                <Zap className="w-12 h-12 mb-4 text-yellow-500" />
                <h3 className="text-xl font-bold mb-2">Real-Time Feedback</h3>
                <p className="text-gray-800">
                  Get instant results and detailed test case feedback for submitted code solutions.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all">
                <Shield className="w-12 h-12 mb-4 text-green-500" />
                <h3 className="text-xl font-bold mb-2">Secure Execution</h3>
                <p className="text-gray-800">
                  Containerized code execution ensures safe and isolated runtime environments.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all">
                <Database className="w-12 h-12 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">Persistent Storage</h3>
                <p className="text-gray-800">
                  Store submissions, test cases, and user progress with a robust database backend.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all">
                <Users className="w-12 h-12 mb-4 text-pink-500" />
                <h3 className="text-xl font-bold mb-2">User Management</h3>
                <p className="text-gray-800">
                  Complete authentication system with role-based access control for students and instructors.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all">
                <Layers className="w-12 h-12 mb-4 text-cyan-500" />
                <h3 className="text-xl font-bold mb-2">Modular Architecture</h3>
                <p className="text-gray-800">
                  Built with a monorepo structure for maintainable and scalable development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-20 px-12 bg-gradient-to-b from-blue-950/10 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Architecture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-400/50 hover:border-blue-400 transition-all shadow-lg hover:shadow-blue-500/20">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="text-blue-500">Frontend</span>
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li>• Next.js 15 with App Router</li>
                    <li>• React Server Components</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• TypeScript for type safety</li>
                  </ul>
                </div>
                <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/30 border border-purple-400/50 hover:border-purple-400 transition-all shadow-lg hover:shadow-purple-500/20">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="text-purple-500">Backend API</span>
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li>• RESTful API with Node.js</li>
                    <li>• Express.js framework</li>
                    <li>• PostgreSQL database</li>
                    <li>• Prisma ORM</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/30 border border-green-400/50 hover:border-green-400 transition-all shadow-lg hover:shadow-green-500/20">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="text-green-500">Code Execution</span>
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li>• Docker containerization</li>
                    <li>• Isolated sandbox environments</li>
                    <li>• Resource limits and timeouts</li>
                    <li>• Multi-language runtime support</li>
                  </ul>
                </div>
                <div className="p-6 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/30 border border-orange-400/50 hover:border-orange-400 transition-all shadow-lg hover:shadow-orange-500/20">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="text-orange-500">Infrastructure</span>
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li>• pnpm monorepo workspace</li>
                    <li>• Docker Compose orchestration</li>
                    <li>• Shared TypeScript packages</li>
                    <li>• Development hot-reload</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-12 bg-gradient-to-b from-transparent to-blue-950/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Submit Your Code</h3>
                  <p className="text-gray-800">
                    Students write and submit their solutions through the web interface with syntax highlighting and code editing support.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Automated Testing</h3>
                  <p className="text-gray-800">
                    The system automatically runs your code against predefined test cases in a secure, isolated environment.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Instant Results</h3>
                  <p className="text-gray-800">
                    Receive immediate feedback on test results, execution time, and detailed error messages to help improve your solution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-12 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className={`text-2xl mb-4 ${pressStart2P.className}`}>UWA Judge</h3>
                <p className="text-gray-800 text-sm">
                  A modern code judging platform designed for educational environments.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">GitHub Repository</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Report Issues</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Technology Stack</h4>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li>• Next.js & React</li>
                  <li>• Node.js & Express</li>
                  <li>• PostgreSQL & Prisma</li>
                  <li>• Docker & pnpm</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} UWA Judge. Built for educational purposes.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
