
import amqp from 'amqplib/callback_api';
import 'dotenv/config';

let ch = process.env.QUEUE_NAME;

amqp.connect(process.env.AMQP_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});

export const publishToQueue = async (queueName, data) => {
    await ch.assertQueue(queueName, { durable: true });
    await ch.sendToQueue(queueName, Buffer.from(data));
}

process.on('exit', (code) => {
    if (typeof cn != 'undefined') {
        ch.close();
        console.log(`Closing rabbitmq channel`);
    }
});