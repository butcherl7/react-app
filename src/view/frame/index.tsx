import { Outlet, useLocation } from "react-router-dom";
import { useContext, useMemo, useRef, useState } from "react";
import { Layout, Menu, FloatButton, MenuProps, theme } from "antd";

import { ThemeContext } from "@/context";
import { APP_MENUS, createAntdMenu, AppMenu } from "@/route/menu";

import styles from "./index.module.scss";

const { Sider, Content } = Layout;

export default function Framework() {
  const location = useLocation();
  const contentRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  const themeContext = useContext(ThemeContext);
  const menuTheme = themeContext.isDarkMode ? "dark" : "dark"; // always dark

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 只在页面初次加载时执行一次。
  const menuMemo = useMemo(() => {
    const pathname = location.pathname;
    const menuItems = createAntdMenu(APP_MENUS);
    const rootMenuKeys = findRootMenuKeys(APP_MENUS);

    const initialOpenKeys = findOpenKeys(menuItems, pathname);
    const initialSelectedKey = initialOpenKeys.length > 0 ? [initialOpenKeys[0]] : [];

    // 系统菜单，一级菜单 key，初次打开的菜单 key，初次选中的菜单 key
    return { menuItems, rootMenuKeys, initialOpenKeys, initialSelectedKey };
  }, []);

  const [openKeys, setOpenKeys] = useState<string[]>(menuMemo.initialOpenKeys);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && menuMemo.rootMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout className={styles.layout}>
      <Sider
        collapsible
        theme={menuTheme}
        collapsed={collapsed}
        className={styles.sider}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.logo} />
        <Menu
          mode="inline"
          theme={menuTheme}
          openKeys={openKeys}
          className={styles.menu}
          items={menuMemo.menuItems}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={menuMemo.initialSelectedKey}
        />
      </Sider>

      <Layout className={styles.center} style={{ background: colorBgContainer }}>
        {/* <div className={styles.header}></div> */}
        <Content className={styles.content} ref={contentRef}>
          <Outlet />
          <FloatButton.BackTop target={() => contentRef.current!} />
        </Content>
      </Layout>
    </Layout>
  );
}

/**
 * 获取所有一级菜单的 key.
 */
function findRootMenuKeys(menus: AppMenu[]): string[] {
  const roots = [];

  for (const menu of menus) {
    if (menu.path === "/") {
      menu.children?.forEach((child) => !child.index && roots.push(child.id));
    } else {
      !menu.notMenu && roots.push(menu.id);
    }
  }
  return roots.map((v) => v + "");
}

/**
 * 根据当前的路由找到要打开的菜单。
 *
 * @param menus 系统菜单。
 * @param pathname 当前的路由地址。
 * @param openKeys 所有要打开的菜单 key 数组，调用时传空数组。
 * @returns 所有要打开的菜单 key 数组
 */
const findOpenKeys = (menus: any, pathname: string) => {
  const f = (menus: any, pathname: string, openKeys: string[]): string[] => {
    for (const { key, path, children } of menus) {
      if (path === pathname || "/" + path === pathname) {
        openKeys.push(key);
        return openKeys;
      }
      if (Array.isArray(children) && children.length > 0) {
        if (f(children, pathname, openKeys).length > 0) {
          openKeys.push(key); // push parent key.
          return openKeys;
        }
      }
    }
    return openKeys;
  };

  return f(menus, pathname, []).map((key) => key + "");
};
