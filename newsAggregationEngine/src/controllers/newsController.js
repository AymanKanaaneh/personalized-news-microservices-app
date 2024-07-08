const { model } = require("../../config/geminiAI");

const pickUserNews = async (req, res) => {
    
    const prompt = "Write a story about a magic backpack."

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        res.status(200).send(text);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

module.exports = {
    pickUserNews
};