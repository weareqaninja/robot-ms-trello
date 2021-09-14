import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import controller from "./controller";
import 'dotenv/config';

const app = express();

app.use(cors({
    origins: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/users', controller.create)
app.post('/auth', controller.auth)

const port = 3301;

app.listen(port, () => {
    console.log(`App online na porta: ${port}`);
});

module.exports = app;
