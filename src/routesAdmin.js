/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Admin/Dashboard.js";
import Profile from "views/Admin/Profile.js";
import TableUser from "views/Admin/ManageUser.js";
import TableBuku from "views/Admin/ManageBuku.js";
import TabelPengembalian from "views/Admin/ManagePengembalian";

var routesAdmin = [
  {
    path: "/profile",
    name: "Profile",
    icon: "fa fa-user",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa fa-chart-line",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/buku",
    name: "Daftar Buku",
    icon: "fa fa-book",
    component: TableBuku,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Daftar User",
    icon: "fa fa-users",
    component: TableUser,
    layout: "/admin",
  },
  {
    path: "/pinjaman",
    name: "Daftar Pinjaman",
    icon: "fa fa-exchange-alt",
    component: TabelPengembalian,
    layout: "/admin",
  },
];
export default routesAdmin;
