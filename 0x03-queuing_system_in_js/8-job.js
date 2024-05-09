#!/usr/bin/yarn dev
import { Queue, Job } from 'kue';

export const createPushNotificationsJobs = (jobs, queue) => {
    if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');
    jobs.forEach((job) => {
        const newJob = queue.create('push_notification_code_3', job).save((err) => {
            if (!err) console.log(`Notification job created: ${newJob.id}`);
        });
        newJob.on('complete', () => {
            console.log(`Notification job ${newJob.id} completed`);
        });
        newJob.on('failed', (errorMessage) => {
            console.log(`Notification job ${newJob.id} failed: ${errorMessage}`);
        });
        newJob.on('progress', (progress) => {
            console.log(`Notification job ${newJob.id} ${progress}% complete`);
        });
    });
}

export default createPushNotificationsJobs;
