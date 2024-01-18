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
  await sendMail({
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: `Prise de contact (${email})`,
    html: `
      <h1>${surname} ${name} souhaite vous contacter.</h1>
      <h2>Message :</h2>
      <p>${area}</p>
    `
  });
  res.status(200).json({ message: 'Message envoyé' })
});

module.exports = app;
