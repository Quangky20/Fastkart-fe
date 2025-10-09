import type { ReactElement } from "react";
import type { IconType } from "react-icons";

export type Menu = {
  label: string;
  to: string;
  icon: ReactElement<IconType>;
  badge?: number;
  active?: boolean;
  isTitle?: boolean;
  children?: Menu[];
};
