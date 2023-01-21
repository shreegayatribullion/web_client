import React, { useEffect, useState } from "react";
import { Table, Row, Col, Spin } from 'antd'
import io from 'socket.io-client';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { ArrowUpOutlined, ArrowDownOutlined, PhoneFilled, WhatsAppOutlined } from '@ant-design/icons'
import axios from 'axios'

let adminUrl = 'http://localhost:3001/'
// let adminUrl = 'https://7867-103-170-69-128.in.ngrok.io/'

// let adminUrl = 'https://socketapp7992.herokuapp.com/'

// let adminUrl = 'https://app-ei2u.onrender.com/'
// let adminUrl = 'https://socket-api-neon.vercel.app/'

// let adminUrl = 'https://socket-api-1.onrender.com/'
// let adminUrl = 'https://socket-api-1.onrender.com/'

function LiveRate() {

  const [adminData, setAdminData] = useState([])
  const [updatedAdminData, setUpdatedAdminData] = useState([])
  //
  const [goldValue, setGoldValue] = useState(false)
  const [goldSellValue, setGoldSellValue] = useState(false)
  const [silverValue, setSilverValue] = useState(false)
  const [silverSellValue, setSilverSellValue] = useState(false)
  //  
  const [mcxData, setMcxData] = useState([])
  const [upadtedMcxData, setUpdatedMcxData] = useState([])
  //
  const [appdata, setAppdata] = useState(false)
  const [waNo, setWaNo] = useState(false)
  const [telno, setTelno] = useState(false)

  const setMcxColor = (type, target) => {
    let classNameStyle = ""
    if (parseInt(mcxData.find((x) => x.symbol == type)[target]) < parseInt(upadtedMcxData.find((x) => x.symbol == type)[target])) {
      classNameStyle = 'positive'
    }
    if (mcxData.find((x) => x.symbol == type)[target] > upadtedMcxData.find((x) => x.symbol == type)[target]) {
      classNameStyle = 'negative'
    }
    return classNameStyle
  }

  useEffect(() => {
    fetchAppData()
  }, [])

  const fetchAppData = () => {
    axios.get(adminUrl + 'appinfo')
      .then(function (response) {
        setAppdata(response.data.records)
        setWaNo(`https://wa.me/${response.data.records[0].no}`)
        setTelno(`tel:${response.data.records[0].no}`)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const columns = [
    {
      title: () => <div className="cs-font-22 cs-fw-800">Product Name</div>,
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (record) => <div className="cs-font-22 cs-fw-800">{record}</div>,
    },
    {
      title: () => <div className="cs-font-22 cs-fw-800">Buy</div>,
      dataIndex: 'buy',
      width: 200,
      key: 'buy',
      align: "center",
      render: (record, data, index) => {
        return <div className={`cs-font-22 cs-fw-800`} style={{ display: "flex", justifyContent: "center", justifyItems: "center" }}>
          {+record + (+(data.src == "gold" ? data.defaultgold : data.defaultsilver))}
        </div>
      }
    },
    {
      title: () => { return <div className="cs-font-22 cs-fw-800">Sell</div> },
      dataIndex: 'sell',
      width: 200,
      key: 'sell',
      align: "center",
      render: (record, data, index) => {
        return <div className={`cs-font-22 cs-fw-800`} style={{ display: "flex", justifyContent: "center", justifyItems: "center" }}>
          {+record + (+(data.src == "gold" ? data.defaultgold : data.defaultsilver))}
        </div>
      }
    },
  ];


  useEffect(() => {
    const socketAdmin = io(adminUrl, {
      transports: ["websocket"]
    });

    socketAdmin.on('initial notes', function (data) {
      console.log("data", data)
      setUpdatedAdminData(data.filter((x) => x.active))
      setTimeout(() => {
        setAdminData(data.filter((x) => x.active))
      }, 500);
    })

    // socketAdmin.on('trigger event', function (data) {
    //   setUpdatedAdminData(data.filter((x) => x.active))
    //   setTimeout(() => {
    //     setAdminData(data.filter((x) => x.active))
    //   }, 500);
    // })

    socketAdmin.on('Liverate', function (data) {
      socketAdmin.on('update note', function (data) {
        setAdminData(data.filter((x) => x.active))
      })
      setGoldValue(data.find((x) => x.symbol == "gold").Bid)
      setGoldSellValue(data.find((x) => x.symbol == "gold").Ask)

      setSilverValue(data.find((x) => x.symbol == "silver").Bid)
      setSilverSellValue(data.find((x) => x.symbol == "silver").Ask)
      setMcxData(data)
      setTimeout(() => {
        setUpdatedMcxData(data)
      }, 500);
      // console.log("data-----", data)
    })

    // socket.on('message', function (data) {
    //   setUpdatedRate(data['Rate'])
    //   setTimeout(() => {
    //     setRate(data['Rate'])
    //   }, 500);
    // });

    // return () => {
    //   socketAdmin.disconnect();
    // }

  }, []);

  // console.log(mcxData.length, adminData.length, upadtedMcxData.length)

  return (
    mcxData.length && upadtedMcxData.length && appdata.length ?
      <div className="cs-90vh cs-bm-120">
        <div className="cs-tm-70">
          <marquee className='cs-welcome'>
            {appdata[0].title}
          </marquee>
          <div className="cs-m-15-no-top">
            <a target={"_blank"} href={waNo}>
              <div className="cs-whatsapp cs-dis-flex cs-hrz-center cs-vt-center">
                <WhatsAppOutlined />
              </div>
            </a>

            <a href={telno}>
              <div className="cs-call cs-dis-flex cs-hrz-center cs-vt-center">
                <PhoneFilled />
              </div>
            </a>
            <BrowserView>
              <div className="cs-font-large cs-fw-800 cs-dis-flex cs-hrz-center cs-tm-70">
                Live Rate
              </div>
              <div className="cs-font-large cs-fw-800 cs-mb-10 cs-dis-flex cs-hrz-center cs-txt-align-center">
                (For booking contact 9414448457)
              </div>
            </BrowserView>

            {/* <MobileView>
            <div>
              For booking contact 9414448457
            </div>
          </MobileView> */}
            <Row style={{ marginTop: 10, marginBottom: 10 }} gutter={[4, 4]}>
              <Col lg={6} xs={8}>
                <div className="ui-card">
                  <div className="cs-dis-flex cs-hrz-center cs-fw-800 cs-prime-bg sub-header">
                    Gold Comex
                  </div>
                  <div className="clr-card" style={{ padding: 8 }}>
                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Bid
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Ask
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('XAUUSD', 'Bid')}`}>
                            {mcxData.find((x) => x.symbol == "XAUUSD").Bid}
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('XAUUSD', 'Ask')}`}>
                            {mcxData.find((x) => x.symbol == "XAUUSD").Ask}
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <div className="cs-dis-flex cs-hrz-center" style={{ paddingBottom: 5 }}>
                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowUpOutlined className="cs-green-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "XAUUSD").High}
                        </span>
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-prime-clr" style={{ marginLeft: 5, marginRight: 5 }}>
                        /
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowDownOutlined className="cs-red-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "XAUUSD").Low}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Col>

              <Col lg={6} xs={8}>
                <div className="ui-card">
                  <div className="cs-dis-flex cs-hrz-center cs-fw-800 cs-prime-bg sub-header">
                    SILVER COMEX
                  </div>
                  <div className="clr-card" style={{ padding: 8 }}>
                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Bid
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Ask
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('XAGUSD', 'Bid')}`}>
                            {mcxData.find((x) => x.symbol == "XAGUSD").Bid}
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('XAGUSD', 'Ask')}`}>
                            {mcxData.find((x) => x.symbol == "XAGUSD").Ask}
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <div className="cs-dis-flex cs-hrz-center" style={{ paddingBottom: 5 }}>
                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowUpOutlined className="cs-green-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "XAGUSD").High}
                        </span>
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-prime-clr" style={{ marginLeft: 5, marginRight: 5 }}>
                        /
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowDownOutlined className="cs-red-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "XAGUSD").Low}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Col>

              <Col lg={6} xs={8}>
                <div className="ui-card">
                  <div className="cs-dis-flex cs-hrz-center cs-fw-800 cs-prime-bg sub-header">
                    INR/USD
                  </div>
                  <div className="clr-card" style={{ padding: 8 }}>
                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Bid
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Ask
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('INRSpot', 'Bid')}`}>
                            {mcxData.find((x) => x.symbol == "INRSpot").Bid}
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('INRSpot', 'Ask')}`}>
                            {mcxData.find((x) => x.symbol == "INRSpot").Ask}
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <div className="cs-dis-flex cs-hrz-center" style={{ paddingBottom: 5 }}>
                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowUpOutlined className="cs-green-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "INRSpot").High}
                        </span>
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-prime-clr" style={{ marginLeft: 5, marginRight: 5 }}>
                        /
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowDownOutlined className="cs-red-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "INRSpot").Low}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Col>
            </Row>

            {adminData.length ?
              <div>
                <div className="cs-prime-bg cs-p-5" style={{ borderRadius: 7, marginBottom: 4 }}>
                  <Row gutter={[10, 10]}>
                    <Col lg={8} xs={10}>
                      <div className="cs-dis-flex" style={{ marginLeft: 10 }}>
                        <span className="cs-font-main-header cs-fw-800">
                          Description
                        </span>
                      </div>
                    </Col>

                    <Col lg={8} xs={7}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-main-header cs-fw-800">
                          Buy
                        </span>
                      </div>
                    </Col>

                    <Col lg={8} xs={7}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-main-header cs-fw-800">
                          Sell
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              : null}
            {adminData.map((itm, index) => {
              return (
                <Row key={index} className="cs-main-card cs-p-5 cs-mb-4">
                  <Col lg={8} xs={10} key={index}>
                    <div className="cs-dis-flex" style={{ marginLeft: 10 }}>
                      <span className="cs-font-main-header cs-clr-white cs-fw-500">
                        {itm.name}
                      </span>
                    </div>
                  </Col>

                  <Col lg={8} xs={7}>
                    <div className="cs-dis-flex cs-hrz-center">
                      {itm.buyactive ?
                        itm.isfix ?
                          <span className="cs-font-main-header cs-clr-white cs-fw-500">
                            {(+itm.buy)}
                          </span>
                          :
                          <span className="cs-font-main-header cs-clr-white cs-fw-500">
                            {(+itm.buy) + (+(itm.src == "gold" ? goldValue : silverValue))}
                          </span>
                        : <span className="cs-font-main-header cs-clr-white cs-fw-500">---</span>}
                    </div>
                  </Col>

                  <Col lg={8} xs={7}>
                    <div className="cs-dis-flex cs-hrz-center">
                      {itm.sellactive ?
                        itm.isfix ?
                          <span className="cs-font-main-header cs-clr-white cs-fw-500">
                            {(+itm.sell)}
                          </span> :
                          <span className="cs-font-main-header cs-clr-white cs-fw-500">
                            {(+itm.sell) + (+(itm.src == "gold" ? goldSellValue : silverSellValue))}
                          </span>
                        : <span className="cs-font-main-header cs-clr-white cs-fw-500">---</span>}
                    </div>
                  </Col>
                </Row>
              )
            })}

            {/* <Table dataSource={adminData} columns={columns} rowKey={'id'} pagination={false} /> */}

            <Row gutter={[4, 4]} className="cs-tm-10">

              <Col lg={6} xs={12}>
                <div className="ui-card">
                  <div className="cs-dis-flex cs-hrz-center cs-fw-800 cs-prime-bg sub-header">
                    GOLD MCX
                  </div>
                  <div className="clr-card" style={{ padding: 6 }}>
                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Bid
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Ask
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('gold', 'Bid')}`}>
                            {mcxData.find((x) => x.symbol == "gold").Bid}
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('gold', 'Ask')}`}>
                            {mcxData.find((x) => x.symbol == "gold").Ask}
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <div className="cs-dis-flex cs-hrz-center">
                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowUpOutlined className="cs-green-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "gold").High}
                        </span>
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-prime-clr" style={{ marginLeft: 5, marginRight: 5 }}>
                        /
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowDownOutlined className="cs-red-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "gold").Low}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="ui-card">
                  <div className="cs-dis-flex cs-hrz-center cs-fw-800 cs-prime-bg sub-header">
                    Silver MCX
                  </div>
                  <div className="clr-card" style={{ padding: 6 }}>
                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Bid
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Ask
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('silver', 'Bid')}`}>
                            {mcxData.find((x) => x.symbol == "silver").Bid}
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('silver', 'Ask')}`}>
                            {mcxData.find((x) => x.symbol == "silver").Ask}
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <div className="cs-dis-flex cs-hrz-center">
                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowUpOutlined className="cs-green-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "silver").High}
                        </span>
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-prime-clr" style={{ marginLeft: 5, marginRight: 5 }}>
                        /
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowDownOutlined className="cs-red-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "silver").Low}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="ui-card">
                  <div className="cs-dis-flex cs-hrz-center cs-fw-800 cs-prime-bg sub-header">
                    GOLD MCX NEXT
                  </div>
                  <div className="clr-card" style={{ padding: 6 }}>
                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Bid
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Ask
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('goldnext', 'Bid')}`}>
                            {mcxData.find((x) => x.symbol == "goldnext").Bid}
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('goldnext', 'Ask')}`}>
                            {mcxData.find((x) => x.symbol == "goldnext").Ask}
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <div className="cs-dis-flex cs-hrz-center">
                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowUpOutlined className="cs-green-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "goldnext").High}
                        </span>
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-prime-clr" style={{ marginLeft: 5, marginRight: 5 }}>
                        /
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowDownOutlined className="cs-red-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "goldnext").Low}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="ui-card">
                  <div className="cs-dis-flex cs-hrz-center cs-fw-800 cs-prime-bg sub-header">
                    SILVER MCX NEXT
                  </div>
                  <div className="clr-card" style={{ padding: 6 }}>
                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Bid
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className="cs-font-22 cs-fw-800 cs-clr-white">
                            Ask
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('silvernext', 'Bid')}`}>
                            {mcxData.find((x) => x.symbol == "silvernext").Bid}
                          </span>
                        </div>
                      </Col>

                      <Col lg={12} xs={12}>
                        <div className="cs-dis-flex cs-hrz-center">
                          <span className={`${"cs-font-22 cs-fw-800 cs-clr-white cs-p-5 " + setMcxColor('silvernext', 'Ask')}`}>
                            {mcxData.find((x) => x.symbol == "silvernext").Ask}
                          </span>
                        </div>
                      </Col>
                    </Row>

                    <div className="cs-dis-flex cs-hrz-center">
                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowUpOutlined className="cs-green-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "silvernext").High}
                        </span>
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-prime-clr" style={{ marginLeft: 5, marginRight: 5 }}>
                        /
                      </div>

                      <div className="cs-dis-flex cs-hrz-center cs-vt-center">
                        <span className="cs-vt-center cs-dis-flex">
                          <ArrowDownOutlined className="cs-red-clr cs-fw-800 cs-font-22" />
                        </span>
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "silvernext").Low}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      :
      <div className="cs-vh-100 cs-dis-flex cs-vt-center cs-hrz-center">
        <Spin spinning={true} />
      </div>
  )
}

export default LiveRate 