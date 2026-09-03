import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const STATS = [
  { value: "2010", label: "рік заснування" },
  { value: "2 брати", label: "засновники" },
  { value: "24/7", label: "режим роботи" },
  { value: "21 день", label: "велозбір коштів" },
];

export default function CompanyStats() {
  return (
    <Box sx={{ bgcolor: "primary.dark", color: "#fff" }}>
      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" } }}>
          {STATS.map((stat, index) => (
            <Box
              key={stat.label}
              sx={{
                textAlign: "center",
                py: 3,
                borderRight: { md: index < 3 ? "1px solid rgba(255,255,255,0.14)" : "none" },
              }}
            >
              <Typography sx={{ fontSize: 34, fontWeight: 400 }}>{stat.value}</Typography>
              <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{stat.label}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
