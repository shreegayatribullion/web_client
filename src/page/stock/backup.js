<Row gutter={[20, 20]}>
    <Col span={16}>
        <Table dataSource={adminData} columns={columns} rowKey={'id'} pagination={false} />
    </Col>

    <Col span={8}>
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <div className="cs-card">
                    <div className="cs-prime-bg cs-p-5">
                        {/* title */}
                        <div className="cs-dis-flex cs-hrz-center">
                            <span className="cs-font-22 cs-fw-800">
                                GOLD MCX
                            </span>
                        </div>
                    </div>

                    <Row className="cs-tm-10">
                        <Col span={12}>
                            <div className="cs-dis-flex cs-hrz-center">
                                <span className="cs-font-22 cs-fw-800">
                                    Bid
                                </span>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="cs-dis-flex cs-hrz-center">
                                <span className="cs-font-22 cs-fw-800">
                                    Ask
                                </span>
                            </div>
                        </Col>
                    </Row>

                    <Row className="cs-bm-10">
                        <Col span={12}>
                            <div className="cs-dis-flex cs-hrz-center">
                                <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('gold', 'Bid')}`}>
                                    {mcxData.find((x) => x.symbol == "gold").Bid}
                                </span>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="cs-dis-flex cs-hrz-center">
                                <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('gold', 'Ask')}`}>
                                    {mcxData.find((x) => x.symbol == "gold").Ask}
                                </span>
                            </div>
                        </Col>
                    </Row>

                    {/* footer */}
                    <div className="cs-prime-footer cs-p-5">
                        <Row>
                            <Col span={12}>
                                <div className="cs-dis-flex cs-hrz-center">
                                    <span className="cs-font-22 cs-fw-800 cs-green-clr">
                                        {mcxData.find((x) => x.symbol == "gold").High}
                                    </span>
                                </div>
                            </Col>

                            <Col span={12}>
                                <div className="cs-dis-flex cs-hrz-center">
                                    <span className="cs-font-22 cs-fw-800 cs-red-clr">
                                        {mcxData.find((x) => x.symbol == "gold").Low}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>

            <Col span={24}>
                <div className="cs-card">
                    <div className="cs-prime-bg cs-p-5">
                        {/* title */}
                        <div className="cs-dis-flex cs-hrz-center">
                            <span className="cs-font-22 cs-fw-800">
                                Silver MCX
                            </span>
                        </div>
                    </div>

                    <Row className="cs-tm-10">
                        <Col span={12}>
                            <div className="cs-dis-flex cs-hrz-center">
                                <span className="cs-font-22 cs-fw-800">
                                    Bid
                                </span>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="cs-dis-flex cs-hrz-center">
                                <span className="cs-font-22 cs-fw-800">
                                    Ask
                                </span>
                            </div>
                        </Col>
                    </Row>

                    <Row className="cs-bm-10">
                        <Col span={12}>
                            <div className="cs-dis-flex cs-hrz-center">
                                <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('silver', 'Bid')}`}>
                                    {mcxData.find((x) => x.symbol == "silver").Bid}
                                </span>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="cs-dis-flex cs-hrz-center">
                                <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('silver', 'Ask')}`}>
                                    {mcxData.find((x) => x.symbol == "silver").Ask}
                                </span>
                            </div>
                        </Col>
                    </Row>

                    {/* footer */}
                    <div className="cs-prime-footer cs-p-5">
                        <Row>
                            <Col span={12}>
                                <div className="cs-dis-flex cs-hrz-center">
                                    <span className="cs-font-22 cs-fw-800 cs-green-clr">
                                        {mcxData.find((x) => x.symbol == "silver").High}
                                    </span>
                                </div>
                            </Col>

                            <Col span={12}>
                                <div className="cs-dis-flex cs-hrz-center">
                                    <span className="cs-font-22 cs-fw-800 cs-red-clr">
                                        {mcxData.find((x) => x.symbol == "silver").Low}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    </Col>
</Row>

