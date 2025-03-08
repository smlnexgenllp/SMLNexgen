import axios from 'axios';

async function translateText(text, targetLanguage) {
  const API_KEY = "YOUR_GOOGLE_TRANSLATE_API_KEY"; // Replace with your actual API key
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLanguage,
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error during translation:", error);
    return text; // Return original text if translation fails
  }
}
