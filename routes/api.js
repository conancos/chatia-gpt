const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let messages = [];

router.post('/', async (req, res) => {
    const { userMessage } = req.body;

    messages.push({ role: 'user', content: userMessage });

    try {
        const completion = await openai.chat.completions.create({
            messages: [...messages],
            model: "gpt-4o-mini",
            /* model: "gpt-3.5-turbo", */
            /* stream: true, */
        });

        const botResponse = completion.choices[0].message.content;

        messages.push({ role: 'assistant', content: botResponse });
        res.json({ botResponse });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router
