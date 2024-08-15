import { createBrowserRouter } from "react-router-dom";

import { AppMenu, createRouterObject } from "./menu";

// 如果没有引用 ".../@remix-run/router"，则无法命名 "router" 的推断类型。这很可能不可移植。需要类型注释。
// https://github.com/remix-run/react-router/issues/10787
// 移除 tsconfig 中的
// "composite": false,
// "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

const router = createBrowserRouter(createRouterObject(AppMenu));

export { router };
