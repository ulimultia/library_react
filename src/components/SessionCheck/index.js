import React from "react";

import { Link, Redirect, Route } from "react-router-dom";
import LayoutAdmin from "../../views/Admin/Dashboard";
import LayoutPeminjam from "../../views/Peminjam/Dashboard";

const cekRoles = () => {
  const admin = ["ADMIN"];
  const peminjam = ["PEMINJAM"];
  const rolee = localStorage.getItem("userdata");
  const user = JSON.parse(localStorage.getItem("userdata"));
  if (rolee === null) {
    return <Redirect to="/" />;
  }
  // if (JSON.stringify(user.data.role) === JSON.stringify(admin)) {
  //   console.log("admin");

  //   return (
  //     <Route
  //       path="/admin/dashboard"
  //       render={(props) => <LayoutAdmin {...props} />}
  //     />
  //   );
  //   // return <Redirect to="admin/dashboard" />;
  //   // return <Redirect push to="/admin/dashboard" />;
  //   // return <Link to="/admin/dashboard"></Link>;
  //   // return (window.location.href = "/admin/dashboard");
  // }
  // if (JSON.stringify(user.data.role) === JSON.stringify(peminjam)) {
  //   return (
  //     <Route
  //       path="/peminjam/dashboard"
  //       render={(props) => <LayoutPeminjam {...props} />}
  //     />)
  // }
};
export default cekRoles;
