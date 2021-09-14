# Kafka Service with Node Js

#### **Event driven, Pub sub and Queue**.

- Get Started

  - Init your Kafka and Zookeeper
  - Add your .env file with required values
  - Init the producer with your message

  ```bash
  node producer <msg>
  ```

  - Init the consumer

  ```bash
  node consumer
  ```

  > You can init another consumer ( in case of more than one partition ) to let Zookeeper distribute partitions within the same consumer group.
