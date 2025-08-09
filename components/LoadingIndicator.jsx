
'use client';

export default function LoadingIndicator() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="ri-robot-line text-white text-sm"></i>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-3">AI is thinking...</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-sm text-gray-600 ml-2">Processing your question...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
