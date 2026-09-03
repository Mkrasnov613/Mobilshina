import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhoneButton from "@/components/PhoneButton";

export default function FleetBand() {
  return (
    <Paper elevation={0} sx={{ bgcolor: "#14141C", color: "#fff", p: { xs: 3, md: 4 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2.5} alignItems="center">
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LocalShippingIcon />
          </Box>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 400 }}>
              Автопарк від 3 авто
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
              Спеціальні умови, виїзд за графіком, окремий контакт для менеджера, безготівковий
              розрахунок.
            </Typography>
          </Box>
        </Stack>
        <PhoneButton
          variant="contained"
          size="large"
          withIcon={false}
          sx={{ bgcolor: "#fff", color: "#14141C", flexShrink: 0, "&:hover": { bgcolor: "#f1f1f7" } }}
        >
          Обговорити умови
        </PhoneButton>
      </Stack>
    </Paper>
  );
}
