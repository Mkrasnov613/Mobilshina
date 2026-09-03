import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppLink from "@/components/AppLink";
import IconBadge from "@/components/IconBadge";
import Section from "@/components/Section";
import ServiceIcon from "@/components/ServiceIcon";
import { SERVICES } from "@/lib/services";

export default function ServicesPreview() {
  return (
    <Section
      tone="grey"
      overline="Послуги"
      title="Що робимо на виїзді"
      action={
        <AppLink
          href="/service"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            fontWeight: 500,
            textTransform: "uppercase",
            fontSize: 14,
          }}
        >
          Усі послуги <ArrowForwardIcon sx={{ fontSize: 18 }} />
        </AppLink>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {SERVICES.slice(0, 8).map((service) => (
          <Paper
            key={service.title}
            elevation={1}
            sx={{
              p: 3,
              height: "100%",
              transition: "box-shadow .2s",
              "&:hover": { boxShadow: 4 },
            }}
          >
            <Stack spacing={1.5}>
              <IconBadge>
                <ServiceIcon name={service.icon} />
              </IconBadge>
              <Typography variant="h5" component="h3">
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.text}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Section>
  );
}
