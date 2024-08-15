import { createBrowserRouter, RouteObject } from "react-router-dom";

import { APP_MENUS } from "./menu";
import type { AppMenu } from "./menu";

/* 如果没有引用 ".../@remix-run/router"，则无法命名 "router" 的推断类型。这很可能不可移植。需要类型注释。
https://github.com/remix-run/react-router/issues/10787
移除 tsconfig 中的
"composite": false,
"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo", */

const router = createBrowserRouter(createRouterObject(APP_MENUS));

/**
 * 生成 `React Router` 路由对象。
 *
 * @param menus SystemMenus
 * @returns RouterObject
 */
function createRouterObject(menus: AppMenu[]): RouteObject[] {
  return menus.map(({ path, element, index, children }) => {
    const router: RouteObject = { path, element, index };
    if (Array.isArray(children) && children.length > 0) {
      router.children = createRouterObject(children);
    }
    return router;
  });
}

export { router };
