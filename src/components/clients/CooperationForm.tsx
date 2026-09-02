import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ContactForm from "@/components/ContactForm";

export default function CooperationForm() {
  return (
    <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="h3" component="h2" sx={{ fontWeight: 400 }}>
          Для співпраці
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Автопарк, СТО, партнерство — заповніть форму, відповімо на e-mail протягом робочого
          дня.
        </Typography>
      </Stack>
      <ContactForm />
    </Paper>
  );
}
