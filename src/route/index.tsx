import React, { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

import { APP_MENUS, AppMenu } from "./menu";

/* 如果没有引用 ".../@remix-run/router"，则无法命名 "router" 的推断类型。这很可能不可移植。需要类型注释。
https://github.com/remix-run/react-router/issues/10787
移除 tsconfig 中的
"composite": false,
"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo", */

const router = createBrowserRouter(createRouterObject(APP_MENUS));

/**
 * 生成 `React Router` 路由对象。
 * ```ts
 * const Component = React.lazy(() =>
 *  new Promise((resolve) => setTimeout(resolve, 2000)).then(() => import(filepath))
 * );
 * ```
 * @param menus AppMenus
 * @returns RouterObject[]
 */
function createRouterObject(menus: AppMenu[]): RouteObject[] {
  return menus.map(({ path, filepath, element, index, children }) => {
    const router: RouteObject = { path, index };

    if (element) {
      router.element = element;
    } else if (filepath) {
      const Component = React.lazy(() => import(/* @vite-ignore */ filepath));
      router.element = (
        <Suspense fallback={<p>🌀 Loading...</p>}>
          <Component />
        </Suspense>
      );
    }
    if (Array.isArray(children) && children.length > 0) {
      router.children = createRouterObject(children);
    }
    return router;
  });
}

export { router };
