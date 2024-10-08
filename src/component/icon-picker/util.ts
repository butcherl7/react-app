import React from "react";
import * as AntIconsObj from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

interface IconPickerProps {
  /**
   * 整体宽度。
   */
  width?: number | string;
  /**
   * 整体高度。
   */
  height?: number | string;
  /**
   * 是否显示搜索框。
   */
  showSearch?: boolean;
  /**
   * 搜索框宽度。
   */
  searchWidth?: number | string;
  /**
   * 是否显示已选择后的背景色。
   */
  showPickedBg?: boolean;
  /**
   * 选择（点击）图标后的回调。
   */
  onPick?: (icon: RefIcon) => void;
}

type IconName = keyof typeof AntIconsObj;

/**
 * 系统 SVG 图标。
 */
type RefIcon = React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;

const IconTypes: string[] = ["Outlined", "Filled", "TwoTone"];

/**
 * 所有图标的名称。
 */
const AppIconNames = Object.keys(AntIconsObj)
  .filter((key) => !!getIconType(key))
  .sort((a, b) => {
    const nameA = IconTypes.findIndex((type) => type === getIconType(a)) + a;
    const nameB = IconTypes.findIndex((type) => type === getIconType(b)) + b;
    return nameA.localeCompare(nameB);
  });

function getIconType(iconName: string) {
  if (iconName.endsWith(IconTypes[0])) return IconTypes[0];
  if (iconName.endsWith(IconTypes[1])) return IconTypes[1];
  if (iconName.endsWith(IconTypes[2])) return IconTypes[2];
  return null;
}

/**
 * 根据图标名称获取图标组件。
 * @param  name 图标名称。
 * @returns 图标组件，未找到则返回 `null`。
 */
function getIconByName(name?: string): RefIcon | null {
  if (!name) {
    return null;
  }
  if (!AppIconNames.includes(name)) {
    return null;
  }
  return AntIconsObj[name as IconName] as RefIcon;
}

export { AppIconNames, getIconByName };
export type { IconPickerProps, RefIcon };
