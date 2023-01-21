import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import { adminUrl } from '../../constant'
const ContactUs = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // let adminUrl = 'http://localhost:3001/'
  // let adminUrl = 'https://socketapp7992.herokuapp.com/'
  // let adminUrl = 'https://app-ei2u.onrender.com/'
  // let adminUrl = 'https://socket-api-neon.vercel.app/'
  // let adminUrl = 'https://socket-api-1.onrender.com/'

  const onCreate = (value) => {
    setLoading(true)
    if (value.cnumber.length !== 10) {
      message.error("Please enter valid mobile number")
      return
    }
    localStorage.setItem('isLoggedIn', true)
    value.action = 'INSERT'
    axios.post(adminUrl + "contact", value).then((value) => {
      window.location.reload()
      setLoading(false)
      form.resetFields()
      message.info("Message Sent")
    })
  }

  return (
    <div className={localStorage.getItem("isLoggedIn") ? 'cs-tm-80' : "cs-tm-20"}>
      <div className='cs-font-30 cs-lm-10 cs-clr-fff' style={{marginTop:62}}>
        {localStorage.getItem("isLoggedIn") ? "Contact us" : "Please fill the form to continue"}
      </div>
      <div style={{ margin: 10 }}>
        <Form
          onFinish={onCreate}
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
        // onFinish={onCreate}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input name!',
              },
            ]}>
            <Input placeholder='Name' />
          </Form.Item>

          <Form.Item
            label="Contact number"
            name="cnumber"
            rules={[
              {
                required: true,
                message: 'Please input contact number!',
              },
            ]}>
            <Input placeholder='Contact number' />
          </Form.Item>

          <Form.Item
            label="Frim name"
            rules={[
              {
                required: true,
                message: 'Please input frim name!',
              },
            ]}
            name="frim">
            <Input placeholder='Frim name' />
          </Form.Item>

          <Form.Item
            label="Message"
            name="msg">
            <Input.TextArea placeholder='Message' />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type='primary' htmlType='submit' className=''>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ContactUs