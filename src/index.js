import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import "assets/styles/style.css"

// import './assets/styles/layout.css'

// layouts

import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Header from "views/Header";
import Artikel from "views/Artikel";
import Kategori from "views/Kategori";
import ProtectedRoute from "components/ProtectedRoute";
import Writter from "layouts/Writter";
import Admin from "layouts/Admin";
import ArtikelKategori from "views/ArtikelKategori";
import SearchArticles from "views/SearchArticles";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      {/* <Route path="/admin" component={Admin} /> */}
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Landing} />
      <Route path="/article/:id" exact component={Artikel} />
      <Route path="/template" exact component={Header} />
      <Route path="/category" exact component={Kategori} />
      <Route path="/search-article/:id" exact component={SearchArticles} />
      <Route path="/category/:id" exact component={ArtikelKategori} />
      <ProtectedRoute path="/admin" render={props=><Admin {...props} />}/>
      <ProtectedRoute path="/writter" render={props=><Writter {...props} />}/>
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
