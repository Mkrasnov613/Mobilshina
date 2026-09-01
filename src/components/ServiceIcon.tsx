import AirIcon from "@mui/icons-material/Air";
import BalanceIcon from "@mui/icons-material/Balance";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HandymanIcon from "@mui/icons-material/Handyman";
import HealingIcon from "@mui/icons-material/Healing";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType } from "react";

const MAP: Record<string, ComponentType<SvgIconProps>> = {
  air: AirIcon,
  balance: BalanceIcon,
  battery_charging_full: BatteryChargingFullIcon,
  build_circle: BuildCircleIcon,
  directions_car: DirectionsCarIcon,
  handyman: HandymanIcon,
  healing: HealingIcon,
  local_gas_station: LocalGasStationIcon,
  local_shipping: LocalShippingIcon,
  shopping_cart: ShoppingCartIcon,
  swap_horiz: SwapHorizIcon,
  tire_repair: TireRepairIcon,
};

export default function ServiceIcon({ name, ...props }: { name: string } & SvgIconProps) {
  const Icon = MAP[name] ?? BuildCircleIcon;
  return <Icon {...props} />;
}
