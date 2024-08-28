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


export async function sendMessage(queue: string, message: string): Promise<void> {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect(rabbitMQUrl);

        // Create a channel
        const channel = await connection.createChannel();

        // Assert a queue into existence
        await channel.assertQueue(queue, {
            durable: true // Make sure that RabbitMQ will never lose the queue if it crashes
        });

        // Send the message to the queue
        channel.sendToQueue(queue, Buffer.from(message), {
            persistent: true // Make sure that RabbitMQ will never lose the message if it crashes
        });

        // console.log(`Message sent to queue ${queue}: ${message}`);

        // Close the channel and connection
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Failed to send message:', error);
    }
}