const setColor = () => {
    // let classNameStyle = "saturation"
    // if ((adminData[index].buy + adminData[index].src == "gold" ?
    //   adminData[index].defaultgold : adminData[index].defaultsilver) <
    //   (adminData[index].buy + adminData[index].src == "gold" ?
    //     updatedAdminData[index].defaultgold : updatedAdminData[index].defaultsilver)) {
    //   classNameStyle = 'positive'
    // }
    // if ((adminData[index].buy + adminData[index].src == "gold" ?
    //   adminData[index].defaultgold : adminData[index].defaultsilver) >
    //   (adminData[index].buy + adminData[index].src == "gold" ?
    //     updatedAdminData[index].defaultgold : updatedAdminData[index].defaultsilver)) {
    //   classNameStyle = 'negative'
    // }
    // return classNameStyle
  }

  import React, { useEffect, useState } from "react";
import { Table, Row, Col, Spin } from 'antd'
import io from 'socket.io-client';

let adminUrl = 'http://localhost:3001'
// let adminUrl = 'https://socketapp7992.herokuapp.com/'

function LiveRate() {

  const [adminData, setAdminData] = useState([])
  const [updatedAdminData, setUpdatedAdminData] = useState([])
  //  
  const [mcxData, setMcxData] = useState([])
  const [upadtedMcxData, setUpdatedMcxData] = useState([])

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
      setUpdatedAdminData(data.filter((x) => x.active))
      setTimeout(() => {
        setAdminData(data.filter((x) => x.active))
      }, 500);
    })

    socketAdmin.on('trigger event', function (data) {
      setUpdatedAdminData(data.filter((x) => x.active))
      setTimeout(() => {
        setAdminData(data.filter((x) => x.active))
      }, 500);
    })

    socketAdmin.on('Liverate', function (data) {
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

    return () => {
      socketAdmin.disconnect();
    }

  }, []);

  return (
    mcxData.length && adminData.length && upadtedMcxData.length ?
      <div className="cs-90vh">
        <div className="cs-m-15">
          <div className="cs-font-large cs-fw-800 cs-dis-flex cs-hrz-center">
            Live Rate
          </div>
          <div className="cs-font-large cs-fw-800 cs-mb-10 cs-dis-flex cs-hrz-center">
            (For booking contact 9509636507)
          </div>

          {/* <div className="cs-card">
            <div className="cs-prime-bg cs-p-5">
              <Row>
                <Col lg={8} sm={4}>
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      Product Name
                    </span>
                  </div>
                </Col>

                <Col lg={8} sm={4}>
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      Buy
                    </span>
                  </div>
                </Col>

                <Col lg={8} sm={4}>
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      Sell
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </div> */}

          {/* {adminData.map((itm, index) => {
            return (
              <Row key={index} className="cs-card cs-p-5">
                <Col lg={8} key={index}>
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      {itm.name}
                    </span>
                  </div>
                </Col>

                <Col lg={8}>
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      {(+itm.buy) + (+(itm.type == "gold" ? itm.defaultgold : itm.defaultsilver))}
                    </span>
                  </div>
                </Col>

                <Col lg={8}>
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      {(+itm.sell) + (+(itm.type == "gold" ? itm.defaultgold : itm.defaultsilver))}
                    </span>
                  </div>
                </Col>
              </Row>
            )
          })} */}

          <Table dataSource={adminData} columns={columns} rowKey={'id'} pagination={false} />

          <Row gutter={[20, 20]} className="cs-tm-10">
            <Col lg={6}>
              <div className="cs-card">
                <div className="cs-prime-bg cs-p-5">
                  {/* title */}
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      GOLD MCX
                    </span>
                  </div>
                </div>

                <Row className="cs-tm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Bid
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Ask
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="cs-bm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('gold', 'Bid')}`}>
                        {mcxData.find((x) => x.symbol == "gold").Bid}
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('gold', 'Ask')}`}>
                        {mcxData.find((x) => x.symbol == "gold").Ask}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* footer */}
                <div className="cs-prime-footer cs-p-5">
                  <Row>
                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "gold").High}
                        </span>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "gold").Low}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="cs-card">
                <div className="cs-prime-bg cs-p-5">
                  {/* title */}
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      Silver MCX
                    </span>
                  </div>
                </div>

                <Row className="cs-tm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Bid
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Ask
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="cs-bm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('silver', 'Bid')}`}>
                        {mcxData.find((x) => x.symbol == "silver").Bid}
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('silver', 'Ask')}`}>
                        {mcxData.find((x) => x.symbol == "silver").Ask}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* footer */}
                <div className="cs-prime-footer cs-p-5">
                  <Row>
                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "silver").High}
                        </span>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "silver").Low}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="cs-card">
                <div className="cs-prime-bg cs-p-5">
                  {/* title */}
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      GOLD COMEX
                    </span>
                  </div>
                </div>

                <Row className="cs-tm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Bid
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Ask
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="cs-bm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('XAUUSD', 'Bid')}`}>
                        {mcxData.find((x) => x.symbol == "XAUUSD").Bid}
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('XAUUSD', 'Ask')}`}>
                        {mcxData.find((x) => x.symbol == "XAUUSD").Ask}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* footer */}
                <div className="cs-prime-footer cs-p-5">
                  <Row>
                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "XAUUSD").High}
                        </span>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "XAUUSD").Low}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="cs-card">
                <div className="cs-prime-bg cs-p-5">
                  {/* title */}
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      SILVER COMEX
                    </span>
                  </div>
                </div>

                <Row className="cs-tm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Bid
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Ask
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="cs-bm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('XAGUSD', 'Bid')}`}>
                        {mcxData.find((x) => x.symbol == "XAGUSD").Bid}
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('XAGUSD', 'Ask')}`}>
                        {mcxData.find((x) => x.symbol == "XAGUSD").Ask}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* footer */}
                <div className="cs-prime-footer cs-p-5">
                  <Row>
                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "XAGUSD").High}
                        </span>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "XAGUSD").Low}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={8}>
              <div className="cs-card">
                <div className="cs-prime-bg cs-p-5">
                  {/* title */}
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      INR/USD
                    </span>
                  </div>
                </div>

                <Row className="cs-tm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Bid
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Ask
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="cs-bm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('INRSpot', 'Bid')}`}>
                        {mcxData.find((x) => x.symbol == "INRSpot").Bid}
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('INRSpot', 'Ask')}`}>
                        {mcxData.find((x) => x.symbol == "INRSpot").Ask}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* footer */}
                <div className="cs-prime-footer cs-p-5">
                  <Row>
                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "INRSpot").High}
                        </span>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "INRSpot").Low}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={8}>
              <div className="cs-card">
                <div className="cs-prime-bg cs-p-5">
                  {/* title */}
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      GOLD MCX NEXT
                    </span>
                  </div>
                </div>

                <Row className="cs-tm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Bid
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Ask
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="cs-bm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('goldnext', 'Bid')}`}>
                        {mcxData.find((x) => x.symbol == "goldnext").Bid}
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('goldnext', 'Ask')}`}>
                        {mcxData.find((x) => x.symbol == "goldnext").Ask}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* footer */}
                <div className="cs-prime-footer cs-p-5">
                  <Row>
                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "goldnext").High}
                        </span>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "goldnext").Low}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={8}>
              <div className="cs-card">
                <div className="cs-prime-bg cs-p-5">
                  {/* title */}
                  <div className="cs-dis-flex cs-hrz-center">
                    <span className="cs-font-22 cs-fw-800">
                      SILVER MCX NEXT
                    </span>
                  </div>
                </div>

                <Row className="cs-tm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Bid
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className="cs-font-22 cs-fw-800">
                        Ask
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="cs-bm-10">
                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('silvernext', 'Bid')}`}>
                        {mcxData.find((x) => x.symbol == "silvernext").Bid}
                      </span>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="cs-dis-flex cs-hrz-center">
                      <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('silvernext', 'Ask')}`}>
                        {mcxData.find((x) => x.symbol == "silvernext").Ask}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* footer */}
                <div className="cs-prime-footer cs-p-5">
                  <Row>
                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-green-clr">
                          {mcxData.find((x) => x.symbol == "silvernext").High}
                        </span>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="cs-dis-flex cs-hrz-center">
                        <span className="cs-font-22 cs-fw-800 cs-red-clr">
                          {mcxData.find((x) => x.symbol == "silvernext").Low}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      :
      <div className="cs-vh-100 cs-dis-flex cs-vt-center cs-hrz-center">
        {console.log("sss", mcxData, adminData, upadtedMcxData)}
        <Spin spinning={true} />
      </div>
  )
}

export default LiveRate 




        