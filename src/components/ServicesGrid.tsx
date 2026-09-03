"use client";

import CallIcon from "@mui/icons-material/Call";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AppLink from "@/components/AppLink";
import IconBadge from "@/components/IconBadge";
import ServiceIcon from "@/components/ServiceIcon";
import { reportConversion } from "@/lib/gtag";
import { PHONE_HREF } from "@/lib/nav";
import { SERVICES, SERVICE_FILTERS, type ServiceCategory } from "@/lib/services";

export default function ServicesGrid() {
  const [filter, setFilter] = useState<ServiceCategory | "all">("all");
  const visible = filter === "all" ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <>
      {/* Sticky filter bar */}
      <Box
        sx={{
          position: "sticky",
          top: { xs: 56, md: 64 },
          zIndex: 2,
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container>
          <Stack direction="row" spacing={1} sx={{ py: 2, overflowX: "auto" }}>
            {SERVICE_FILTERS.map((f) => (
              <Chip
                key={f.key}
                label={f.label}
                onClick={() => setFilter(f.key)}
                color={filter === f.key ? "primary" : "default"}
                variant={filter === f.key ? "filled" : "outlined"}
                sx={{ flexShrink: 0 }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "#F5F5F7", py: { xs: 4, md: 8 } }}>
        <Container>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
            {visible.map((service) => (
              <Paper
                key={service.title}
                elevation={1}
                sx={{ display: "flex", flexDirection: "column", transition: "box-shadow .2s", "&:hover": { boxShadow: 8 } }}
              >
                <Stack spacing={1.5} sx={{ p: 3, flex: 1 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <IconBadge size={44}>
                      <ServiceIcon name={service.icon} />
                    </IconBadge>
                    {service.popular && (
                      <Chip
                        label="Найчастіше"
                        size="small"
                        sx={{ bgcolor: "#E8F5E9", color: "#2E7D32", fontWeight: 500 }}
                      />
                    )}
                  </Stack>
                  <Typography variant="h4" component="h3">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                    {service.text}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={1} sx={{ p: 1.5 }}>
                  <Button
                    size="small"
                    startIcon={<CallIcon />}
                    component="a"
                    href={PHONE_HREF}
                    onClick={(e) => {
                      e.preventDefault();
                      reportConversion(PHONE_HREF);
                    }}
                  >
                    Замовити
                  </Button>
                  <Button size="small" color="inherit" component={AppLink} href="/prices" sx={{ color: "text.secondary" }}>
                    Ціна
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
