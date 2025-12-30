import { sendChat } from "../src/services/chatService.js";

async function main() {
    const reply = await sendChat("こんにちは！");
    console.log("AI:", reply);
}

main();