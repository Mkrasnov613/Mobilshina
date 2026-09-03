import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/MailOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ContactCard from "@/components/clients/ContactCard";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, SCHEDULE_LONG } from "@/lib/nav";

export default function ContactCards() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box component="a" href={PHONE_HREF} sx={{ textDecoration: "none" }}>
        <ContactCard icon={<CallIcon />} label="Телефон · 24/7" tone="blue">
          <Typography sx={{ fontSize: 22, fontWeight: 500, color: "#fff" }}>
            {PHONE_DISPLAY}
          </Typography>
        </ContactCard>
      </Box>
      <ContactCard icon={<MailIcon />} label="E-mail">
        <Link
          href={`mailto:${EMAIL}`}
          underline="hover"
          sx={{ fontWeight: 500 }}
        >
          {EMAIL}
        </Link>
      </ContactCard>
      <ContactCard icon={<ScheduleIcon />} label="Графік">
        <Typography sx={{ fontWeight: 500 }}>{SCHEDULE_LONG}</Typography>
      </ContactCard>
    </Box>
  );
}
