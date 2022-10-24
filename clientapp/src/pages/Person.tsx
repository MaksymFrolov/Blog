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
  const covertDate = (date: Date)=>{
    return new Date(date).toLocaleDateString()
  }
  return (
    <Layout>
      <Row justify='center' align='middle' className='h100'>
        {error && <div style={{ color: 'red' }}>
          {error}
        </div>}
        <Card hoverable title={<a>Person Form</a>} style={{ width: 400, height: 300 }} loading={isLoading}>
            <p>Firstname: {user.firstName}</p>
            <p>Lastname: {user.lastName}</p>
            <p>Birthdate: {<>{covertDate(user.birthDate)}</>}</p>
            <p><a>Commenth: {user.commentIds?.length}</a></p>
            <p><a>Posts: {user.postIds?.length}</a></p>
        </Card>
      </Row>
    </Layout>
  )
}

export default Person