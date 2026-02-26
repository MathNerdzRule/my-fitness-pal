const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const analyzeLabel = async (base64Image) => {
  const prompt = `You are a health assistant. Analyze the nutrition label in this image. Extract: Calories (number), Protein (g), Carbs (g), and Fat (g). Format the output as a clean JSON object. If a label is unreadable, provide your best estimate based on the product type. 
  Example format: {"calories": 250, "protein": 10, "carbs": 30, "fat": 8}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      }),
    });

    const result = await response.json();
    const textResult = result.candidates[0].content.parts[0].text;
    
    // Extract JSON from the text response
    const jsonMatch = textResult.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Could not parse JSON from Gemini response");
  } catch (error) {
    console.error("Error analyzing label:", error);
    throw error;
  }
};
