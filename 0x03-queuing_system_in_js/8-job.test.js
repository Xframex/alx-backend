#!/usr/bin/yarn dev
import sinon from 'sinon';
import { expect } from 'chai';
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  const logger = sinon.spy(console); // Renamed to 'logger'
  const QUEUE = createQueue({ name: 'push_notification_code_test' });

  before(() => {
    QUEUE.testMode.enter(true);
  });

  after(() => {
    QUEUE.testMode.clear();
    QUEUE.testMode.exit();
  });

  afterEach(() => {
    logger.log.resetHistory(); // Updated to reset the history of 'log' method on 'logger'
  });

  it('throws an error if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs({}, QUEUE);
    }).to.throw('Jobs is not an array');
  });

  it('adds jobs to the queue with the correct type', () => {
    const jobs = [{ data: { message: 'Hello' } }, { data: { message: 'World' } }];

    createPushNotificationsJobs(jobs, QUEUE);

    expect(QUEUE.testMode.jobs.length).to.equal(2);
    expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(QUEUE.testMode.jobs[0].type).to.equal('push_notification_code_3');
  });

  it('registers event handlers for the job', () => {
    const jobs = [{ data: { message: 'Hello' } }];
    createPushNotificationsJobs(jobs, QUEUE);
    const job = QUEUE.testMode.jobs[0];

    // Simulate progress event
    job.emit('progress', 25);
    expect(logger.log.calledWith('Notification job', job.id, '25% complete')).to.be.true;

    // Simulate failed event
    job.emit('failed', 'Failed to send');
    expect(logger.log.calledWith('Notification job', job.id, 'failed:', 'Failed to send')).to.be.true;

    // Simulate complete event
    job.emit('complete');
    expect(logger.log.calledWith('Notification job', job.id, 'completed')).to.be.true;
  });
});

