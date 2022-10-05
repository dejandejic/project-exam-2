import Layout from "layouts/DashboardLayout.jsx";
import { Login } from "./../views/pages/index";

const indexRoutes = [
  { path: "/login", component: Login },
  { path: "/", component: Layout }
];

export default indexRoutes;
