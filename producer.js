// Init requierd dependencies
const { Kafka } = require('kafkajs');

// Provide message to producer through command line
const msg = process.argv[2];

// Define the right partition
const partition = msg[0] < 'N' ? 0 : 1;

// Init kafka producer
run();
async function run() {
  try {
    // Establish TCP connection
    const kafka = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: [process.env.KAFKA_CONNECTION],
    });

    // Create producer
    const producer = kafka.producer();

    // Connect
    console.log('Connecting...');
    await producer.connect();
    console.log('Connected');

    // Send record
    const result = await producer.send({
      topic: process.env.TOPIC_NAME,
      messages: [
        {
          value: msg,
          partition,
        },
      ],
    });
    console.log(`Sent successfully! ${JSON.stringify(result)}`);

    // Disconnect
    await producer.disconnect();
    console.log('Disconnected');
  } catch (ex) {
    console.error(`Something went wrong ${ex}`);
  } finally {
    process.exit(0);
  }
}
