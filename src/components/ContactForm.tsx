"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { reportConversion } from "@/lib/gtag";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (res.ok && body.success) {
        reportConversion();
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(body.error ?? "Не вдалося надіслати листа");
      }
    } catch {
      setStatus("error");
      setError("Сервер не відповідає.");
    }
  }

  if (status === "success") {
    return (
      <Alert severity="success" sx={{ my: 1 }}>
        Дякуємо! Ваше повідомлення надіслано — відповімо на e-mail протягом робочого дня.
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          <TextField name="name" label="Ім'я та прізвище" required fullWidth />
          <TextField name="company" label="Компанія" fullWidth />
          <TextField name="email" label="E-mail" type="email" required fullWidth />
          <TextField name="phone" label="Телефон" type="tel" fullWidth />
        </Box>
        <TextField name="message" label="Повідомлення" required fullWidth multiline minRows={4} />

        {/* honeypot */}
        <Box
          component="input"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          sx={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />

        {status === "error" && <Alert severity="error">{error}</Alert>}

        <Stack direction="row" spacing={2} alignItems="center">
          <Button type="submit" variant="contained" size="large" disabled={status === "sending"}>
            {status === "sending" ? <CircularProgress size={22} color="inherit" /> : "Відправити"}
          </Button>
          <Typography variant="caption" color="text.secondary">
            Поля з * обов&apos;язкові
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
