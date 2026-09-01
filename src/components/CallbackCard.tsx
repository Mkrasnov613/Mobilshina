"use client";

import LockIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { reportConversion } from "@/lib/gtag";

type Status = "idle" | "sending" | "success" | "error";

export default function CallbackCard() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/callback", {
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
        setError(body.error ?? "Не вдалося надіслати заявку");
      }
    } catch {
      setStatus("error");
      setError("Сервер не відповідає.");
    }
  }

  return (
    <Paper elevation={8} sx={{ p: 3, width: "100%" }}>
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="h4" component="h2">
          Викликати майстра
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Передзвонимо протягом 2 хвилин і назвемо точну вартість.
        </Typography>
      </Stack>

      {status === "success" ? (
        <Alert severity="success" sx={{ my: 1 }}>
          Дякуємо! Диспетчер зателефонує вам найближчим часом.
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField name="name" label="Ваше ім'я" fullWidth placeholder="Сергій" />
            <TextField
              name="phone"
              label="Телефон"
              type="tel"
              required
              fullWidth
              placeholder="+38 (0__) ___ __ __"
            />
            <TextField
              name="location"
              label="Де ви зараз"
              fullWidth
              placeholder="вул. Канатна 22 / траса М-05, 12 км"
            />
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
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={status === "sending"}
            >
              {status === "sending" ? <CircularProgress size={22} color="inherit" /> : "Викликати майстра"}
            </Button>
          </Stack>
        </Box>
      )}

      <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mt: 2 }}>
        <LockIcon sx={{ fontSize: 18, color: "success.main" }} />
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          Ваш номер потрібен лише для дзвінка диспетчера.
        </Typography>
      </Stack>
    </Paper>
  );
}
