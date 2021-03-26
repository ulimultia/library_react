import React from 'react'

import { Link, Redirect } from "react-router-dom";

const cekRoles = () => {
  const rolee = localStorage.getItem('user');
  if(rolee===null) {
      return <Redirect to="/"/>
  }
}
export default cekRoles;