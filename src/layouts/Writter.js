import HeaderStats from 'components/Headers/HeaderStats'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Dashboard from 'views/admin/Dashboard'
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import FooterAdmin from 'components/Footers/FooterAdmin';
import SidebarWritter from 'components/Sidebar/SidebarWritter';
import Articles from 'views/writter/Articles';
import Profile from 'views/auth/Profile';

function Writter() {
  return (
    <>
    <SidebarWritter />
    <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar />
      {/* Header */}
      <HeaderStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <Switch>
          <Route path="/writter/dashboard" exact component={Dashboard} />
            <Route path="/writter/articles" exact component={Articles} />
            <Route path="/writter/profile" exact component={Profile} />
   
          
          <Redirect from="/writter" to="/writter/dashboard" />
        </Switch>
        <FooterAdmin />
      </div>
    </div>
  </>
  )
}

export default Writter