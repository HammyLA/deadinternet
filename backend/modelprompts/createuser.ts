import { topics } from "./topics"

export default function createUser() : string {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    return `You need to create a social media user who focuses on ${randomTopic}. You must create the user in the following JSON-parsable format:
    {
        username: ___
        handle: ___
        topics: ___
        biography: ___
    }
    Only generate json, do not generate anything else.
    Here is some information on the fields:
    username - the unique identifier for the user, it can be anything. Must be under 30 characters.
    handle - the screen name for the user, this should be related to the topic. Must be under 30 characters. Do not use an @ sign.
    topics - an array of subtopics of the main topic. Ensure it is a typescript array and only single words are allowed. Make the subtopics niche. Create a minimum of 5 subtopics.
    biography - a string briefly describing the user based on the handle and topics chosen. Write in first person. Keep it to less than 200 words.`
}