const amqplib = require('amqplib');

//.env
const amqp_url_cloud = 'amqps://soyrnxjn:RirFUZxVhCyMFYyt-rtzkZf361QX3aCu@armadillo.rmq.cloudamqp.com/soyrnxjn'
const amqp_url_docker= 'ampq://localhost:5672';

const receiveQueue = async () => {
    try{
        //create connect
        const conn = await amqplib.connect(amqp_url_docker)
        //create channel
        const channel = await conn.createChannel();
        //create name queue
        const nameQueue = 'q1';
        //create queue
        await channel.assertQueue(nameQueue, {
            durable: true
        });

        //receive from queue
        await channel.consume(nameQueue, msg => {
            console.log('MSG::: ', msg.content.toString());
        }, {
            noAck: true
        })

        //close connection and channel


    }
    catch(e){
        console.log('Error: ', e);
    }
}

receiveQueue()