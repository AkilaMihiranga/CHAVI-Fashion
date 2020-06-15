const nodemailer = require('nodemailer');

const auth = {
    host: "smtp.gmail.com",
    port: "587",
    secure: false, // true for 465, false for other ports
    auth: {
        user: "chavifashion.info@gmail.com",
        pass: "AFProject@2020"
    }
};


const transporter = nodemailer.createTransport(auth);

const sendMailToStoreManager = (first_Name, last_Name, email, password, cb) => {

    const bodyText = `Dear Sir/Madam
    Congratulations.!.We have selected you as a Store Manager of our ChaviFashion online store.
    Below is the email address and password you will receive for logging into our system.
    
    Email : ` + email + `
    Password : ` + password + `
    
    Thank You.`;

    const subject = 'Hello... ' + first_Name + ' ' + last_Name;

    const mailOption = {
        from: 'chavifashion.info@gmail.com',
        to: email,
        subject: subject,
        text: bodyText
    };
    
    transporter.sendMail(mailOption, function(err, data){
        if(err) {
            cb(err, null);
        }
        else {
            cb(null, data);
        }
    });
}

module.exports = sendMailToStoreManager;