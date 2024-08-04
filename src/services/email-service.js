const {ticketRepository} = require('../repositories');
const {emailConfig} = require('../config');
const ticketRepo = new ticketRepository();


async function sendEmails(mailFrom,mailTo,subject,text) {
    try {
        const response= await emailConfig.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        })
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



async function createTicket(data) {
    try {
        const response = await ticketRepo.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
    
}

async function getPendingEmails() {
    try {
        const response = await ticketRepo.getPendingTickets();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
    
}



module.exports={
    sendEmails,
    createTicket,
    getPendingEmails


}