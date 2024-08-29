import amqp from 'amqplib';

const username = 'user'; // Replace with your RabbitMQ username
const password = 'password'; // Replace with your RabbitMQ password
const rabbitMQUrl = `amqp://${username}:${password}@rabbitmq`;

export async function connectRabbitMQ() {
    let connection, channel: amqp.Channel;
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        const queue = 'hello';

        await channel.assertQueue(queue, { durable: false });
        console.log(`[*] Waiting for messages in ${queue}`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`[x] Received: ${msg.content.toString()}`);
                // Handle the message here
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

export function withQueue(queueName: string, options?: amqp.Options.AssertQueue) {
    return async (callback: (channel: amqp.Channel) => Promise<void>) => {
        const connection = await amqp.connect(rabbitMQUrl);
        const channel = await connection.createChannel();
        try {
            await channel.assertQueue(queueName, options);
            await callback(channel);
        } catch (error) {
            console.error('Broker error:', error);
        } finally {
            await channel.close();
            await connection.close();
        }
    }
}

export function sendMessage(queue: string, message: string, options: amqp.Options.AssertQueue = {
    durable: true
}): Promise<void> {
    return withQueue(queue, options)(async (channel) => {
        channel.sendToQueue(queue, Buffer.from(message), {
            persistent: true // Make sure that RabbitMQ will never lose the message if it crashes
        });
    });
}


export function waitMessage(queue: string): Promise<void> {
    return withQueue(queue, {
        autoDelete: true
    })(async (channel) => {
        return new Promise((resolve, reject) => {
            channel.consume(queue, (msg) => resolve());
        });
    })
}

export async function publishMessage(exchange: string, message: string) {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();
    try {
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        channel.publish(exchange, '', Buffer.from(message));
    } catch (error) {
        console.error('Broker error:', error);
    } finally {
        await channel.close();
        await connection.close();
    }
}