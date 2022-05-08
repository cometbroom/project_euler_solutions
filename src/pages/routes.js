export const routes = [
  { path: "problems", page: () => import("./problemPage") },
  { path: "algorithms", page: () => import("./problemPage"), default: true },
];
