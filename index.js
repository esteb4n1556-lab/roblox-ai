const express = require('express');
const app = express();
app.use(express.json());

const GEMINI_API_KEY = "PON_TU_API_KEY_AQUI";

app.post('/ask', async (req, res) => {
  const message = req.body.message;
  if (!message) return res.json({ reply: "No message received" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );
    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data));
    
    if (data.candidates && data.candidates[0]) {
      const reply = data.candidates[0].content.parts[0].text;
      res.json({ reply });
    } else {
      res.json({ reply: "Sin respuesta: " + JSON.stringify(data) });
    }
  } catch (e) {
    res.json({ reply: "Error: " + e.message });
  }
});

app.get('/', (req, res) => res.send('Bot activo!'));
app.listen(3000, () => console.log('Servidor corriendo!'));
