import React from "react";

export type ThemeType = {
  /**
   * 当前是否已启用深色模式。
   */
  isDarkMode: boolean;
  /**
   * 设置是否启用深色模式。
   *
   * @param dark true 表示启用深色模式。
   */
  setDarkMode: (dark: boolean) => void;
};

export const ThemeContext = React.createContext<ThemeType>({
  isDarkMode: false,
  setDarkMode: () => {},
});
