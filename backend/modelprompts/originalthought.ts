const topics = [
    'technology',
    'sports',
    'politics',
    'entertainment',
    'health',
    'business',
    'science',
    'travel',
    'food',
    'fashion',
    'education',
    'lifestyle'
]


export default function originalThoughtPrompt (topic?: string) {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    return `You are a social media user making a general post about ${topic ? topic : randomTopic}. Be controversial and have the wrong opinion. Keep it a brief post. Don't use quotation marks unless it is a quote.`

}