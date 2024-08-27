import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

import Home from "@/view/home";
import Framework from "@/view/frame";
import { getIconByName } from "@/component/icon-picker/util";

type MenuItem = Required<MenuProps>["items"][number] & Record<string, any>;

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
  iconName?: string;

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
        iconName: "BarChartOutlined",
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
            filepath: "/src/view/echart/demo1/index.tsx",
            iconName: "AreaChartOutlined",
          },
          {
            id: ID.increment(),
            path: "demo2",
            title: "Demo2",
            filepath: "/src/view/echart/demo2/index.tsx",
            iconName: "WindowsOutlined",
          },
        ],
      },
      {
        id: ID.increment(),
        path: "antd",
        title: "AntD",
        iconName: "AntDesignOutlined",
        children: [
          {
            id: ID.increment(),
            path: "list",
            title: "List",
            filepath: "/src/view/antd/list/index.tsx",
            iconName: "OrderedListOutlined",
          },
          {
            id: ID.increment(),
            path: "token",
            title: "Token",
            filepath: "/src/view/antd/overview/index.tsx",
            iconName: "InsertRowAboveOutlined",
          },
          {
            id: ID.increment(),
            path: "icon",
            title: "Icon",
            filepath: "/src/view/antd/icon-select/index.tsx",
            iconName: "DiscordOutlined",
          },
        ],
      },
      {
        id: ID.increment(),
        path: "antv",
        title: "AntV",
        iconName: "BarChartOutlined",
        children: [
          {
            id: ID.increment(),
            path: "g2",
            title: "G2",
            iconName: "BgColorsOutlined",
            children: [
              {
                id: ID.increment(),
                path: "demo1",
                title: "Demo1",
                filepath: "/src/view/antv/g2/demo1/index.tsx",
                iconName: "LineChartOutlined",
              },
            ],
          },
        ],
      },
      {
        id: ID.increment(),
        path: "react",
        title: "React",
        iconName: "ReadOutlined",
        children: [
          {
            id: ID.increment(),
            path: "effect",
            title: "Effect",
            filepath: "/src/view/react/effect/index.tsx",
            iconName: "SmileOutlined",
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
    // 框架和 index route 不生成菜单。
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

      const menuItem: MenuItem = {
        key: menu.id,
        path: fullpath, // 方便通过路由找到这个菜单项。
        label: <NavLink to={fullpath}>{menu.title}</NavLink>,
      };

      const Icon = getIconByName(menu.iconName);
      if (Icon) menuItem.icon = <Icon />;

      if (hasChildren) {
        menu.children!.forEach((child) => (child.prevPath = fullpath));
        menuItem.children = createAntdMenu(menu.children!);
        // 有 children 就当做目录。
        menuItem.label = menu.title;
      }
      menuItems.push(menuItem);
    }
  }
  return menuItems;
}

export { APP_MENUS, createAntdMenu };
export type { AppMenu };
