const { model } = require("../../config/geminiAI");
const nodemailer = require('../../config/nodemailer');
const { ZIONET_MAILER_EMAIL } = require('../../config/environment');
const logger = require('../../config/logger');

const { DaprClient, HttpMethod } = require('@dapr/dapr');
const { daprHost, daprPort } = require('../../config/environment');
const client = new DaprClient(daprHost, daprPort);
const customExceptions = require('../exceptions/customExceptions');

/**
 * Fetches news based on user preferences and sends them via email.
 * @param {string} userEmailAddress - The email address of the user.
 * @returns {Promise<{ message: string }>} A promise resolving to a success message.
 */
const pickUserNews = async (userEmailAddress) => {
    try {
        
        logger.info(`Fetching news for ${userEmailAddress}`);
        const preferences = await getUserPreferences(userEmailAddress);
        const prompt = generatePrompt(preferences);
        const newsContentStream = await model.generateContent(prompt);
        const newsContent = await newsContentStream.response;
        const newsJsonString = extractJsonString(newsContent);
        const newsJsonArr = JSON.parse(newsJsonString);
        await sendNews(userEmailAddress, newsJsonArr);
    
        logger.info(`News sent successfully to ${userEmailAddress}`);
        return { message: "The news has been sent successfully" };
    } catch (error) {
        
        logger.error(`Error fetching or sending news for ${userEmailAddress}: ${error.message}`);
  
        if (error instanceof customExceptions.ValidationException) {
            throw new customExceptions.ValidationException(`Validation error: ${error.message}`);
        } else if (error instanceof customExceptions.NetworkException) {
            throw new customExceptions.NetworkException('Network error: Unable to reach the news service.');
        } else if (error instanceof customExceptions.TimeoutException) {
            throw new customExceptions.TimeoutException('Request timed out: The news service did not respond in time.');
        } else if (error instanceof customExceptions.ContentGenerationException) {
            throw new customExceptions.ContentGenerationException('Error generating content: Failed to generate news content.');
        } else if (error instanceof customExceptions.NewsSendingException) {
            throw new customExceptions.NewsSendingException('Error sending news: Failed to send news to the user.');
        } else {
            throw new Error(`An unexpected error occurred: ${error.message}`);
        }
    }
};

const getUserPreferences = async (userEmailAddress) => {
    try {
        const endpoint = `user/preferences/${userEmailAddress}`;
        const preferences = await client.invoker.invoke('user-accessor', endpoint, HttpMethod.GET);
        return preferences;
    } catch (error) {
        logger.error(`Error fetching user preferences for ${userEmailAddress}:`, error);
        throw new customExceptions.NetworkException('Failed to fetch user preferences.');
    }
};


/**
 * Generates a prompt based on predefined preferences.
 * @param {preferences} - predefined preferences object.
 * @returns {string} A formatted prompt string.
 */
function generatePrompt(preferences) {
    let prompt = `Given a list of preferences, provide the latest news articles that match these preferences. Ensure the news is current and relevant to the specified topics. Each article should include the title, a brief summary, the source, and a link to the full article. The preferences are as follows:\n`;
    prompt += Object.values(preferences).join('\n');
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
    try {
        const jsonString = response.text().match(/\[.*?\]/s)[0];
        return jsonString;
    } catch (error) {
        throw new customExceptions.ContentGenerationException('Failed to extract JSON string from response.');
    }
}

/**
 * Sends news articles to the user via email.
 * @param {string} userEmailAddress - The email address of the user.
 * @param {Array} newsJsonArr - Array of news articles in JSON format.
 */
async function sendNews(userEmailAddress, newsJsonArr) {
    try {
        await Promise.all(newsJsonArr.map(async (jsonNewsData) => {
        const payload = setMailPayload(userEmailAddress, jsonNewsData);
        await sendEmail(payload);
        }));
    } catch (error) {
        throw new customExceptions.NewsSendingException('Failed to send news to the user.');
    }
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
async function sendEmail(payload) {
    try {
        const mailOptions = {
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
      };
      await nodemailer.transporter.sendMail(mailOptions);
    } catch (error) {
      logger.error('Error sending email:', error);
      throw new customExceptions.NewsSendingException('Failed to send email.');
    }
}

module.exports = {
    pickUserNews
};
