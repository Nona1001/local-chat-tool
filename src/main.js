import readline from "readline";
import fs from "fs/promises";
import path from "path";
import { sendChat } from "./services/chatService.js";

// 標準入力
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// TODO
console.log("プログラム開始");

async function main() {
    const personas = await loadPersonas();
    const selectedPersona = await selectPersona(rl, personas);
    const systemPrompt = await loadSystemPrompt(selectedPersona);

    console.log(`\n人格「${selectedPersona.name}」で開始します\n`);

    const messages = [
        { role: "system", content: systemPrompt }
    ];

    while(true) {
        const input = await new Promise(resolve => {
            rl.question("あなた: ", resolve);
        });

        if(input === "exit") {
            console.log("終了します");
            rl.close();
            break;
        }

        if(!input.trim()) {
            console.log("※ 何か入力してください")
            continue;
        }

        messages.push({ role: "user", content: input });

        try {
            // TODO
            console.log("sendChatを呼び出します");
            console.log("AIが考えています...");
            const reply = await sendChat(normalizeMessages(messages));

            // TODO
            console.log("AIの返答を受信しました");
            console.log("\nAI:", reply);

            messages.push({ role: "assistant", content: reply });
        } catch (err) {
            console.error("エラー:", err.message);
            rl.close();
            break;
        }
    }
}

function normalizeMessages(messages) {
  return messages.filter(
    m => m.content && m.content.trim()
  );
}

// 旧システムプロンプト取得関数
// async function loadSystemPrompt() {
//   const filePath = path.resolve("prompts/system.md");
//   const content = await fs.readFile(filePath, "utf-8");
//   return content.trim();
// }

// 人格一覧取得関数
async function loadPersonas() {
  const dirPath = path.resolve("prompts");
  const files = await fs.readdir(dirPath);

  return files
    .filter(f => f.endsWith(".md"))
    .map(f => ({
      name: f.replace(".md", ""),
      path: path.join(dirPath, f)
    }));
}

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

// 人格選択関数 
async function selectPersona(rl, personas) {
  console.log("人格を選択してください:");

  personas.forEach((p, i) => {
    console.log(`${i + 1}) ${p.name}`);
  });

  while (true) {
    const input = await ask(rl, "> ");
    const index = Number(input) - 1;

    if (personas[index]) {
      return personas[index];
    }

    console.log("無効な選択です。もう一度入力してください。");
  }
}

// 選択されたシステムプロンプト読み込み関数
async function loadSystemPrompt(persona) {
  const content = await fs.readFile(persona.path, "utf-8");
  return content.trim();
}

main();