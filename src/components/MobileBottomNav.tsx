"use client";

import BuildIcon from "@mui/icons-material/BuildOutlined";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import PaymentsIcon from "@mui/icons-material/PaymentsOutlined";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { reportConversion } from "@/utils/gtag";
import { PHONE_HREF } from "@/utils/nav";

const ITEMS = [
  { href: "/", label: "Головна", icon: <HomeIcon /> },
  { href: "/service", label: "Послуги", icon: <BuildIcon /> },
  { href: "/prices", label: "Ціни", icon: <PaymentsIcon /> },
  { href: "/clients", label: "Контакти", icon: <PlaceIcon /> },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const current = ITEMS.findIndex((i) =>
    i.href === "/" ? pathname === "/" : pathname.startsWith(i.href),
  );

  return (
    <Paper
      elevation={0}
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (t) => t.zIndex.appBar,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Fab
          color="primary"
          aria-label="Зателефонувати"
          component="a"
          href={PHONE_HREF}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            reportConversion(PHONE_HREF);
          }}
          sx={{
            position: "absolute",
            top: -28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <CallIcon />
        </Fab>
        <BottomNavigation showLabels value={current} sx={{ height: 64 }}>
          {ITEMS.map((item, index) => (
            <BottomNavigationAction
              key={item.href}
              component={Link}
              href={item.href}
              label={item.label}
              icon={item.icon}
              // Leave a gap in the middle for the FAB
              sx={index === 1 ? { mr: 4.5 } : index === 2 ? { ml: 4.5 } : undefined}
            />
          ))}
        </BottomNavigation>
      </Box>
    </Paper>
  );
}
