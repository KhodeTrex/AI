
const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_NAME = "qwen/qwen2.5-vl-72b-instruct:free";

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
