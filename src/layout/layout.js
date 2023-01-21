import { Outlet, Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import {
  HomeOutlined,
  BankOutlined,
  UserOutlined,
  ContactsFilled,
} from "@ant-design/icons";
import axios from "axios";
import bg from "../static/images/black.jpeg";
import { adminUrl } from "../constant";

const { Header, Content, Footer } = Layout;
// let adminUrl = "http://localhost:3001/";
// let adminUrl = 'https://socketapp7992.herokuapp.com/'
// let adminUrl = 'https://app-ei2u.onrender.com/'
// let adminUrl = 'https://socket-api-neon.vercel.app/'
// let adminUrl = 'https://7867-103-170-69-128.in.ngrok.io/'
// let adminUrl = 'https://socket-api-1.onrender.com/'

const waNo = `https://wa.me/${+917597690537}`;

const navData = [
  { name: "About us", id: 2, path: "/" },
  { name: "Live rate", id: 1, path: "/" },
  { name: "Contact us", id: 3, path: "/tennsis" },
];

const LayoutComp = () => {
  const [appdata, setAppdata] = useState(false);

  useEffect(() => {
    fetchAppData();
  }, []);

  const fetchAppData = () => {
    axios
      .get(adminUrl + "appinfo")
      .then(function (response) {
        setAppdata(response.data.records[0].header);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Layout
        className="cs-layout"
        style={{ height: "100vh", backgroundImage: `url(${bg})` }}
      >
        <BrowserView>
          <Header className="cs-header-color">
            <div className="logo" />
            <Row>
              <Col span={3}>
                <div className="cs-fw-800 cs-clr-fff cs-fs-20">
                  SN Jewellers
                </div>
              </Col>
              {navData.map((itm, index) => {
                return (
                  <Col span={2} key={itm.id}>
                    <Link to={itm.path}>
                      <div className="cs-clr-fff">{itm.name}</div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Header>
        </BrowserView>
        <MobileView>
          <Header className="cs-header-color cs-header">
            <div className="logo" />
            <div className="cs-dummy-logo">
              <Row>
                {/* <Col span={3}>
                  <img src={logo} style={{ width: 50, height: 50, marginRight: 15 }} />
                </Col> */}
                <Col span={12}>
                  <div className="cs-dis-flex cs-hrz-center cs-font-23">
                    Shree Gayatri Bullions
                  </div>
                </Col>
              </Row>
              {/* {appdata} */}
            </div>
          </Header>
        </MobileView>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Outlet />
            {/* <div
              className="cs-dis-flex cs-hrz-center"
              style={{ marginTop: 30 }}
            >
              App developed by
              <a href={waNo}>
                <div style={{ marginLeft: 4 }}>Ritik Soni</div>
              </a>
            </div> */}
          </div>
        </Content>

        <div className="cs-bottom-nav">
          <marquee className="cs-welcome">Welcome to Shree Gayatri Bullions</marquee>

          <Row>
            <Col xs={8}>
              <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                <Link
                  to="/"
                  onClick={() =>
                    setTimeout(() => {
                      window.location.reload();
                    }, 0)
                  }
                >
                  <div className="cs-dis-flex cs-hrz-center">
                    <HomeOutlined style={{ color: "#ffff", fontSize: 21 }} />
                  </div>
                  <div className="cs-dis-flex cs-hrz-center cs-tm-5 cs-title">
                    Live rate
                  </div>
                </Link>
              </div>
            </Col>

            <Col xs={8}>
              <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                <Link to="/bank">
                  <div className="cs-dis-flex cs-hrz-center">
                    <BankOutlined style={{ color: "#ffff", fontSize: 21 }} />
                  </div>
                  <div className="cs-dis-flex cs-hrz-center cs-tm-5 cs-title">
                    Bank details
                  </div>
                </Link>
              </div>
            </Col>

            <Col xs={8}>
              <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                <Link to="/contact">
                  <div className="cs-dis-flex cs-hrz-center">
                    <ContactsFilled style={{ color: "#ffff", fontSize: 21 }} />
                  </div>
                  <div className="cs-dis-flex cs-hrz-center cs-tm-5 cs-title">
                    Contact us
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        {/* <Footer style={{ textAlign: 'center' }} className='cs-padding-bottom-20'>
          App developed by
          <a href={waNo}>
            {" "}
            Ritik Soni
          </a>
        </Footer> */}
      </Layout>
    </>
  );
};

export default LayoutComp;
