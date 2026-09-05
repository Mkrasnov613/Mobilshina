import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CallIcon from "@mui/icons-material/Call";
import HandymanIcon from "@mui/icons-material/Handyman";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import type { PricesView } from "@/utils/contentful";

const GROUPS: { title: string; icon: ReactNode; priceIds: string[] }[] = [
  {
    title: "Мінімальна вартість виклику",
    icon: <CallIcon color="primary" />,
    priceIds: [
      "price-min-call",
      "price-suv",
      "price-night",
      "price-cut",
      "price-steel",
      "price-alloy",
      "price-out-city",
    ],
  },
  {
    title: "«Перевзуття» автомобіля",
    icon: <SwapHorizIcon color="primary" />,
    priceIds: ["price-sedan", "price-suv-change", "price-22inch", "price-rft"],
  },
  {
    title: "Виїзд у випадку «Перевзуття»",
    icon: <LocalShippingIcon color="primary" />,
    priceIds: [
      "price-city",
      "price-city-night",
      "price-kotovsky",
      "price-kotovsky-night",
      "price-sovinyon",
    ],
  },
  {
    title: "Додаткові послуги",
    icon: <HandymanIcon color="primary" />,
    priceIds: ["price-start-engine", "price-fuel"],
  },
];

interface PriceGroupsProps {
  byId: PricesView["byId"];
  /** whether the Contentful view loaded successfully */
  hasView: boolean;
}

export default function PriceGroups({ byId, hasView }: PriceGroupsProps) {
  return (
    <Box>
      {!hasView && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Ціни тимчасово недоступні. Актуальну вартість уточнюйте за телефоном.
        </Alert>
      )}
      {GROUPS.map((group, index) => {
        const rows = group.priceIds
          .map((id) => byId[id])
          .filter((row): row is PricesView["byId"][string] => Boolean(row && (row.label || row.price)));
        return (
          <Accordion key={group.title} defaultExpanded={index === 0} disableGutters elevation={1}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, pr: 2 }}>
                {group.icon}
                <Typography sx={{ flex: 1, fontWeight: 500 }}>{group.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {rows.length} {rows.length === 1 ? "позиція" : "позицій"}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              {rows.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Уточнюйте за телефоном.
                </Typography>
              ) : (
                rows.map((row, i) => (
                  <Stack
                    key={`${group.title}-${i}`}
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ py: 1.75, borderTop: "1px solid", borderColor: "#EEE" }}
                  >
                    <Typography variant="body2">{row.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right" }}>
                      {row.price}
                    </Typography>
                  </Stack>
                ))
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
