# Local Chat Tool

Node.js + OpenRouter API を使った  
CLIベースのローカルAIチャットツールです。

## Overview

このツールは、LLM API を利用したチャットボットを
ローカル環境（CLI）で動作させることを目的としています。

system プロンプト（人格）をファイルとして管理し、
起動時に選択できる設計になっています。

## Features

- 複数 system プロンプト（人格）対応
- 起動時に人格選択
- 会話履歴を保持した複数ターン対話
- ローカル実行（CLI）

## Requirements

- Node.js v18 以上
- OpenRouter API Key

## Setup

```bash
npm install

Environment variables

プロジェクト直下に.env を作成し、以下を設定してください。

OPENROUTER_API_KEY=your_api_key_here

Run
node src/main.js

終了する場合は以下を入力します。
exit

### ⑧ Notes / Limitations（注意点）

```md
## Notes

- このツールは OpenRouter の無料モデルを使用しています
- レート制限により応答が失敗する場合があります
- 会話履歴はメモリ上のみで、永続化はしていません