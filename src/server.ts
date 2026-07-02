import "dotenv/config";
import express from "express";
import {emailQueue} from "./queue";
import { startWorker } from "./worker";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());


app.post("/jobs/email", async (req, res) => {
    const {to, subject, body} = req.body;
    
    const job = await emailQueue.add("send-email", {to, subject, body});

    return res.status(202).json({
        message: "Seu envio está sendo processado",
        jobId: job.id
    });
});

app.get("/jobs/:jobId", async (req, res) => {
    return res.json({ok: true})
})


app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
    startWorker();
})