import "dotenv/config";
import express from "express";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());


app.post("/jobs/email", async (req, res) => {
    const {to, subject, body} = req.body;
    console.log(`Sending email to ${to} with subject "${subject}" and body "${body}"`);

    return res.status(202).json({
        message: "Seu envio está sendo processado",
        jobId: 123
    });
});

app.get("/jobs/:jobId", async (req, res) => {
    return res.json({ok: true})
})


app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
})