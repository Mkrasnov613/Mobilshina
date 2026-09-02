import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ZONE_CHIPS = ["Одеса, центр", "Котовського", "Таїрова", "Совіньйон", "Фонтанка", "Передмістя"];

export default function ZoneMap() {
  return (
    <Paper elevation={1} sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          height: 280,
          display: "flex",
          alignItems: "flex-end",
          p: 2,
          backgroundColor: "#DDE1EA",
          backgroundImage:
            "linear-gradient(rgba(20,27,184,0.10), rgba(20,27,184,0.10)), url('/images/backgrounds/location-mobilshina.png')",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center, center",
          backgroundSize: "cover, 56px",
        }}
      >
        <Typography
          variant="caption"
          sx={{ bgcolor: "rgba(255,255,255,0.9)", px: 1.25, py: 0.75, borderRadius: 1, color: "text.secondary" }}
        >
          Тут буде інтерактивна мапа зони виїзду
        </Typography>
      </Box>
      <Stack spacing={1.5} sx={{ p: 3 }}>
        <Typography variant="h4" component="h2">
          Зона виїзду
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {ZONE_CHIPS.map((zone) => (
            <Chip key={zone} label={zone} sx={{ bgcolor: "#E8EAF6", color: "primary.main", fontWeight: 500 }} />
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Виїжджаємо і за межі міста — вартість залежить від відстані, диспетчер порахує при
          дзвінку.
        </Typography>
      </Stack>
    </Paper>
  );
}
