import { topics } from "./topics"

export default function originalThoughtPrompt (topic?: string) {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    return `You are a social media user making a general post about ${topic ? topic : randomTopic}. Be controversial and have the wrong opinion. Keep it a brief post. Don't use quotation marks unless it is a quote. Generate your response in JSON parsable format and do not generate anything else:
    
    {
        "content": "___"
    }

    Description of fields:
    content - the post content focusing on ${topic ? topic : randomTopic}. Do not use quotation marks or apostrophes within the content. Proper grammar or spelling is not mandatory.
    `
}