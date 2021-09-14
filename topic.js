// Init requierd dependencies
const { Kafka } = require('kafkajs');

// Init kafka
run();
async function run() {
  try {
    // Establish TCP connection
    const kafka = new Kafka({
      clientId: CLIENT_ID,
      brokers: [KAFKA_CONNECTION],
    });

    // Create admin
    const admin = kafka.admin();

    // Connect
    console.log('Connecting...');
    await admin.connect();
    console.log('Connected');

    // Create topics
    await admin.createTopics({
      topics: [{ topic: TOPIC_NAME, numPartitions: NUM_PARTITIONS }],
    });
    console.log('Toipcs created successfully');

    // Disconnect
    await admin.disconnect();
    console.log('Disconnected');
  } catch (ex) {
    console.error(`Something went wrong ${ex}`);
  } finally {
    process.exit(0);
  }
}
