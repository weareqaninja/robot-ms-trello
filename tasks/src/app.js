import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import tasks from "./controllers/tasks";
import 'dotenv/config';
import authMiddleware from './middlewares/auth';

const app = express();

app.use(cors({
    origins: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(authMiddleware);
app.get('/tasks', tasks.list)
app.get('/tasks/:id', tasks.get)
app.delete('/tasks/:id', tasks.remove)
app.post('/tasks', tasks.create)
app.put('/tasks/:id', tasks.update)

const port = 3302;

app.listen(port, () => {
    console.log(`App online na porta: ${port}`);
});

module.exports = app;
