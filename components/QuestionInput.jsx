
'use client';

import { useState, useRef } from 'react';

export default function QuestionInput({ onSubmit, loading }) {
  const [question, setQuestion] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !loading) {
      onSubmit(question.trim());
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    
    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker();
      
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();
      
      setQuestion(prev => prev + (prev ? ' ' : '') + text.trim());
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to extract text from image. Please try again.');
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <i className="ri-question-line text-blue-600 text-lg"></i>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ask your question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here or upload an image with text..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows={4}
              disabled={loading || isProcessingImage}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileInput}
              disabled={loading || isProcessingImage}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessingImage ? (
                <>
                  <i className="ri-loader-4-line mr-2 animate-spin"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="ri-image-line mr-2"></i>
                  Upload Image
                </>
              )}
            </button>
            
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-camera-line mr-2"></i>
              Camera
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!question.trim() || loading || isProcessingImage}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line mr-2 animate-spin"></i>
                Getting Answer...
              </>
            ) : (
              <>
                <i className="ri-send-plane-line mr-2"></i>
                Ask Question
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
