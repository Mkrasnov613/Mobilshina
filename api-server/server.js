const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Security Middleware
app.use(helmet()); 

// Limit body size to prevent abuse
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//prevents basic DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 4, 
  message: { error: "Too many requests, please try again later." },
});

// CORS Configuration
app.use(
  cors({
    origin: ["https://mobilshina.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Contentful API
const SPACE_ID = process.env.SPACE_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

app.get("/api/prices", async (req, res) => {
  try {
    const servicesRes = await fetch(
      `${BASE_URL}/entries?content_type=service`,
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    );

    const infoRes = await fetch(`${BASE_URL}/entries?content_type=priceInfo`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });

    const services = await servicesRes.json();
    const priceInfo = await infoRes.json();

    res.json({ services, priceInfo });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.post(
  "/api/send-email",
	limiter,
  [
    body("name").trim().escape().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("message").trim().escape().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Invalid input", details: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_TO,
        subject: "Нове повідомлення з форми зворотного звʼязку",
        text: message,
        html: `<p><strong>Ім'я:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Повідомлення:</strong><br>${message}</p>`,
      });

      res.json({ success: true, message: "Лист надіслано!" });
    } catch (err) {
      console.error("Email error:", err);
      res.status(500).json({ error: "Не вдалося надіслати листа" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running securely on http://localhost:${PORT}`);
});
