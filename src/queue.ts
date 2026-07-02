import {Queue} from 'bullmq';
import {conecction} from './connection';

export const QUEUE_NAME = 'email-queue';

export interface EmailJobData {
    to: string;
    subject: string;
    body: string;
}

export const emailQueue = new Queue<EmailJobData>(QUEUE_NAME, {connection: conecction})  //Adiciona na fila de email



