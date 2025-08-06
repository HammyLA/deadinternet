import express, { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient';
import { generateUser } from '../src/generate';

// THE URL to this page is http://BASEURL/users/ROUTE

const router = express.Router()

export async function getRandomAIUser() {
    try {
        const userCount = await prisma.user.count();
        const maxAttempts = 10;
        let attempt = 0;
        let user = null;

        while (!user && attempt < maxAttempts) {
            const id = Math.floor(Math.random() * userCount);
            user = await prisma.user.findFirst({
                where: {
                    id: id,
                    isAI: true
                }
            });
            attempt++;
        }

        if (!user) {
            console.warn("No AI user found after maximum attempts.");
        }

        return user;
    } catch (e) {
        console.error("Error occurred in getRandomAIUser:", e);
        return null;
    }
}

router.post("/createBotUser", async (req, res) => {
    const userJSON = await generateUser("Create a user.")
    const username = userJSON['username']
    const handle = userJSON['handle']
    const topics = userJSON['topics']
    const biography = userJSON['biography']
    console.log(userJSON)

    try {
        let user = await prisma.user.create({
            data: {
                username: username,
                handle: handle,
                topics: topics,
                biography: biography,
            }
        })
        console.log(user)
    }
    catch (e) {
        res.status(500)
        res.send(`Failed to create a user, Error stack: ${e}`)
    }
    res.send(`Added user ${username}`)
})

router.get('/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10)
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        
        if (!user) {
            throw new Error(`User ${userId} cannot be found`)
        }

        res.send(user)
    } catch (e) {
        console.log(e)
        res.send("Error finding user information")
    }
})

export default router