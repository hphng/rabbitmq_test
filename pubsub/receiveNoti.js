const amqplib = require('amqplib');

//.env
const amqp_url_cloud = 'amqps://soyrnxjn:RirFUZxVhCyMFYyt-rtzkZf361QX3aCu@armadillo.rmq.cloudamqp.com/soyrnxjn'
const amqp_url_docker= 'ampq://localhost:5672';

const receiveNoti = async() => {
    try{

        //create connect
        const conn = await amqplib.connect(amqp_url_docker)
        //create channel
        const channel = await conn.createChannel()
        //create exchange
        const nameExchange = 'video';

        await channel.assertExchange(nameExchange, 'fanout', {
            durable: false
        })

        // create queue
        const {
            queue //name queue
        } = await channel.assertQueue('', {
            exclusive: true
        })
        console.log('name queue', queue);

        //binding
        await channel.bindQueue(queue, nameExchange, '')

        await channel.consume(queue, msg => {
            console.log("msg::", msg.content.toString());
        }, {
            noAck: true
        })



    } catch (e) {
        console.error(e.message);
    }
} 

receiveNoti()