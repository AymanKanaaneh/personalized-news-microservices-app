const { model } = require("../../config/geminiAI");
const nodemailer = require('../../config/nodemailer');
const { ZIONET_MAILER_EMAIL } = require('../../config/environment');

const preferences = [
    "technology",
    "science",
    "sports",
    "business",
    "health",
    "entertainment",
];

/**
 * Fetches news based on user preferences and sends them via email.
 * @param {string} userEmailAddress - The email address of the user.
 * @returns {Promise<{ message: string }>} A promise resolving to a success message.
 */
const pickUserNews = async (userEmailAddress) => {
    try {
        const prompt = generatePrompt();
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonString = extractJsonString(response);
        const jsonNewsArr = JSON.parse(jsonString);
        sendNews(userEmailAddress, jsonNewsArr);
        return { message: "The news has been sent successfully" };
    } catch (error) {
        console.error('Error fetching or sending news:', error);
        throw error;
    }
};

/**
 * Generates a prompt based on predefined preferences.
 * @returns {string} A formatted prompt string.
 */
function generatePrompt() {
    let prompt = `Given a list of preferences, provide the latest news articles that match these preferences. Ensure the news is current and relevant to the specified topics. Each article should include the title, a brief summary, the source, and a link to the full article. The preferences are as follows:\n`;
    prompt += preferences.join('\n');
    prompt += "\nReturn only the data in a JSON object with the following structure:\n";
    prompt += JSON.stringify({
        "category": 'health',
        "title": "string",
        "summary": "string",
        "source": "string",
        "link": "string"
    });
    prompt += "\nPlease ensure that the JSON object you return contains no non-JSON content or syntax errors.";
    return prompt;
}

/**
 * Extracts JSON string from the response text.
 * @param {Response} response - The response object from model generation.
 * @returns {string} Extracted JSON string.
 */
function extractJsonString(response) {
    const jsonString = response.text().match(/\[.*?\]/s)[0];
    return jsonString;
}

/**
 * Sends news articles to the user via email.
 * @param {string} userEmailAddress - The email address of the user.
 * @param {Array} jsonNewsArr - Array of news articles in JSON format.
 */
function sendNews(userEmailAddress, jsonNewsArr) {
    jsonNewsArr.forEach(jsonNewsData => {
        const payload = setMailPayload(userEmailAddress, jsonNewsData);
        sendEmail(payload);
    });
}

/**
 * Sets the email payload for a news article.
 * @param {string} userEmailAddress - The email address of the user.
 * @param {Object} jsonNewsData - JSON object containing news article data.
 * @returns {Object} Email payload object.
 */
function setMailPayload(userEmailAddress, jsonNewsData) {
    return {
        from: ZIONET_MAILER_EMAIL,
        to: userEmailAddress,
        subject: jsonNewsData.title,
        text: `${jsonNewsData.summary}\n\nsource: ${jsonNewsData.source}\n\nlink: ${jsonNewsData.link}`
    };
}

/**
 * Sends an email using Nodemailer.
 * @param {Object} payload - Email payload object.
 */
function sendEmail(payload) {
    const mailOptions = {
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
    };
    nodemailer.transporter.sendMail(mailOptions);
}

module.exports = {
    pickUserNews
};
