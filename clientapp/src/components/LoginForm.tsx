import { Button, Checkbox, Form, Input } from 'antd'
import React, { FC, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { rules } from '../utils/rules'

const LoginForm: FC = () => {
  const { error, isLoading } = useTypedSelector(state => state.auth)
  const [username,setLogin]=useState('')
  const [password,setPassword]=useState('')
  const {login}=useActions()
  const submit = () => {
    login(username, password)
  }
  return (
    <Form
      onFinish={submit}
    >
      {error && <div style={{ color: 'red' }}>
        {error}
      </div>}
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Please input your username!')]}
      >
        <Input
          value={username}
          onChange={e => setLogin(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required('Please input your password!')]}
      >
        <Input.Password
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm