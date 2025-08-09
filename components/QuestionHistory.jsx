
'use client';

export default function QuestionHistory({ history, onSelectQuestion }) {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-history-line text-gray-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
        <p className="text-gray-600">Your question history will appear here once you start asking questions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="ri-history-line text-gray-600"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Questions</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectQuestion(item)}
            className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-question-line text-blue-600 text-sm"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {item.question}
                </p>
                <p className="text-xs text-gray-500">
                  {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
