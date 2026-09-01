"use client";

import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { reportConversion } from "@/lib/gtag";
import { NAV_ITEMS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const Logo = ({ width = 150 }: { width?: number }) => (
  <Box component={Link} href="/" sx={{ display: "flex", flexShrink: 0 }} aria-label="Мобілшина, головна">
    <Image
      src="/images/brand/logo-mobilshina.png"
      alt="Мобілшина"
      width={width}
      height={Math.round(width * 0.32)}
      priority
      style={{ width, height: "auto", filter: "brightness(0) invert(1)" }}
    />
  </Box>
);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{ bgcolor: "primary.main", top: 0 }}
    >
      <Container disableGutters sx={{ px: { xs: 0, sm: 3 } }}>
        {/* Desktop */}
        <Toolbar
          disableGutters
          sx={{ display: { xs: "none", md: "flex" }, height: 64, minHeight: 64, gap: 5, px: { sm: 0 } }}
        >
          <Logo />
          <Box component="nav" sx={{ flex: 1, display: "flex", alignSelf: "stretch" }}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Box
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.02857em",
                    textTransform: "uppercase",
                    color: active ? "#fff" : "rgba(255,255,255,0.72)",
                    borderBottom: "2px solid",
                    borderColor: active ? "#fff" : "transparent",
                    transition: "background-color .2s, color .2s",
                    "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
                  }}
                >
                  {item.label}
                </Box>
              );
            })}
          </Box>
          <Button
            component="a"
            href={PHONE_HREF}
            onClick={(e) => {
              e.preventDefault();
              reportConversion(PHONE_HREF);
            }}
            startIcon={<CallIcon />}
            sx={{
              flexShrink: 0,
              bgcolor: "#fff",
              color: "primary.main",
              "&:hover": { bgcolor: "#f1f1f7" },
            }}
          >
            {PHONE_DISPLAY}
          </Button>
        </Toolbar>

        {/* Mobile */}
        <Toolbar
          sx={{ display: { xs: "flex", md: "none" }, height: 56, minHeight: 56, gap: 0.5, px: 1 }}
        >
          <Box sx={{ pl: 1 }}>
            <Logo width={124} />
          </Box>
          <Box sx={{ flex: 1 }} />
          <IconButton
            aria-label="Зателефонувати"
            component="a"
            href={PHONE_HREF}
            onClick={(e) => {
              e.preventDefault();
              reportConversion(PHONE_HREF);
            }}
            sx={{ color: "#fff" }}
          >
            <CallIcon />
          </IconButton>
          <IconButton aria-label="Меню" onClick={() => setOpen(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300 }} role="presentation">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ bgcolor: "primary.main", px: 2, height: 56 }}>
            <Logo width={124} />
            <IconButton aria-label="Закрити" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List onClick={() => setOpen(false)}>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                selected={isActive(pathname, item.href)}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { textTransform: "uppercase", fontWeight: 500, fontSize: 14 } } }}
                />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CallIcon />}
              component="a"
              href={PHONE_HREF}
              onClick={() => reportConversion()}
            >
              {PHONE_DISPLAY}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
