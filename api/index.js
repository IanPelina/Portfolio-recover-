const app = require('express')();

const works = require("./data/works");

const sendMail = require("./services/nodemailer");

const cors = require('cors');

app .use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))

app.use(require('express').json())

// Route pour récupérer les works 
app.get("/api/works", (req, res) => {
  res.status(200).json({ works });
});
// Route pour récupérer un work via son id
app.get("/api/works/:id", (req, res) => {
  const { id } = req.params;
  const work = works.find((work) => work.id === id);
  res.status(200).json({ work });
});
// Route pour permettre l'envoi d'email via le formulaire
app.post("/api/mail", async (req, res) => {
  const { name, surname, email, area } = req.body;
  const firstNameLetter = name[0]; 
  const remainingNameLetters = name.slice(1); 
  const firstSurnameLetter = surname[0];
  const remainingSurnameLetters = surname.slice(1);
  
  await sendMail({
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: `Prise de contact (${email})`,
    html: `
      <div style="background: #140036; border-radius: 10px; padding: 15px">
        <div style="display: flex">
          <h2 style="margin: 0; color: white;">${firstSurnameLetter.toUpperCase() + remainingSurnameLetters.toLowerCase()} ${firstNameLetter.toUpperCase() + remainingNameLetters.toLowerCase()}</h2>
          <p style="margin: 7px 0 0 5px; color: white;">a pris contact via votre portfolio.</p>
        </div>
        <h3 style="text-decoration: underline; color: white;">Contenu du message:</h3>
        <p style="color: white;">${area}</p>
      </div>
    `
  });
  res.status(200).json({ message: 'Message envoyé' })
});

module.exports = app;
