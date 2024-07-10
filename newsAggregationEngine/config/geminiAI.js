const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMENI_AI_API_KEY } = require('../config/environment');

// Access API key as an environment variable
const genAI = new GoogleGenerativeAI(GEMENI_AI_API_KEY);


// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

module.exports = { 
    model
};