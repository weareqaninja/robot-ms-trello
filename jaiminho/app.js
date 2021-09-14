const nodemailer = require('nodemailer');

require('dotenv').config()

var amqp = require('amqplib/callback_api');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});


amqp.connect(process.env.AMQP_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        const q = process.env.QUEUE_NAME;

        ch.assertQueue(q, { durable: true });
        ch.prefetch(1);
        console.log(" [*] Aguardando mensagens na fila %s. Para sair use: CTRL+C", q);
        ch.consume(q, function (msg) {

            var msgJSON = JSON.parse(msg.content.toString());
            console.log(msgJSON)
            const mailOptions = {
                from: 'admin@trello-clone.qaninja.academy',
                to: msgJSON.email,
                subject: 'E-mail enviado!',
                html: msgJSON.html
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(" [x] Enviando email => %s", msg.content.toString());
                }
            });

        }, { noAck: true });
    });
});




