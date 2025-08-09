
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import QuestionInput from '../components/QuestionInput';
import AnswerDisplay from '../components/AnswerDisplay';
import QuestionHistory from '../components/QuestionHistory';
import LoadingIndicator from '../components/LoadingIndicator';
import { askQuestion, paraphraseAnswer, humanizeAnswer } from '../lib/openai';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [paraphrasedAnswer, setParaphrasedAnswer] = useState('');
  const [humanizedAnswer, setHumanizedAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setCurrentQuestion(question);
    setCurrentAnswer('');
    setParaphrasedAnswer('');
    setHumanizedAnswer('');

    try {
      const answer = await askQuestion(question);
      setCurrentAnswer(answer);
      
      const historyItem = {
        id: Date.now().toString(),
        question,
        answer,
        timestamp: new Date()
      };
      
      setHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    } catch (error) {
      setCurrentAnswer('Sorry, I encountered an error while processing your question. Please make sure your API key is configured correctly and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleParaphrase = async () => {
    if (!currentAnswer || isParaphrasing) return;
    
    setIsParaphrasing(true);
    try {
      const paraphrased = await paraphraseAnswer(currentAnswer);
      setParaphrasedAnswer(paraphrased);
    } catch (error) {
      setParaphrasedAnswer('Sorry, I could not paraphrase the answer. Please try again.');
    } finally {
      setIsParaphrasing(false);
    }
  };

  const handleHumanize = async () => {
    if (!currentAnswer || isHumanizing) return;
    
    setIsHumanizing(true);
    try {
      const humanized = await humanizeAnswer(currentAnswer);
      setHumanizedAnswer(humanized);
    } catch (error) {
      setHumanizedAnswer('Sorry, I could not humanize the answer. Please try again.');
    } finally {
      setIsHumanizing(false);
    }
  };

  const handleHistorySelect = (item) => {
    setCurrentQuestion(item.question);
    setCurrentAnswer(item.answer);
    setParaphrasedAnswer('');
    setHumanizedAnswer('');
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-brain-line text-white text-3xl"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              AI Question Solver
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant, intelligent answers to any question. Type your question or upload an image with text.
            </p>
          </div>

          <QuestionInput 
            onSubmit={handleQuestionSubmit}
            loading={loading}
          />

          {loading && <LoadingIndicator />}

          {currentAnswer && !loading && (
            <AnswerDisplay
              question={currentQuestion}
              answer={currentAnswer}
              onParaphrase={handleParaphrase}
              paraphrasedAnswer={paraphrasedAnswer}
              isParaphrasing={isParaphrasing}
              onHumanize={handleHumanize}
              humanizedAnswer={humanizedAnswer}
              isHumanizing={isHumanizing}
            />
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className={`mr-2 ${showHistory ? 'ri-eye-off-line' : 'ri-eye-line'}`}></i>
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>

          {showHistory && (
            <QuestionHistory
              history={history}
              onSelectQuestion={handleHistorySelect}
            />
          )}

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-image-line text-blue-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Image OCR</h3>
              <p className="text-gray-600 text-sm">Upload images with text and get automatic text extraction using advanced OCR technology.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-brain-line text-green-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">Get intelligent answers powered by advanced AI language models for accurate information.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-translate-2 text-purple-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Paraphrase</h3>
              <p className="text-gray-600 text-sm">Get simplified explanations and alternative phrasings to better understand complex answers.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 AI Question Solver. Made by Nimash Mendis
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
