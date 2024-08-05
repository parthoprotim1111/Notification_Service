const express = require('express');
const amqplib = require('amqplib');
const { ServerConfig,emailConfig } = require('./config');
const apiRoutes = require('./routes');
const { emailService } = require('./services');
const app = express();



async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("notification-queue");
        channel.consume("notification-queue",async (data)=>{
            console.log(data)
            console.log(`${Buffer.from(data.content)}`);
            let object;
            try {
                object = JSON.parse(`${Buffer.from(data.content)}`);
            } catch (error) {
                channel.ack(data);
                return;
                
            }
            await emailService.sendEmails(ServerConfig.GMAIL_EMAIL,object.recepientEmail, object.subject,object.text)
            channel.ack(data);
        })

    } catch (error) {
        console.log(error)
        
    }
    
}


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // to parse JSON bodies




app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // try {
    //     const res= await emailConfig.sendMail({
    //         from: ServerConfig.GMAIL_EMAIL,
    //         to: "fotavo6901@alientex.com",
    //         subject: "Server Testing",
    //         text: "It is working"
            
    //     })
    //     console.log(res)
    
    // } catch (error) {
    //     console.log(error)
        
    // }
    await connectQueue();
    console.log("Queue is UP")


});
