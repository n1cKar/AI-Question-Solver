
'use client';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="ri-brain-line text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Question Solver</h1>
              <p className="text-sm text-gray-600">Ask anything, get instant answers</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
