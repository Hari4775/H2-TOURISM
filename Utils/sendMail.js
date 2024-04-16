const nodemailer = require('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass:process.env.APP_PASSWORD,
    },
  });

  const mailOption={
    from: {
        name:"H2-Tourism",
        address:process.env.USER
    }, // sender address
    to: ["vinihavivek345@gamil.com"], // list of receivers
    subject: "PERMISSION GRANTED TO VISIT LAKSHADWEEP", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments:[
        {
            filename:'tes.pdf',
            path:path.join(__dirname,'tes.pdf'),
            contentType:"appplication/pdf"
        },
        {
            filename:'tes.pdf',
            path:path.join(__dirname,'tes.pdf'),
            contentType:"image/jpg"
        },
    ]
  }

  const sendMail = async (transporter,mailOption)=>{
    try{
        await transporter.sendMail(mailOption)
        console.log("email has been sent")

    }catch(error){
        console.log(error)
    }
  }

  sendMail(transporter,mailOption);