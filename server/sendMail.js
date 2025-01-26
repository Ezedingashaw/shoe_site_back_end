const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "ezedingashaw@gmail.com",
        pass: "ngip sphb hzne qtzs",
    }, 
});

async function main() {
    const info = await transporter.sendMail({
        from: '"Shoe 👻" <ezedingashaw@gmail.com>',
        to: "gae414958@gmail.com",
        subject: "Registered ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    });

    console.log(info.messageId);
};

module.exports = main;