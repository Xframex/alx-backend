#!/usr/bin/yarn dev
import { createQueue } from "kue";

const queue = createQueue({name: 'push_notification_code'});

const jobData = queue.create('push_notification_code', {
    phoneNumber: '4153518780',
    message: 'This is the code to verify your account',
    });

jobData.on('enqueue', () => {
    console.log(`Notification job created: ${jobData.id}`);
});

jobData.on('complete', () => {
    console.log('Notification job completed');
});

jobData.save((err) => {
    if (!err) console.log(`Notification job created: ${jobData.id}`);
});
