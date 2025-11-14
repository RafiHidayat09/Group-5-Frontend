export async function getMentalHealthTips(scores) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const prompt = `
  Berdasarkan skor berikut:
  Stress: ${scores.Stress}
  Kecemasan: ${scores.Kecemasan}
  Depresi: ${scores.Depresi}

  Berikan 5 tips kesehatan mental dalam format JSON:
  {
    "tips": ["...", "...", "..."]
  }
  `;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    }
  );

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  try {
    return JSON.parse(text);
  } catch {
    return { tips: ["Gagal memproses respon."] };
  }

  
}

