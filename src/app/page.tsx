export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">CreatorOS AI</h1>
        <p className="text-gray-400 mb-8">
          AI-powered creator intelligence platform
        </p>
        
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">🧬 Creator DNA Scanner</h2>
          <p className="text-gray-300 mb-4">
            Analyze creator content to build a structured DNA profile including
            tone, humor level, risk tolerance, and audience type.
          </p>
          
          <div className="bg-gray-700 rounded p-4">
            <p className="text-sm font-mono text-green-400">
              POST /api/creator-dna/scan
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
