import { Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, FloatButton, MenuProps } from "antd";
import React, { useContext, useMemo, useRef, useState } from "react";

import { ThemeContext } from "@/context";

import type { AppMenu } from "@/route/menu";
import { APP_MENUS, createAntdMenu } from "@/route/menu";

import styles from "./index.module.scss";

const { Sider, Content } = Layout;

const Framework: React.FC = () => {
  const location = useLocation();
  const contentRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  const themeContext = useContext(ThemeContext);
  const menuTheme = themeContext.isDarkMode ? "dark" : "dark"; // always dark

  // 只在页面初次加载时执行一次。
  const menuMemo = useMemo(() => {
    const pathname = location.pathname;
    const menuItems = createAntdMenu(APP_MENUS);
    const rootMenuKeys = getRootMenuKeys(APP_MENUS);

    const openKeys = findkeys(menuItems, pathname, []);
    const selectedKeys = openKeys.length > 0 ? [openKeys[0]] : [];

    return { menuItems, rootMenuKeys, openKeys, selectedKeys };
  }, []);

  const [openKeys, setOpenKeys] = useState<string[]>(menuMemo.openKeys);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && menuMemo.rootMenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout className={styles.layout}>
      <Sider
        theme={menuTheme}
        collapsible
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
          defaultSelectedKeys={menuMemo.selectedKeys}
        />
      </Sider>

      <Layout className={styles.center}>
        {/* <div className={styles.header}></div> */}
        <Content className={styles.content} ref={contentRef}>
          <Outlet />
          <FloatButton.BackTop target={() => contentRef.current!} />
        </Content>
      </Layout>
    </Layout>
  );
};

/**
 * 获取所有一级菜单的 key.
 */
function getRootMenuKeys(menus: AppMenu[]): string[] {
  const roots: number[] = [];

  for (const menu of menus) {
    if (menu.path === "/") {
      menu.children?.forEach((child) => !child.notMenu && roots.push(child.id));
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
const findkeys = (menus: any, pathname: string, openKeys: string[]): string[] => {
  for (const { key, path, children } of menus) {
    if (path === pathname || "/" + path === pathname) {
      openKeys.push(key);
      return openKeys;
    }
    if (Array.isArray(children) && children.length > 0) {
      if (findkeys(children, pathname, openKeys).length > 0) {
        openKeys.push(key); // push parent key.
        return openKeys;
      }
    }
  }
  return openKeys;
};

export default Framework;
