import express, { Request, Response, NextFunction } from 'express';
import { generateOriginalThought, generateReply } from './generate';
import userRoutes from '../routes/userRoutes'

const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

app.use('/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

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