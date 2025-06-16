import express, { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient';
import { generateUser } from '../src/generate';

const router = express.Router()

export async function getRandomAIUser() {
    try {
        let userCount = await prisma.user.count();
        let user;
        let email: string | null | undefined = 'a';
        while (!user) {
            let id = Math.floor(Math.random() * userCount)
            user = await prisma.user.findFirst({
                where: {
                    id: id,
                    isAI: true
                }
            })
        }
        return user;
    }
    catch (e) {
        console.log(e)
    }
}

router.post("/createBotUser", async (req, res) => {
    const userJSON = await generateUser("Create a user.")
    const username = userJSON['username']
    const handle = userJSON['handle']
    const topics = userJSON['topics']
    console.log(userJSON)

    try {
        let user = await prisma.user.create({
            data: {
                username: username,
                handle: handle,
                topics: topics,
            }
        })
        console.log(user)
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
    res.send(`Added user ${username}`)
})

export default router