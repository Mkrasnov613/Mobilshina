import CalculateIcon from "@mui/icons-material/Calculate";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppLink from "@/components/AppLink";
import PhoneButton from "@/components/PhoneButton";

export default function PriceSidebar() {
  return (
    <Stack spacing={2} sx={{ position: { md: "sticky" }, top: { md: 88 } }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <SupportAgentIcon color="primary" />
            <Typography variant="h4" component="h2">
              Порахувати вашу ситуацію
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Скажіть район, тип авто і що сталося — назвемо точну суму одразу.
          </Typography>
          <PhoneButton variant="contained" size="large" fullWidth />
          <Button
            variant="outlined"
            fullWidth
            startIcon={<CalculateIcon />}
            component={AppLink}
            href="/#calculator"
          >
            Калькулятор
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ bgcolor: "#E8EAF6", p: 2.5 }}>
        <Stack direction="row" spacing={1.5}>
          <InfoIcon color="primary" sx={{ mt: 0.25 }} />
          <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.55 }}>
            Нічний виїзд (22:00–07:00) та адреси за межами міста тарифікуються окремо. Без
            сюрпризів на місці.
          </Typography>
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ bgcolor: "#E8F5E9", p: 2.5 }}>
        <Stack direction="row" spacing={1.5}>
          <PaymentsIcon sx={{ color: "#2E7D32", mt: 0.25 }} />
          <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.55 }}>
            Оплата на місці: готівка або картка. Для автопарків — безготівковий розрахунок і
            документи.
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}
