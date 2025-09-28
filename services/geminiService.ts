
const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_NAME = "openai/gpt-3.5-turbo";

export const sendMessageToAI = async (prompt: string): Promise<string> => {
  if (!API_KEY.startsWith("sk-or-")) {
    return "خطا: کلید API ارائه شده برای OpenRouter معتبر به نظر نمی‌رسد. لطفا با مدیر سیستم تماس بگیرید.";
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        return errorData.error?.message || `خطای API: ${response.statusText}`;
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
        return data.choices[0].message.content.trim();
    } else {
        console.error('Invalid response structure from AI API:', data);
        return "پاسخ نامعتبر از طرف هوش مصنوعی دریافت شد.";
    }

  } catch (error) {
    console.error('Error sending message to AI:', error);
    if (error instanceof Error) {
        return `خطا در برقراری ارتباط با هوش مصنوعی: ${error.message}`;
    }
    return 'خطا در برقراری ارتباط با هوش مصنوعی. لطفا دوباره تلاش کنید.';
  }
};
