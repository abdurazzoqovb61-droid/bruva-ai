const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/api/generate-prompt', async (req, res) => {
    try {
        const { prompt, type, style } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + OPENROUTER_API_KEY,
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Bruva AI",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openrouter/auto", // Avto-model: eng maqbul ishlayotgan modelni o'zi tanlaydi
                messages: [
                    { 
                        role: "system", 
                        content: "Siz professional AI prompt injenerisiz." 
                    },
                    { 
                        role: "user", 
                        content: "G'oya: " + prompt + ". Turi: " + type + ", Stili: " + style 
                    }
                ]
            })
        });

        const data = await response.json();
        console.log("OpenRouter javobi:", data);

        if (data.choices && data.choices[0] && data.choices[0].message) {
            res.json({ result: data.choices[0].message.content });
        } else if (data.error) {
            res.json({ result: "API Xatosi: " + data.error.message });
        } else {
            res.json({ result: "AI javob qaytara olmadi, qaytadan urinib ko'ring." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server xatosi" });
    }
});

app.listen(3000, () => {
    console.log("Server 3000-portda ishlamoqda...");
});