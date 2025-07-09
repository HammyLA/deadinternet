import { topics } from "./topics";

type PostType = {
  type: string;
  weight: number;
};

const postTypeArray: PostType[] = [
  {
    type: "question",
    weight: 20,
  },
  {
    type: "discussion prompt",
    weight: 16,
  },
  {
    type: "joke / meme",
    weight: 14,
  },
  {
    type: "story",
    weight: 12,
  },
  {
    type: "tip",
    weight: 10,
  },
  {
    type: "poll / vote",
    weight: 10,
  },
  {
    type: "how-to / tutorial",
    weight: 9,
  },
  {
    type: "fact / trivia",
    weight: 8,
  },
  {
    type: "announcement",
    weight: 6,
  },
  {
    type: "opinion / analysis",
    weight: 6,
  },
  {
    type: "event",
    weight: 5,
  },
  {
    type: "news",
    weight: 5,
  },
  {
    type: "review / recommendation",
    weight: 5,
  },
  {
    type: "challenge / trend",
    weight: 5,
  },
  {
    type: "longform / thread",
    weight: 5,
  },
  {
    type: "advertisement",
    weight: 3,
  },
];

// Can make this more efficient if needed, binary search and saved array can be used
function selectPostType(): string {
  let sum = 0;
  postTypeArray.forEach((postType) => {
    sum += postType.weight;
  });

  let selectedWeight = Math.floor(Math.random() * sum);
  for (let i = 0; i < postTypeArray.length; i++) {
    selectedWeight -= postTypeArray[i].weight;
    if (selectedWeight <= 0) {
      return postTypeArray[i].type;
    }
  }

  console.log(selectedWeight);
  throw new Error("postType was not correctly selected.");
}

export default function originalThoughtPrompt(topic?: string) {
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const randomPostType = selectPostType();
  console.log(randomPostType);
  return `You are a social media user making a text post about ${
    topic ? topic : randomTopic
  }. The type of post is a/an ${randomPostType}. Keep it a brief post. Don't use quotation marks unless it is a quote. Make up details about the post. Generate your response in JSON parsable format and do not generate anything else:
    
    {
        "content": "___"
    }

    Description of fields:
    content - the post content focusing on ${
      topic ? topic : randomTopic
    }. Do not use quotation marks or apostrophes within the content. Proper grammar or spelling is not mandatory.
    `;
}
