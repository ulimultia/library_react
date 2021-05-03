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
import TableSewa from "views/Admin/ManageSewa";
import TabelPengembalian from "views/Admin/ManagePengembalian";
import Pengembalian from "views/Admin/ManagePeminjaman";
import Penerbit from "views/Admin/ManagePenerbit";
import Kategori from "views/Admin/ManageKategori";
import Genre from "views/Admin/ManageGenre";
import Lokasi from "views/Admin/ManageLokasi";
import Logout from "views/Admin/Logout.js";

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
    path: "/user",
    name: "Daftar User",
    icon: "fa fa-users",
    component: TableUser,
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
    path: "/sewabuku",
    name: "Sewa Buku",
    icon: "fa fa-book",
    component: TableSewa,
    layout: "/admin",
  },
  {
    path: "/peminjaman",
    name: "Daftar Pinjaman",
    icon: "fa fa-exchange-alt",
    component: Pengembalian,
    layout: "/admin",
  },
  {
    path: "/pinjaman",
    name: "Daftar Pinjaman",
    icon: "fa fa-exchange-alt",
    component: TabelPengembalian,
    layout: "/admin",
  },
  {
    path: "/penerbit",
    name: "Penerbit Buku",
    icon: "fa fa-database",
    component: Penerbit,
    layout: "/admin",
  },
  {
    path: "/kategori",
    name: "Kategori Buku",
    icon: "fa fa-database",
    component: Kategori,
    layout: "/admin",
  },
  {
    path: "/genre",
    name: "Genre Buku",
    icon: "fa fa-database",
    component: Genre,
    layout: "/admin",
  },
  {
    path: "/lokasi",
    name: "Lokasi Buku",
    icon: "fa fa-database",
    component: Lokasi,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "nc-icon nc-button-power",
    component: Logout,
    layout: "/admin",
  },
];
export default routesAdmin;
