const express = require('express');

const { ServerConfig,emailConfig } = require('./config');
const apiRoutes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // to parse JSON bodies




app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    try {
        const res= await emailConfig.sendMail({
            from: ServerConfig.GMAIL_EMAIL,
            to: "fotavo6901@alientex.com",
            subject: "Server Testing",
            text: "It is working"
            
        })
        console.log(res)
    
    } catch (error) {
        console.log(error)
        
    }

});
