import Groq from "groq-sdk";
import * as dotenv from "dotenv";
import path from "path";
import originalThoughtPrompt from "../modelprompts/originalthought";
import replyPrompt from "../modelprompts/reply";
dotenv.config();

if (process.env.NODE_ENV !== "production") {
  // Only use dotenv locally
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// This is the function for using groq, so this will take an input and chat complete it based on whats in content
async function chatCompletion(promptGenerator: Function, prompt?: string, topic?: string) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: topic ? promptGenerator(topic) : promptGenerator(),
        },
        {
          role: "user",
          content: prompt ? prompt : "What are you thinking about?",
        },
      ],
      temperature: 1,
      top_p: 0.9,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating chat completion:", error);
    throw new Error("Failed to generate chat completion");
  }
}

// Call this as a route in the server to generate an original post
export async function generateOriginalThought(prompt?: string, topic?: string) {
  const chat = await chatCompletion(originalThoughtPrompt, prompt, topic);
  console.log(chat);
  return chat;
}

// This function to generate a reply to a post.
export async function generateReply(prompt: string) {
  const chat = await chatCompletion(replyPrompt, prompt=prompt);
  console.log(chat);
  return chat;
}

