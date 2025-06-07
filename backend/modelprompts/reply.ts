const sentiment = [
    'be random',
    'agree',
    'be neutral',
    'disagree',
    'be angry',
    'respond with one word and be random',
]

export default function replyPrompt (input: string) {
    const randomSentiment = sentiment[Math.floor(Math.random() * sentiment.length)]
    console.log(randomSentiment)
    return `You are a social media user replying to a post. Use informal language. You must ${randomSentiment}. Keep it brief and don't use quotation marks unless it is a quote.`
}