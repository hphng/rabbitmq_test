const amqplib = require('amqplib');

//.env
const amqp_url_cloud = 'amqps://soyrnxjn:RirFUZxVhCyMFYyt-rtzkZf361QX3aCu@armadillo.rmq.cloudamqp.com/soyrnxjn'

const postVideo = async({msg}) => {
    try{

        //create connect
        const conn = await amqplib.connect(amqp_url_cloud)
        //create channel
        const channel = await conn.createChannel()
        //create exchange
        const nameExchange = 'video';

        await channel.assertExchange(nameExchange, 'fanout', {
            durable: false
        })
        //publish video

        await channel.publish(nameExchange, '', Buffer.from(msg))

        console.log('[x] send ok:: ' ,msg)

        setTimeout(function() {
            conn.close();
            process.exit(0)
        }, 2000)
    } catch (e) {
        console.error(e.message);
    }
} 


const msg = process.argv.slice(2).join(" ") || 'Hello Exchange'
postVideo({msg})