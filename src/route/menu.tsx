import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { AreaChartOutlined, BarChartOutlined, OrderedListOutlined, WindowsOutlined } from "@ant-design/icons";

import Home from "@/views/home";
import Framework from "@/views/frame";
import Effect from "@/views/react/effect";

type MenuItem = Required<MenuProps>["items"][number];

/**
 * 菜单结构。
 */
interface AppMenu {
  /**
   * 菜单 ID
   */
  id: number;

  /**
   * 菜单标题
   */
  title?: string;

  /**
   * 菜单路径
   */
  path?: string;

  /**
   * 组件文件路径
   */
  filepath?: string;

  /**
   * 在新标签页打开
   */
  openInNewTab?: boolean;

  /**
   * 是否不需要框架
   */
  frameless?: boolean;

  /**
   * 子菜单
   */
  children?: AppMenu[];

  /**
   * 菜单图标
   */
  icon?: React.ReactNode;

  /**
   * 菜单元素
   */
  element?: React.ReactNode;

  /**
   * 是否是 `Index Route`。
   * @see https://reactrouter.com/en/main/start/concepts#index-routes
   */
  index?: boolean;

  /**
   * 其它属性
   */
  [propName: string]: any;
}

function IDGenerator() {
  let id = 0;
  return {
    increment: function () {
      return id++;
    },
  };
}

const ID = IDGenerator();

/**
 * 系统菜单。
 */
const APP_MENUS: AppMenu[] = [
  {
    id: ID.increment(),
    path: "/",
    element: <Framework />,
    children: [
      {
        id: ID.increment(),
        index: true,
        element: <Home />,
      },
      {
        id: ID.increment(),
        path: "chart",
        title: "Chart",
        icon: <BarChartOutlined />,
        children: [
          {
            id: ID.increment(),
            index: true,
            element: <div>Chart</div>,
          },
          {
            id: ID.increment(),
            path: "demo1",
            title: "Demo1",
            filepath: "/src/views/echart/demo1/index.tsx",
            icon: <AreaChartOutlined />,
          },
          {
            id: ID.increment(),
            path: "demo2",
            title: "Demo2",
            filepath: "/src/views/echart/demo2/index.tsx",
            icon: <WindowsOutlined />,
          },
        ],
      },
      {
        id: ID.increment(),
        path: "antc",
        title: "Antc",
        icon: <OrderedListOutlined />,
        children: [
          {
            id: ID.increment(),
            path: "list",
            title: "List",
            filepath: "/src/views/antd/list/index.tsx",
            icon: <OrderedListOutlined />,
          },
          {
            id: ID.increment(),
            path: "token",
            title: "Token",
            filepath: "/src/views/antd/overview/index.tsx",
            icon: <OrderedListOutlined />,
          },
        ],
      },
      {
        id: ID.increment(),
        path: "antv",
        title: "AntV",
        icon: <OrderedListOutlined />,
        children: [
          {
            id: ID.increment(),
            path: "g2",
            title: "G2",
            icon: <OrderedListOutlined />,
            children: [
              {
                id: ID.increment(),
                path: "demo1",
                title: "Demo1",
                filepath: "/src/views/antv/g2/Demo1.tsx",
                icon: <OrderedListOutlined />,
              },
            ],
          },
        ],
      },
      {
        id: ID.increment(),
        path: "react",
        title: "React",
        icon: <OrderedListOutlined />,
        children: [
          {
            id: ID.increment(),
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
 * 生成系统菜单。
 *
 * ```ts
 *  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
 *    return { key, icon, children, label };
 * }
 * ```
 * @param menus AppMenus
 * @returns Antd 菜单项
 */
function createAntdMenu(menus: AppMenu[]): MenuItem[] {
  const menuItems = [];

  for (const menu of menus) {
    const hasChildren = Array.isArray(menu.children) && menu.children.length > 0;
    const notMenu = menu.path === "/" || menu.index;

    if (notMenu) {
      if (hasChildren) {
        const antMenu = createAntdMenu(menu.children!);
        if (antMenu.length > 0) {
          menuItems.push(...antMenu);
        }
      }
    } else {
      const fullpath = (menu.prevPath ? menu.prevPath + "/" + menu.path : menu.path) as string;

      const menuItem: any = {
        path: fullpath, // 方便通过路由找到这个菜单项。
        key: menu.id + "",
        icon: menu.icon,
        label: <NavLink to={fullpath}>{menu.title}</NavLink>,
      };

      if (hasChildren) {
        menu.children!.forEach((child) => (child.prevPath = fullpath));
        menuItem.children = createAntdMenu(menu.children!);
        // 有 children 就当不是路由。
        menuItem.label = menu.title;
      }
      menuItems.push(menuItem);
    }
  }
  return menuItems;
}

export { APP_MENUS, createAntdMenu };
export type { AppMenu };
