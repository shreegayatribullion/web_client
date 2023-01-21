<Col lg={6} xs={12}>
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
    <Col lg={12} xs={12}>
      <div className="cs-dis-flex cs-hrz-center">
        <span className="cs-font-22 cs-fw-800">
          Bid
        </span>
      </div>
    </Col>

    <Col lg={12} xs={12}>
      <div className="cs-dis-flex cs-hrz-center">
        <span className="cs-font-22 cs-fw-800">
          Ask
        </span>
      </div>
    </Col>
  </Row>

  <Row className="cs-bm-10">
    <Col lg={12} xs={12}>
      <div className="cs-dis-flex cs-hrz-center">
        <span className={`${"cs-font-22 cs-fw-800 cs-p-5 " + setMcxColor('gold', 'Bid')}`}>
          {mcxData.find((x) => x.symbol == "gold").Bid}
        </span>
      </div>
    </Col>

    <Col lg={12} xs={12}>
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
      <Col lg={12} xs={12}>
        <div className="cs-dis-flex cs-hrz-center">
          <span className="cs-vt-center cs-dis-flex">
            <ArrowUpOutlined className="cs-green-clr cs-fw-800 cs-font-22" />
          </span>
          <span className="cs-font-22 cs-fw-800 cs-green-clr">
            {mcxData.find((x) => x.symbol == "gold").High}
          </span>
        </div>
      </Col>

      <Col lg={12} xs={12}>
        <div className="cs-dis-flex cs-hrz-center">
          <span className="cs-vt-center cs-dis-flex">
            <ArrowDownOutlined className="cs-red-clr cs-fw-800 cs-font-22" />
          </span>
          <span className="cs-font-22 cs-fw-800 cs-red-clr">
            {mcxData.find((x) => x.symbol == "gold").Low}
          </span>
        </div>
      </Col>
    </Row>
  </div>
</div>
</Col>