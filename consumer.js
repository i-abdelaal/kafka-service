// Init requierd dependencies
const { Kafka } = require('kafkajs');

// Init kafka consumer
run();
async function run() {
  try {
    // Establish TCP connection
    const kafka = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: [process.env.KAFKA_CONNECTION],
    });

    // Create consumer
    const consumer = kafka.consumer({
      groupId: process.env.GROUP_ID,
    });

    // Connect
    console.log('Connecting...');
    await consumer.connect();
    console.log('Connected');

    // subscribe to topic
    await consumer.subscribe({
      topic: process.env.TOPIC_NAME,
      fromBeginning: true,
    });

    // Run consumer to reveive messages
    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received message ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (ex) {
    console.error(`Something went wrong ${ex}`);
  }
}
