const nodemailer = require("nodemailer");

function sendEmail(message){
    return new Promise((res,rej)=>{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD
            }
        })
        transporter.sendMail(message, function(err,info){
            if(err){
                rej(err);
            }else{
                res(info)
            }
        })
    })
}

exports.sendConfirmationEmail = function({toUser, id}){
    const message = {
        from: 'Concern TEAM 👥 <mz.cosia@gmail.com>',
        to: toUser.email,
        subject: 'Activate Account',
        html:`
        <h3> Hello Mate </h3>
        <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To active your accout please follow this link: <a target="_" href="${process.env.DOMAIN}activate/${id}"> activate </a></p>
        <p>chears</p>
        `
    }
    return sendEmail(message)
}
