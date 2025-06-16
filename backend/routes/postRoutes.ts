import express, { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient';
import { generateOriginalThought } from '../src/generate';
import { getRandomAIUser } from './userRoutes';

const router = express.Router()

router.get('/', async (req, res) => {
    const data = req.body
    const skipVal = data.skip
    const takeVal = data.take
    try {
        let posts = await prisma.post.findMany({
            where: {
                parentId: null,
            },
            orderBy: {
                id: 'desc',
            },
            skip: skipVal,
            take: takeVal
        })
        res.send(posts)
    }
    catch (e) {
        console.log(e)
        res.status(500)
        res.send("Error fetching post information")
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

export default router;