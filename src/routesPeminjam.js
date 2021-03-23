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
import Dashboard from "views/Peminjam/Dashboard.js";
import Profil from "views/Peminjam/Profile.js";
import Catalog from "views/Peminjam/Catalog.js";
import Sewa from "views/Peminjam/Sewa.js";
import Riwayat from "views/Peminjam/Riwayat.js";
import Donasi from "views/Peminjam/Donasi.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";

// routes peminjam ini digunakan untuk mengisi sidebar aplikasi
var routesPeminjam = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: Dashboard,
    layout: "/peminjam",
  },
  {
    path: "/profile",
    name: "Profil",
    icon: "nc-icon nc-circle-10",
    component: Profil,
    layout: "/peminjam",
  },
  {
    path: "/catalog",
    name: "Katalog",
    icon: "nc-icon nc-book-bookmark",
    component: Catalog,
    layout: "/peminjam",
  },
  {
    path: "/sewa",
    name: "Sedang Disewa",
    icon: "nc-icon nc-time-alarm",
    component: Sewa,
    layout: "/peminjam",
  },
  {
    path: "/riwayat",
    name: "Riwayat Sewa",
    icon: "nc-icon nc-single-copy-04",
    component: Riwayat,
    layout: "/peminjam",
  },
  {
    path: "/donasi",
    name: "Donasi Buku",
    icon: "nc-icon nc-box-2",
    component: Donasi,
    layout: "/peminjam",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "nc-icon nc-button-power",
    component: Donasi,
    layout: "/peminjam",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/peminjam",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/peminjam",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/peminjam",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/peminjam",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/peminjam",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/peminjam",
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/peminjam",
  },
];
export default routesPeminjam;
