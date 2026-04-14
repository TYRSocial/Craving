'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CravingSelector from '@/components/CravingSelector';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CravingDemoPage() {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [selectedCraving, setSelectedCraving] = useState(null);

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [loading, token, router]);

  if (loading || !token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-dark">
            Craving Selector UI 🎨
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive demo with the ability to create new craving categories
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Craving Selector */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
            <CravingSelector
              selectedCraving={selectedCraving}
              onSelectCraving={setSelectedCraving}
              showAddNew={true}
            />
          </div>

          {/* Right: Information Panel */}
          <div className="space-y-6">
            {/* Features Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
              <h3 className="text-xl font-bold mb-4 text-dark">✨ Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✅ 8 pre-built cravings</li>
                <li>✅ Click to select</li>
                <li>✅ Add new categories</li>
                <li>✅ Custom emojis</li>
                <li>✅ Color selection</li>
                <li>✅ Live preview</li>
                <li>✅ Responsive design</li>
                <li>✅ Smooth animations</li>
              </ul>
            </div>

            {/* Color Options Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-dark">🎨 Colors</h3>
              <div className="grid grid-cols-5 gap-2">
                {[
                  'bg-pink-100',
                  'bg-red-100',
                  'bg-yellow-100',
                  'bg-green-100',
                  'bg-blue-100',
                  'bg-purple-100',
                  'bg-orange-100',
                  'bg-teal-100',
                  'bg-indigo-100',
                  'bg-cyan-100',
                ].map((color) => (
                  <div
                    key={color}
                    className={`h-8 rounded-lg ${color} border border-gray-300`}
                  />
                ))}
              </div>
            </div>

            {/* How to Use Card */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg border-2 border-primary/20">
              <h3 className="text-lg font-bold mb-3 text-dark">📖 How to Use</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Click any craving button to select</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Click "Add New Craving" button</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Fill in name and emoji</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>Choose a color</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">5.</span>
                  <span>Click "Add Craving"</span>
                </li>
              </ol>
            </div>

            {/* Selection Info */}
            {selectedCraving && (
              <div className="bg-gradient-to-br from-secondary/20 to-primary/20 p-6 rounded-lg border-2 border-secondary">
                <h3 className="text-lg font-bold mb-2 text-dark">
                  Currently Selected
                </h3>
                <div className={`p-4 rounded-lg ${selectedCraving.color} text-center`}>
                  <div className="text-5xl mb-2">{selectedCraving.emoji}</div>
                  <p className="font-bold text-lg text-dark">
                    {selectedCraving.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Example Section */}
        <div className="mt-12 bg-dark text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">💻 Usage Example</h2>
          <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm">
{`import CravingSelector from '@/components/CravingSelector';

export default function MyComponent() {
  const [craving, setCraving] = useState(null);

  return (
    <CravingSelector
      selectedCraving={craving}
      onSelectCraving={setCraving}
      showAddNew={true}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
