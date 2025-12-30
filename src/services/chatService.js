import 'dotenv/config';
import axios from 'axios';

const API_KEY = process.env.OPENROUTER_API_KEY;

if(!API_KEY) {
    throw new Error("ERROR: OPENROUTER_API_KEY が設定されていません (.env を確認してください)");
}

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * LLMにメッセージ送信
 * @param {Array<{ role: "system" | "user" | "assistant", content: string }>} messages
 * @returns {Promise<string>} AIの返答
 */

export async function sendChat(messages) {
    // TODO
    console.log("sendChat 開始:", messages);
    
    if (!messages) {
        throw new Error("送信メッセージが空です");
    }

    if (!Array.isArray(messages)) {
        throw new Error("送信メッセージの形が不正です");
    }

    try {
        const response = await axios.post(
            API_URL,
        {
            model: "mistralai/devstral-2512:free",
            messages: messages
        },
        {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": "http://localhost",
                "X-Title": "LocalChatTool"
            },
            timeout: 15_000
        }
        );

        // TODO
        console.log("APIレスポンス受信");

        const content = response.data.choices[0].message.content;
        if (!content) throw new Error("API応答が不正です")
        return content;

    } catch (error) {
        if (error.code === "ECONNABORTED") {
            console.error("APIがタイムアウトしました");
        } else {
            console.error("API 呼び出しエラー:", error.response?.data || error.message);
            throw new Error("API 呼び出しに失敗しました");
        }
    }
}