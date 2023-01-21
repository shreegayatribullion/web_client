import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import "./static/style/index.css";
import LiveRate from "./page/stock/live";
import LayoutComp from "./layout/layout";
import Bank from "./page/bank/bank";
import ContactUs from "./page/contactus/contactus";
import Redirect from "./page/redirect/Redirect";

function App() {
  return (
    <div>
      {/* <h3>Coming soon....</h3> */}
      <Routes>
        {/* backup */}

        <Route path="/" element={<LayoutComp />}>
          <Route index element={<LiveRate />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

        {/* main */}

        {/* {localStorage.getItem("isLoggedIn") ?
          <Route path="/" element={<LayoutComp />}>
            <Route index element={<LiveRate />} />
            <Route path='/bank' element={<Bank />} />
            <Route path='/contact' element={<ContactUs />} />
          </Route>
          :
          <Route path='/' element={<ContactUs />} />
        } */}

        {/* main websie which will redirect */}

        {/* {localStorage.getItem("isLoggedIn") ? (
          <Route path="/" element={<Redirect />}>
            <Route index element={<Redirect />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
        ) : (
          <Route path="/" element={<ContactUs />} />
        )} */}
      </Routes>
    </div>
  );
}

export default App;
