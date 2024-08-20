const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/send-email', (req, res) => {
  const { nombre, email, motivo, mensaje } = req.body;

  // Configurar el transporte del correo
  let transporter = nodemailer.createTransport({
    service: 'gmail',  // O usa tu propio servicio de correo
    auth: {
      user: 'serviciosleep25gmail.com@gmail.com',
      pass: 'Sleeptrack2525'
    }
  });

  // Configurar el contenido del correo
  let mailOptions = {
    from: email,
    to: 'serviciosleep25@gmail.com',
    subject: motivo,
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
