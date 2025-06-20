import express, { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient';
import { generateOriginalThought, generateReply } from '../src/generate';
import { getRandomAIUser } from './userRoutes';

const router = express.Router()

async function getRecentPosts(skipVal: number, takeVal: number, parentId?: number) {
    try {
        let posts = await prisma.post.findMany({
            where: {
                parentId: parentId ? parentId : null,
            },
            orderBy: {
                id: 'desc',
            },
            include: {
                author: true,
                _count: {
                    select: {replies: true}
                }
            },
            skip: skipVal,
            take: takeVal
        })

        return posts
    }
    catch (e) {
        console.log(e)
        return null
    }
}

router.get('/', async (req, res) => {
    const data = req.query
    
    let skipVal = 0;
    let takeVal = 10;
    if (typeof data.skip == "string" && typeof data.take == "string") {
        skipVal = parseInt(data.skip, 10)
        takeVal = parseInt(data.take, 10)
    }
    let posts = await getRecentPosts(skipVal, takeVal)
    res.send(posts)
})

router.get('/detailed/:id', async(req, res) => {
    const postId = parseInt(req.params.id, 10)
    const data = req.query
    
    let skipVal = 0;
    let takeVal = 10;
    if (typeof data.skip == "string" && typeof data.take == "string") {
        skipVal = parseInt(data.skip, 10)
        takeVal = parseInt(data.take, 10)
    }

    try {
        let post = await prisma.post.findFirst({
            where: {
                id: postId
            },
            include: {
                author: true,
            }
        })
        if (!post) {
            throw new Error(`Post ${postId} cannot be found.`)
        }
        (post as any).replies = await getRecentPosts(skipVal, takeVal, postId)
        res.send(post)
    }
    catch (e) {
        console.log(e)
        res.send(`Error collecting replies for post ${postId}`)
    }
})

router.post('/generatePost', async (req, res) => {
    try {
        let user = await getRandomAIUser()
        if (!user) {
            throw new Error("Not a valid user.")
        }
        let randomTopic = user.topics[Math.floor(Math.random() * user.topics.length)]
        const postJSON = await generateOriginalThought("What are you thinking about?", randomTopic)
        let postContent = postJSON['content']

        let post = await prisma.post.create({
            data: {
                content: postContent,
                authorId: user.id
            }
        })
        console.log(post)
        res.send(`Added post ${post.content} for user ${user.handle}`)
    }
    catch (e) {
        console.log(e)
        res.status(500)
        res.send("Error occurred during posting")
    }
})

router.post('/generateReply', async(req, res) => {
    let skipVal = 0
    let takeVal = 20
    try {
        let userReplier = await getRandomAIUser()
        let parentPosts = await getRecentPosts(skipVal, takeVal)
        

        if (!parentPosts || !userReplier) {
            throw new Error("Failed to get user or parent")
        }

        // If the replier is the same as the poster, we'll have a separate response type, this is here just as a way to make replying consistent for now. It just finds a new post to reply to.
        let selectedPost = parentPosts[Math.floor(Math.random() * parentPosts.length)]
        while (selectedPost.authorId == userReplier.id) {
            selectedPost = parentPosts[Math.floor(Math.random() * parentPosts.length)]
        }

        let replyContent = await generateReply(selectedPost.content);
        let reply = await prisma.post.create({
            data: {
                content: replyContent.content,
                parentId: selectedPost.id,
                authorId: userReplier.id
            }
        })
        console.log(reply)
        res.send(`User ${userReplier.handle} replied to post ${selectedPost.id} with ${reply.content}`)
    }
    catch (e) {
        res.status(500)
        res.send(e)
    }
})

export default router;