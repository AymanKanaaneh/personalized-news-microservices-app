const { model } = require("../../config/geminiAI");

const preferences = [
    "technology",
    "science",
    "sports",
    "business",
    "health",
    "entertainment",
];

const pickUserNews = async (emailAddress) => {
    
    let prompt = `Given a list of preferences, provide the latest news articles that match these preferences. Ensure the news is current and relevant to the specified topics. Each article should include the title, a brief summary, the source, and a link to the full article. The preferences are as follows:\n`;
    
    const jsonResponse = {
        "category": 'health',
        "title": "string",
        "summary": "string",
        "source": "string",
        "link": "string"
    };

    //TO DO - fetch user prefernces from DB by emailAddress
    
    prompt += preferences.join('\n');

    prompt += "Return only the data in a JSON object with the following structure: \n";
    prompt += jsonResponse+"\n";
    prompt += "Please avoid any non-JSON content.";

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonString = response.text().match(/\[.*?\]/s)[0];;
        console.log(jsonString);
        return JSON.parse(jsonString);
    } catch (error) {
        //TO DO logger
    }

};

function getCurrentDate() {

    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();

    // Format the date as a string in the format "DD-MM-YYYY"
    const currentDate = `${day}-${month}-${year}`;

    return currentDate;
}
 
module.exports = {
    pickUserNews
};