import type { MenuProps } from "antd";
import { NavLink, RouteObject } from "react-router-dom";
import { AreaChartOutlined, BarChartOutlined, OrderedListOutlined, WindowsOutlined } from "@ant-design/icons";

import Home from "@/views/home";
import List from "@/views/antd/list";
import AntToken from "@/views/antd/overview";
import Framework from "@/views/frame";
import Effect from "@/views/react/effect";
import { ChartDemo1, ChartDemo2 } from "@/views/echart";

type MenuItem = Required<MenuProps>["items"][number];

interface SystemMenu {
  id: number;
  title?: string;
  path?: string;
  index?: boolean;
  notMenu?: boolean;
  newTab?: boolean;
  frameless?: boolean;
  icon?: React.ReactNode;
  element?: React.ReactNode;
  children?: SystemMenu[];
  [propName: string]: any;
}

class ID {
  id: number = 0;
  public increment() {
    return ++this.id;
  }
}

const id = new ID();

const AppMenu: SystemMenu[] = [
  {
    id: id.increment(),
    path: "/",
    element: <Framework />,
    notMenu: true,
    children: [
      {
        id: id.increment(),
        index: true,
        notMenu: true,
        element: <Home />,
      },
      {
        id: id.increment(),
        path: "chart",
        title: "Chart",
        icon: <BarChartOutlined />,
        children: [
          {
            id: id.increment(),
            index: true,
            notMenu: true,
            element: <div>Chart</div>,
          },
          {
            id: id.increment(),
            path: "demo1",
            title: "Demo1",
            element: <ChartDemo1 />,
            icon: <AreaChartOutlined />,
          },
          {
            id: id.increment(),
            path: "demo2",
            title: "Demo2",
            element: <ChartDemo2 />,
            icon: <WindowsOutlined />,
          },
        ],
      },
      {
        id: id.increment(),
        path: "antc",
        title: "Antc",
        icon: <OrderedListOutlined />,
        children: [
          {
            id: id.increment(),
            path: "list",
            title: "List",
            element: <List />,
            icon: <OrderedListOutlined />,
          },
          {
            id: id.increment(),
            path: "token",
            title: "Token",
            element: <AntToken />,
            icon: <OrderedListOutlined />,
          },
        ],
      },
      {
        id: id.increment(),
        path: "react",
        title: "React",
        icon: <OrderedListOutlined />,
        children: [
          {
            id: id.increment(),
            path: "effect",
            title: "Effect",
            element: <Effect />,
            icon: <OrderedListOutlined />,
          },
        ],
      },
    ],
  },
];

/* new Array(20).fill(0).forEach((_v, i) =>
  AppMenu[0].children?.push({
    id: id.increment(),
    path: "antc/list",
    title: "List " + (i + 1),
    element: <List />,
    icon: <OrderedListOutlined />,
  })
); */

/**
 * 生成 `React Router` 路由对象。
 *
 * @param menus SystemMenus
 * @returns RouterObject
 */
function createRouterObject(menus: SystemMenu[]): RouteObject[] {
  return menus.map(({ path, element, index, children }) => {
    const router: RouteObject = { path, element, index };
    if (Array.isArray(children) && children.length > 0) {
      router.children = createRouterObject(children);
    }
    return router;
  });
}

/**
 * 生成系统菜单。
 *
 * ```ts
 *  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
 *    return { key, icon, children, label };
 * }
 * ```
 * @param menus SystemMenus
 * @returns Antd 菜单项
 */
function createAntdMenu(menus: SystemMenu[]): MenuItem[] {
  const menuItems = [];

  for (const menu of menus) {
    const hasChildren = Array.isArray(menu.children) && menu.children.length > 0;

    if (menu.notMenu) {
      if (hasChildren) {
        const antMenu = createAntdMenu(menu.children!);
        if (antMenu.length > 0) {
          menuItems.push(...antMenu);
        }
      }
    } else {
      const path = menu.prevPath ? menu.prevPath + "/" + menu.path : menu.path;

      const menuItem: any = {
        path: path, // 方便通过路由找到这个菜单项。
        key: menu.id + "",
        icon: menu.icon,
        label: <NavLink to={path as string}>{menu.title}</NavLink>,
      };

      if (hasChildren) {
        menu.children!.forEach((child) => (child.prevPath = menu.path));
        menuItem.children = createAntdMenu(menu.children!);
        // 有 children 就当不是路由。
        menuItem.label = menu.title;
      }
      menuItems.push(menuItem);
    }
  }
  return menuItems;
}

export { AppMenu, createRouterObject, createAntdMenu };
export type { SystemMenu };
