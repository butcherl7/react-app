import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import { useMemo, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { router } from "@/route";
import { ThemeType, ThemeContext } from "@/context";

dayjs.locale("zh-cn");
dayjs.extend(localizedFormat);

const Themes = [theme.defaultAlgorithm, theme.darkAlgorithm];

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  const themeContextValue = useMemo<ThemeType>(() => ({ isDarkMode, setDarkMode }), [isDarkMode]);

  return (
    <ConfigProvider
      locale={zhCN}
      componentSize="middle"
      wave={{ disabled: true }}
      theme={{
        algorithm: Themes[isDarkMode ? 1 : 0],
        token: { borderRadius: 4 },
        components: {
          Button: {
            defaultShadow: "",
            primaryShadow: "",
            contentFontSizeSM: 12,
          },
          Switch: {
            handleShadow: "",
          },
        },
      }}
    >
      <ThemeContext.Provider value={themeContextValue}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </ConfigProvider>
  );
}

export default App;
