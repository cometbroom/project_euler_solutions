export const routes = [
  { path: "problems", page: () => import("./problemPage.js") },
  { path: "algorithms", page: () => import("./problemPage.js"), default: true },
];
