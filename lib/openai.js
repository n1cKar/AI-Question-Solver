
const GEMINI_API_KEY = 'add your gemini api key here';

export const askQuestion = async (question) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a helpful assistant that provides clear, accurate answers to questions. Always be informative and concise. Question: ${question}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate an answer.';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get answer from AI. Please try again.');
  }
};

export const paraphraseAnswer = async (originalAnswer) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Paraphrase the following text to make it unique while keeping the original meaning, improving clarity and readability. Avoid plagiarism, maintain a natural tone, and ensure proper grammar and flow: ${originalAnswer}`
          }]
        }],
        generationConfig: {
          temperature: 0.5,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not paraphrase the answer.';
  } catch (error) {
    console.error('Error paraphrasing answer:', error);
    throw new Error('Failed to paraphrase answer. Please try again.');
  }
};

export async function humanizeAnswer(answer) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Humanize this text so it sounds professional, clear, and approachable, while keeping the original message intact. Remove any overly complex or robotic phrasing:\n\n${answer}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error humanizing answer:', error);
    throw error;
  }
}
