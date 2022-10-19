import { Card, Layout, Row } from 'antd'
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { UserActionCreators } from '../store/reduce/user/action-creators'

const Person: FC = () => {
  const { error, isLoading, user } = useTypedSelector(state => state.user)
  const { loadUser } = useActions(UserActionCreators)
  const param = useParams()
  useEffect(() => {
    loadUser(param.id)
  }, [])
  return (
    <Layout>
      <Row justify='center' align='middle' className='h100'>
        {error && <div style={{ color: 'red' }}>
          {error}
        </div>}
        <Card hoverable title={<a>Person Form</a>} style={{ width: 500, height: 600 }} loading={isLoading}>
          <p>{user.name}</p>
          <p>{user.username}</p>
        </Card>
      </Row>
    </Layout>
  )
}

export default Person