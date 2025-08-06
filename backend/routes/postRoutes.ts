import express from "express";
import prisma from "../prisma/prismaClient";
import { generateOriginalThought, generateReply } from "../src/generate";
import { getRandomAIUser } from "./userRoutes";

const router = express.Router();

/**
 * Gets the most recent posts given a skip and a take value. A parentId or author ID can be included to identify the origins of the post. (parentId is used for replies)
 * 
 * @param skipVal amount of posts to skip
 * @param takeVal amount of posts to take
 * @param parentId id of parent post (if a reply)
 * @param authorId id of the author post
 * @returns list of posts
 */
async function getRecentPosts({
  skipVal,
  takeVal,
  parentId,
  authorId,
}: {
  skipVal: number;
  takeVal: number;
  parentId?: number;
  authorId?: number;
}) {
  if (authorId && parentId) {
    throw new Error(
      "Both authorId and parentId are included. Please separate usage."
    );
  }
  const where: any = {
    parentId: parentId ?? null,
  };
  if (authorId != null) {
    where.authorId = authorId;
  }

  try {
    let posts = await prisma.post.findMany({
      where,
      orderBy: {
        id: "desc",
      },
      include: {
        author: true,
        _count: {
          select: { replies: true },
        },
      },
      skip: skipVal,
      take: takeVal,
    });

    return posts;
  } catch (e) {
    console.log(e);
    return null;
  }
}

router.get("/", async (req, res) => {
  const data = req.query;

  let skipVal = 0;
  let takeVal = 10;
  if (typeof data.skip == "string" && typeof data.take == "string") {
    skipVal = parseInt(data.skip, 10);
    takeVal = parseInt(data.take, 10);
  }
  let posts = await getRecentPosts({skipVal, takeVal});
  res.send(posts);
});

router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const data = req.query;

  let skipVal = 0;
  let takeVal = 10;
  if (typeof data.skip == "string" && typeof data.take == "string") {
    skipVal = parseInt(data.skip, 10);
    takeVal = parseInt(data.take, 10);
  }
  let posts = await getRecentPosts({skipVal, takeVal, authorId: userId});
  res.send(posts)
});

router.get("/detailed/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const data = req.query;

  let skipVal = 0;
  let takeVal = 10;
  if (typeof data.skip == "string" && typeof data.take == "string") {
    skipVal = parseInt(data.skip, 10);
    takeVal = parseInt(data.take, 10);
  }

  try {
    let post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        author: true,
      },
    });
    if (!post) {
      throw new Error(`Post ${postId} cannot be found.`);
    }
    (post as any).replies = await getRecentPosts({skipVal, takeVal, parentId: postId});
    res.send(post);
  } catch (e) {
    console.log(e);
    res.send(`Error collecting replies for post ${postId}`);
  }
});

router.post("/generatePost", async (req, res) => {
  try {
    let user = await getRandomAIUser();
    if (!user) {
      throw new Error("Not a valid user.");
    }
    let randomTopic =
      user.topics[Math.floor(Math.random() * user.topics.length)];
    const postJSON = await generateOriginalThought(
      "What are you thinking about?",
      randomTopic
    );
    let postContent = postJSON["content"];

    let post = await prisma.post.create({
      data: {
        content: postContent,
        authorId: user.id,
      },
    });
    console.log(post);
    res.send(`Added post ${post.content} for user ${user.handle}`);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send("Error occurred during posting");
  }
});

router.post("/generateReply", async (req, res) => {
  let skipVal = 0;
  let takeVal = 20;
  try {
    let userReplier = await getRandomAIUser();
    let parentPosts = await getRecentPosts({skipVal, takeVal});

    if (!parentPosts || !userReplier) {
      throw new Error("Failed to get user or parent");
    }

    // If the replier is the same as the poster, we'll have a separate response type, this is here just as a way to make replying consistent for now. It just finds a new post to reply to.
    let selectedPost =
      parentPosts[Math.floor(Math.random() * parentPosts.length)];
    while (selectedPost.authorId == userReplier.id) {
      selectedPost =
        parentPosts[Math.floor(Math.random() * parentPosts.length)];
    }

    let replyContent = await generateReply(selectedPost.content);
    let reply = await prisma.post.create({
      data: {
        content: replyContent.content,
        parentId: selectedPost.id,
        authorId: userReplier.id,
      },
    });
    console.log(reply);
    res.send(
      `User ${userReplier.handle} replied to post ${selectedPost.id} with ${reply.content}`
    );
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});

export default router;
