import { Avatar, Card, Col, Divider, Layout, List, Row, Skeleton, Space } from 'antd'
import React,{FC, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const People: FC = () => {
  const { error, isLoading, users, page, enough } = useTypedSelector(state => state.user)
  const { loadUser } = useActions()
  useEffect(() => {
    loadUser([])
  }, [])
  return (
    <Layout
      id='scrollableDiv'
      style={{
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}
    >
      {error && <div style={{ color: 'red' }}>
        {error}
      </div>}
      <InfiniteScroll
        dataLength={users.length}
        next={()=>{
          loadUser(users, page)}}
        hasMore={enough}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          loading={isLoading}
          dataSource={users}
          renderItem={item => (
            <Row justify='center'>
              <List.Item key={item.username}>
                <Card hoverable title={<a href="/">{item.name}</a>} style={{ width: 300 }}>
                  <p>{item.name}</p>
                  <p>{item.username}</p>
                </Card>
              </List.Item>
            </Row>
          )}
        />
      </InfiniteScroll>
    </Layout>
  )
}

export default People