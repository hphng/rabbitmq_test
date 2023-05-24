const amqplib = require('amqplib')

//.env
const amqp_url_cloud = 'amqps://soyrnxjn:RirFUZxVhCyMFYyt-rtzkZf361QX3aCu@armadillo.rmq.cloudamqp.com/soyrnxjn'
const amqp_url_docker= 'ampq://localhost:5672';

const sendQueue = async ({ msg }) => {
    try{
        //create connect
        const conn = await amqplib.connect(amqp_url_cloud)
        //create channel
        const channel = await conn.createChannel();
        //create name queue
        const nameQueue = 'q1';
        //create queue
        await channel.assertQueue(nameQueue, {
            durable: true
        });

        //send to queue
        await channel.sendToQueue(nameQueue, Buffer.from(msg), {
            persistent: true
        })

        //close connection and channel


    }
    catch(e){
        console.log('Error: ', e);
    }
}

const msg = process.argv.slice(2).join(' ') || 'Hello';
sendQueue({msg})