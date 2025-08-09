
'use client';

import { useState } from 'react';

export default function AnswerDisplay({ 
  question, 
  answer, 
  onParaphrase, 
  paraphrasedAnswer, 
  isParaphrasing,
  onHumanize,
  humanizedAnswer,
  isHumanizing
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-user-line text-white text-sm"></i>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-2">Your Question</h3>
            <p className="text-gray-700 leading-relaxed">{question}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-robot-line text-white text-sm"></i>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">AI Answer</h3>
              <button
                onClick={() => copyToClipboard(answer)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                <i className={`mr-1 ${copied ? 'ri-check-line text-green-600' : 'ri-file-copy-line'}`}></i>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {answer.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
          <button
            onClick={onParaphrase}
            disabled={isParaphrasing}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isParaphrasing ? (
              <>
                <i className="ri-loader-4-line mr-2 animate-spin"></i>
                Paraphrasing...
              </>
            ) : (
              <>
                <i className="ri-translate-2 mr-2"></i>
                Paraphrase Answer
              </>
            )}
          </button>
          
          <button 
            onClick={onHumanize}
            disabled={isHumanizing}
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isHumanizing ? (
              <>
                <i className="ri-loader-4-line mr-2 animate-spin"></i>
                Humanizing...
              </>
            ) : (
              <>
                <i className="ri-heart-line mr-2"></i>
                Humanize
              </>
            )}
          </button>
        </div>
      </div>

      {paraphrasedAnswer && (
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-translate-2 text-white text-sm"></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Paraphrased Answer</h3>
                <button
                  onClick={() => copyToClipboard(paraphrasedAnswer)}
                  className="px-3 py-1 text-gray-600 hover:bg-purple-100 rounded-md transition-colors cursor-pointer whitespace-nowrap text-sm"
                >
                  <i className="ri-file-copy-line mr-1"></i>
                  Copy
                </button>
              </div>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {paraphrasedAnswer.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {humanizedAnswer && (
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-heart-line text-white text-sm"></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Humanized Answer</h3>
                <button
                  onClick={() => copyToClipboard(humanizedAnswer)}
                  className="px-3 py-1 text-gray-600 hover:bg-orange-100 rounded-md transition-colors cursor-pointer whitespace-nowrap text-sm"
                >
                  <i className="ri-file-copy-line mr-1"></i>
                  Copy
                </button>
              </div>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {humanizedAnswer.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
