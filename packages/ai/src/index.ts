import { Groq } from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

export interface AIProvider {
  generateCompletion(messages: Array<{ role: string; content: string }>): Promise<string>;
}

export class GroqProvider implements AIProvider {
  private client: Groq;
  private systemPrompt = `You are ARIA, an educational market intelligence assistant.

Explain investing, economics, financial assets, and market concepts clearly.

Do not provide financial advice.

Do not recommend trades.

Focus on education and explanation.`;

  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }

  async generateCompletion(
    messages: Array<{ role: string; content: string }>
  ): Promise<string> {
    const formattedMessages: ChatCompletionMessageParam[] = [
      { role: "system", content: this.systemPrompt },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content
      }))
    ];

    const completion = await this.client.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.3-70b-versatile", // Valid groq model, fast and effective
      temperature: 0.7,
      max_tokens: 1024
    });

    return (
      completion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response."
    );
  }
}

export const aiProvider: AIProvider = new GroqProvider();
