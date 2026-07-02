import {Worker} from 'bullmq';
import { conecction } from './connection';
import {QUEUE_NAME, type EmailJobData} from './queue';

export function startWorker() {
    
    const worker = new Worker<EmailJobData>(
        QUEUE_NAME, 
        async (job) => {
            console.log(`Processing job ${job.id}"`);

            await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulando envio de email

            return {
                sentAt: new Date().toDateString(),
                to: job.data.to,
            };
        },
        {connection: conecction}
    );


    worker.on('completed', (job, result) => {
        console.log(`Job ${job.id} completed!`, result);
    });

    worker.on('failed', (job, error) => {
        console.error(`Job ${job?.id} failed!`, error.message);
    });

    return worker;
}
