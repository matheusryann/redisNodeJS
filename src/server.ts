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

    const job = await emailQueue.getJob(req.params.jobId);
    if (!job) {
        return res.status(404).json({
            message: "Job not found"
        });
    }
    const state = await job.getState();

    return res.status(200).json({
        id: job.id,
        state,
        name: job.name,
        data: job.data,
        results: job.returnvalue,
        failedReason: job.failedReason,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
    startWorker();
})