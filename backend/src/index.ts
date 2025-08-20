import express, { Request, Response, NextFunction } from 'express';
import { generateOriginalThought, generateReply } from './generate';
import userRoutes from '../routes/userRoutes'
import postRoutes from '../routes/postRoutes';

const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json())

app.use('/users', userRoutes)
app.use('/posts', postRoutes)

app.get('/generate-original/', async (req: Request, res: Response, next: NextFunction) => {
    const response = await generateOriginalThought();
    res.send(response);
})

app.get('/generate-original/:prompt', async (req: Request, res: Response, next: NextFunction) => {
    const response = await generateOriginalThought(req.params.prompt);
    res.send(response);
})

app.get('/generate-original/:prompt/:topic', async (req: Request, res: Response, next: NextFunction) => {
    const response = await generateOriginalThought(req.params.prompt, req.params.topic);
    res.send(response);
})

app.get('/generate-reply/:prompt', async (req: Request, res: Response) => {
    const response = await generateReply(req.params.prompt);
    res.send(response);
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`);
})