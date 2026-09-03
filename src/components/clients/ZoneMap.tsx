import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ZONE_CHIPS = ["Одеса, центр", "Котовського", "Таїрова", "Совіньйон", "Фонтанка", "Передмістя"];

/** Google Business Profile location — вулиця Шота Руставелі, Одеса. */
const MAP_LAT = 46.4527848;
const MAP_LON = 30.7151341;
const bbox = [MAP_LON - 0.006, MAP_LAT - 0.004, MAP_LON + 0.006, MAP_LAT + 0.004]
  .map((n) => n.toFixed(6))
  .join("%2C");
const MAP_EMBED_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${MAP_LAT}%2C${MAP_LON}`;
const MAP_LINK = `https://www.openstreetmap.org/?mlat=${MAP_LAT}&mlon=${MAP_LON}#map=15/${MAP_LAT}/${MAP_LON}`;

export default function ZoneMap() {
  return (
    <Paper elevation={1} sx={{ overflow: "hidden" }}>
      <Box sx={{ position: "relative", height: 280 }}>
        <Box
          component="iframe"
          src={MAP_EMBED_SRC}
          title="Мапа: вулиця Шота Руставелі, Одеса"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sx={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
        <Typography
          variant="caption"
          component="a"
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            position: "absolute",
            left: 12,
            bottom: 12,
            bgcolor: "rgba(255,255,255,0.9)",
            px: 1.25,
            py: 0.75,
            borderRadius: 1,
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Відкрити мапу
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
