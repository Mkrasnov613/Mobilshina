const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

// CORS for Live Server
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'],
  credentials: true
}));

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contentful API
const SPACE_ID = process.env.SPACE_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

app.get('/api/prices', async (req, res) => {
  try {
    const servicesRes = await fetch(`${BASE_URL}/entries?content_type=service`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });

    const infoRes = await fetch(`${BASE_URL}/entries?content_type=priceInfo`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });

    const services = await servicesRes.json();
    const priceInfo = await infoRes.json();

    res.json({ services, priceInfo });

  } catch (err) {
    console.error('Ошибка:', err);
    res.status(500).json({ error: err.message });
  }
});

// Email send
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Заповніть усі поля!' });
  }

	console.log('email user:', process.env.EMAIL_USER);
	console.log('email pass:', process.env.EMAIL_PASS);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: 'Нове повідомлення з форми зворотного звʼязку',
      text: message,
      html: `<p><strong>Ім'я:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Повідомлення:</strong><br>${message}</p>`,
    });

    res.json({ success: true, message: 'Лист надіслано!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не вдалося надіслати листа' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
