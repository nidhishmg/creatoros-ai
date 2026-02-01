'use client';

import { useState } from 'react';

interface DNAResult {
  success: boolean;
  profile?: {
    creator_id: string;
    generated_at: string;
    creator_dna: {
      primary_tone: string;
      humor_level: number;
      dark_humor_present: boolean;
      risk_tolerance: string;
      audience_type: string;
      confidence: {
        tone: number;
        humor: number;
        risk: number;
        audience: number;
      };
    };
  };
  error?: {
    code: string;
    message: string;
  };
}

export default function Home() {
  const [creatorId, setCreatorId] = useState('creator123');
  const [content, setContent] = useState(
    'Just made a hilarious video about coding bugs at 3am! Every developer knows this pain 😂 #coding #developer #tech'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DNAResult | null>(null);

  const handleScan = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/creator-dna/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creator_id: creatorId,
          posts: [
            {
              content: content,
              post_type: 'reel',
              engagement: { likes: 5000, comments: 200, shares: 50 },
              comments_sample: ['So relatable!', 'This is great!', 'Love this!'],
              posted_at: new Date().toISOString(),
            },
          ],
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: { code: 'NETWORK_ERROR', message: 'Failed to connect to API' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">CreatorOS AI</h1>
        <p className="text-gray-400 mb-8">AI-powered creator intelligence platform</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🧬 Creator DNA Scanner
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Creator ID</label>
                <input
                  type="text"
                  value={creatorId}
                  onChange={(e) => setCreatorId(e.target.value)}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter creator ID"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Sample Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Paste creator's content here..."
                />
              </div>

              <button
                onClick={handleScan}
                disabled={loading || !content.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded py-3 font-semibold transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Scan Creator DNA'
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">📊 Analysis Results</h2>

            {!result && !loading && (
              <div className="text-gray-500 text-center py-12">
                Enter content and click &quot;Scan&quot; to analyze
              </div>
            )}

            {loading && (
              <div className="text-gray-400 text-center py-12">
                <div className="animate-pulse">Analyzing creator content with AI...</div>
              </div>
            )}

            {result && result.success && result.profile && (
              <div className="space-y-4">
                <div className="bg-gray-700 rounded p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Primary Tone</span>
                    <span className="text-xs text-gray-500">
                      {(result.profile.creator_dna.confidence.tone * 100).toFixed(0)}% confident
                    </span>
                  </div>
                  <div className="text-lg font-semibold capitalize text-purple-400">
                    {result.profile.creator_dna.primary_tone}
                  </div>
                </div>

                <div className="bg-gray-700 rounded p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Humor Level</span>
                    <span className="text-xs text-gray-500">
                      {(result.profile.creator_dna.confidence.humor * 100).toFixed(0)}% confident
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${result.profile.creator_dna.humor_level * 10}%` }}
                      />
                    </div>
                    <span className="text-lg font-semibold text-yellow-400">
                      {result.profile.creator_dna.humor_level}/10
                    </span>
                  </div>
                  {result.profile.creator_dna.dark_humor_present && (
                    <span className="text-xs text-orange-400 mt-1 inline-block">⚠️ Dark humor detected</span>
                  )}
                </div>

                <div className="bg-gray-700 rounded p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Risk Tolerance</span>
                    <span className="text-xs text-gray-500">
                      {(result.profile.creator_dna.confidence.risk * 100).toFixed(0)}% confident
                    </span>
                  </div>
                  <div className={`text-lg font-semibold capitalize ${
                    result.profile.creator_dna.risk_tolerance === 'high' ? 'text-red-400' :
                    result.profile.creator_dna.risk_tolerance === 'medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {result.profile.creator_dna.risk_tolerance}
                  </div>
                </div>

                <div className="bg-gray-700 rounded p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Audience Type</span>
                    <span className="text-xs text-gray-500">
                      {(result.profile.creator_dna.confidence.audience * 100).toFixed(0)}% confident
                    </span>
                  </div>
                  <div className="text-lg font-semibold capitalize text-blue-400">
                    {result.profile.creator_dna.audience_type}
                  </div>
                </div>
              </div>
            )}

            {result && !result.success && (
              <div className="bg-red-900/30 border border-red-500 rounded p-4">
                <p className="text-red-400 font-semibold">{result.error?.code}</p>
                <p className="text-red-300 text-sm">{result.error?.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">
            <span className="text-green-400 font-mono">POST</span>{' '}
            <span className="font-mono text-gray-300">/api/creator-dna/scan</span>
          </p>
        </div>
      </div>
    </main>
  );
}
