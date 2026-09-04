"use client";

import CallIcon from "@mui/icons-material/Call";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import {
  formatUah,
  NIGHT_WINDOW_LABEL,
  round50,
  type CarTypeKey,
  type ResolvedRates,
  type ServiceKey,
  type VisitType,
  type ZoneKey,
} from "@/constants/calculatorRates";
import { reportConversion } from "@/utils/gtag";
import { PHONE_HREF } from "@/utils/nav";

interface CalculatorCardProps {
  rates: ResolvedRates;
  /** "outlined" (Home) or "elevated" (Prices page). */
  variant?: "outlined" | "elevated";
}

/** "standard": 12″–18″, priced by car type. "large": 19″–22″, flat price regardless of car type. */
type WheelSize = "standard" | "large";

const CAR_SHORT: Record<CarTypeKey, string> = {
  car: "Легковий",
  suv: "Позашлях.",
  minibus: "Мікроавт.",
};

const FIELD_BG = "#EEF0FB";

const fieldSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  bgcolor: FIELD_BG,
  borderRadius: 2.5,
  px: 2,
  py: 1.5,
};

const labelSx: SxProps<Theme> = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#8E90B0",
  flexShrink: 0,
};

const selectSx: SxProps<Theme> = {
  "& .MuiInputBase-input": {
    p: 0,
    pr: "22px",
    textAlign: "right",
    fontSize: 15,
    fontWeight: 500,
    color: "text.primary",
  },
  "& .MuiSvgIcon-root": { color: "text.primary", right: 0 },
};

const toggleGroupSx: SxProps<Theme> = {
  bgcolor: FIELD_BG,
  borderRadius: 2.5,
  p: 0.5,
  gap: 0.5,
  "& .MuiToggleButton-root": {
    border: 0,
    borderRadius: "8px !important",
    py: 1,
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "text.secondary",
    "&.Mui-selected": {
      bgcolor: "primary.main",
      color: "#fff",
      "&:hover": { bgcolor: "primary.dark" },
    },
  },
};

