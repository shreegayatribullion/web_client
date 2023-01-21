import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Spin, Card } from 'antd'
import { adminUrl } from '../../constant'

// let adminUrl = 'http://localhost:3001/'
// let adminUrl = 'https://socketapp7992.herokuapp.com/'
// let adminUrl = 'https://app-ei2u.onrender.com/'
// let adminUrl = 'https://socket-api-neon.vercel.app/'
// let adminUrl = 'https://7867-103-170-69-128.in.ngrok.io/'
// let adminUrl = 'https://socket-api-1.onrender.com/'


const Bank = () => {
  const [apiResponse, setApiResponse] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(adminUrl + "bankdetail").then((res) => {
      setApiResponse(res.data.records)
    })
  }

  return (
    apiResponse.length ?
      <div className='cs-tm-80'>
        <div className='cs-font-30 cs-lm-10 cs-clr-fff'>
          Bank Details
        </div>
        <div>
          {apiResponse.map((item, index) => {
            return (
              <div className='cs-tm-10 cs-lm-10 cs-fw-800 cs-clr-fff' key={index}>
                <div className='cs-dis-grid-2 cs-jc-sb'>
                  <div className="cs-dis-flex">
                    <div className="cs-rm-5">
                      Bank Name:
                    </div>
                    <div>
                      {item.name}
                    </div>
                  </div>

                  <div className="cs-dis-flex">
                    <div className="cs-rm-5">
                      Account name:
                    </div>
                    <div>
                      {item.accname}
                    </div>
                  </div>

                  <div className="cs-dis-flex">
                    <div className="cs-rm-5">
                      Account no.:
                    </div>
                    <div>
                      {item.accno}
                    </div>
                  </div>

                  <div className="cs-dis-flex">
                    <div className="cs-rm-5">
                      IFSC number:
                    </div>
                    <div>
                      {item.bcode}
                    </div>
                  </div>

                  <div className="cs-dis-flex">
                    <div className="cs-rm-5">
                      Branch number:
                    </div>
                    <div>
                      {item.bname}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      : <div className="cs-vh-100 cs-dis-flex cs-vt-center cs-hrz-center">
        <Spin spinning={true} />
      </div>
  )
}

export default Bank