export default function CalculatorCard({
  rates,
  variant = "outlined",
}: CalculatorCardProps) {
  const [visitType, setVisitType] = useState<VisitType>("repair");
  const [carType, setCarType] = useState<CarTypeKey>("car");
  const repairServices = useMemo(
    () =>
      rates.services.filter(
        (s) => s.key !== "minCall" && s.key !== "seasonalSet",
      ),
    [rates.services],
  );
  const [serviceKey, setServiceKey] = useState<ServiceKey>(
    repairServices[0]?.key ?? "cut",
  );
  const [zoneKey, setZoneKey] = useState<ZoneKey>(
    rates.zones[0]?.key ?? "center",
  );
  const [wheelSize, setWheelSize] = useState<WheelSize>("standard");
  const [runFlat, setRunFlat] = useState(false);
  const [outOfCity, setOutOfCity] = useState(false);
  const [distance, setDistance] = useState("10");
  const [night, setNight] = useState(false);

  const car =
    rates.carTypes.find((c) => c.key === carType) ?? rates.carTypes[0];
  const service = rates.services.find((s) => s.key === serviceKey);
  const zone = rates.zones.find((z) => z.key === zoneKey) ?? rates.zones[0];
  const isReshoeOutCity = visitType === "reshoe" && Boolean(zone?.perKm);
  // Night only has real pricing behind it for call-outs that add to the
  // мінімальний виїзд base — engine start / fuel delivery have no night price.
  const nightAffectsRepair =
    visitType === "repair" && service?.mode === "addon";

  const total = useMemo(() => {
    if (!car) return 0;
    const distanceKm = Number.parseFloat(distance) || 0;

    if (visitType === "reshoe") {
      const seasonal = rates.services.find((s) => s.key === "seasonalSet");
      if (!seasonal || !zone) return 0;
      const override = seasonal.overrides?.[carType];
      // 19″–22″ is a single flat price in the real list, regardless of car type.
      const seasonalAmount =
        wheelSize === "large"
          ? rates.seasonalSetLargeWheel
          : (override ?? seasonal.base * car.factor);
      const runFlatFee = runFlat ? rates.seasonalSetRunFlat : 0;
      const zoneAmount =
        night && zone.nightFee !== undefined ? zone.nightFee : zone.fee;
      const distanceFee = zone.perKm
        ? rates.outCityPerKm * Math.max(0, distanceKm)
        : 0;
      return round50(seasonalAmount + runFlatFee + zoneAmount + distanceFee);
    }

    if (!service) return 0;
    const minCall = rates.services.find((s) => s.key === "minCall");
    const minCallOverride = minCall?.overrides?.[carType];
    const dayCallOut = minCallOverride ?? (minCall?.base ?? 0) * car.factor;
    const callOut =
      night && service.mode === "addon" ? rates.nightCallOut : dayCallOut;

    const subtotal =
      service.mode === "standalone"
        ? (service.overrides?.[carType] ?? service.base)
        : callOut + service.base;
    const distanceFee = outOfCity
      ? rates.outCityPerKm * Math.max(0, distanceKm)
      : 0;
    return round50(subtotal + distanceFee);
  }, [
    rates,
    visitType,
    service,
    car,
    carType,
    zone,
    wheelSize,
    runFlat,
    outOfCity,
    distance,
    night,
  ]);

  return (
    <Paper
      elevation={variant === "elevated" ? 4 : 2}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        maxWidth: 480,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={2}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "primary.main",
          }}
        >
          Калькулятор виїзду
        </Typography>

        {/* result panel */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            borderRadius: 2.5,
            px: 3,
            py: 2.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Орієнтовна вартість
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 20, md: 24 },
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            від {formatUah(total)}
          </Typography>
        </Box>

        {/* visit type */}
        <ToggleButtonGroup
          exclusive
          fullWidth
          value={visitType}
          onChange={(_, value: VisitType | null) => {
            if (value) setVisitType(value);
          }}
          sx={toggleGroupSx}
        >
          <ToggleButton value="repair">Ремонт</ToggleButton>
          <ToggleButton value="reshoe">Перевзуття</ToggleButton>
        </ToggleButtonGroup>

        {/* car type */}
        <ToggleButtonGroup
          exclusive
          fullWidth
          value={carType}
          onChange={(_, value: CarTypeKey | null) => {
            if (value) setCarType(value);
          }}
          sx={toggleGroupSx}
        >
          {rates.carTypes.map((c) => (
            <ToggleButton key={c.key} value={c.key}>
              {CAR_SHORT[c.key] ?? c.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {visitType === "repair" ? (
          <>
            {/* service */}
            <Box sx={fieldSx}>
              <Typography sx={labelSx}>Послуга</Typography>
              <Select
                value={serviceKey}
                onChange={(e) => setServiceKey(e.target.value as ServiceKey)}
                input={<InputBase />}
                IconComponent={KeyboardArrowDownIcon}
                sx={selectSx}
                MenuProps={{ slotProps: { paper: { sx: { maxWidth: 320 } } } }}
              >
                {repairServices.map((s) => (
                  <MenuItem
                    key={s.key}
                    value={s.key}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {s.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* out of city */}
            <Box
              component="label"
              htmlFor="calc-outcity"
              sx={{ ...fieldSx, cursor: "pointer", py: 1 }}
            >
              <Typography sx={labelSx}>
                За містом ({rates.outCityPerKm} ₴/км)
              </Typography>
              <Checkbox
                id="calc-outcity"
                checked={outOfCity}
                onChange={(e) => setOutOfCity(e.target.checked)}
                sx={{ p: 0 }}
              />
            </Box>
            {outOfCity && (
              <Box sx={fieldSx}>
                <Typography sx={labelSx}>Відстань, км</Typography>
                <InputBase
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  slotProps={{
                    input: {
                      min: 0,
                      step: 1,
                      "aria-label": "Приблизна відстань у кілометрах",
                    },
                  }}
                  sx={{
                    maxWidth: 90,
                    "& input": {
                      p: 0,
                      textAlign: "right",
                      fontSize: 15,
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>
            )}
          </>
        ) : (
          <>
            {/* wheel size */}
            <ToggleButtonGroup
              exclusive
              fullWidth
              value={wheelSize}
              onChange={(_, value: WheelSize | null) => {
                if (value) setWheelSize(value);
              }}
              sx={toggleGroupSx}
            >
              <ToggleButton value="standard">12″–18″</ToggleButton>
              <ToggleButton value="large">19″–22″</ToggleButton>
            </ToggleButtonGroup>

            {/* run-flat / low-profile add-on */}
            <Box
              component="label"
              htmlFor="calc-runflat"
              sx={{ ...fieldSx, cursor: "pointer", py: 1 }}
            >
              <Typography sx={labelSx}>
                RunFlat, низький профіль (+{formatUah(rates.seasonalSetRunFlat)}
                )
              </Typography>
              <Checkbox
                id="calc-runflat"
                checked={runFlat}
                onChange={(e) => setRunFlat(e.target.checked)}
                sx={{ p: 0 }}
              />
            </Box>

            {/* zone */}
            <Box sx={fieldSx}>
              <Typography sx={labelSx}>Район</Typography>
              <Select
                value={zoneKey}
                onChange={(e) => setZoneKey(e.target.value as ZoneKey)}
                input={<InputBase />}
                IconComponent={KeyboardArrowDownIcon}
                sx={selectSx}
              >
                {rates.zones.map((z) => (
                  <MenuItem key={z.key} value={z.key}>
                    {z.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* distance — only for "Передмістя" */}
            {isReshoeOutCity && (
              <Box sx={fieldSx}>
                <Typography sx={labelSx}>Відстань, км</Typography>
                <InputBase
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  slotProps={{
                    input: {
                      min: 0,
                      step: 1,
                      "aria-label": "Приблизна відстань у кілометрах",
                    },
                  }}
                  sx={{
                    maxWidth: 90,
                    "& input": {
                      p: 0,
                      textAlign: "right",
                      fontSize: 15,
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}

        {/* night — hidden where no real night price applies (repair + engine start/fuel) */}
        {(visitType === "reshoe" || nightAffectsRepair) && (
          <Box
            component="label"
            htmlFor="calc-night"
            sx={{ ...fieldSx, cursor: "pointer", py: 1 }}
          >
            <Typography sx={labelSx}>
              Нічний виїзд {NIGHT_WINDOW_LABEL}
            </Typography>
            <Checkbox
              id="calc-night"
              checked={night}
              onChange={(e) => setNight(e.target.checked)}
              sx={{ p: 0 }}
            />
          </Box>
        )}

        <Button
          component="a"
          href={PHONE_HREF}
          variant="contained"
          size="large"
          fullWidth
          startIcon={<CallIcon />}
          onClick={(event) => {
            event.preventDefault();
            reportConversion(PHONE_HREF);
          }}
          sx={{ py: 1.5, borderRadius: 2.5 }}
        >
          Підтвердити ціну
        </Button>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Розрахунок орієнтовний, не є публічною офертою.
        </Typography>
      </Stack>
    </Paper>
  );
}
