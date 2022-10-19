import { Card, Divider, Layout, List, Row } from 'antd'
import {MessageOutlined, ContainerOutlined} from '@ant-design/icons'
import React,{FC, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { CommentsActionCreators } from '../store/reduce/comments/action-creators'
import { PostsActionCreators } from '../store/reduce/posts/action-creators'
import { UsersActionCreators } from '../store/reduce/users/action-creators'
import { IRegUser } from '../models/IRegUser'

const People: FC = () => {
  const navigate = useNavigate()
  const { error, isLoading, users, page, enough } = useTypedSelector(state => state.users)
  const { posts } = useTypedSelector(t => t.posts)
  const { comments } = useTypedSelector(t => t.comments)
  const { loadUsers } = useActions(UsersActionCreators)
  const { loadPosts } = useActions(PostsActionCreators)
  const { loadComments } = useActions(CommentsActionCreators)
  useEffect(() => {
    loadUsers(0, 5)
    loadComments()
    loadPosts()
  }, [])
  const countComment = (user: IRegUser) => {
    let sum = 0
    // comments.map(t => {
    //   if (t.email === user.id) {
    //     sum++
    //   }
    // })
    return sum
  }
  const countPost = (user: IRegUser) => {
    let sum = 0
    posts.map(t => {
      if (t.userId === user.id) {
        sum++
      }
    })
    return sum
  }
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
      <Row justify='center' align='middle'>
        <InfiniteScroll
          dataLength={users.length}
          next={() => {
            loadUsers(page, 5, users)
          }}
          hasMore={enough}
          loader={<Card style={{ width: 300, marginBottom: 16 }} loading={true} />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            loading={isLoading}
            // grid={{
            //   column:2
            // }}
            dataSource={users}
            renderItem={item => (
              <Row justify='center' align='middle'>
                <List.Item key={item.username}>
                  <Card
                    hoverable
                    onClick={() => { navigate(`/people/${item.id}`) }}
                    title={<a>{item.name}</a>}
                    style={{ width: 300, marginRight: 15, marginLeft: 15 }}>
                    <p>{item.name}</p>
                    <p>{item.username}</p>
                    <Divider plain style={{ marginBottom: 5 }} />
                    <MessageOutlined style={{ marginRight: 5 }} />
                    {countComment(item) }
                    <ContainerOutlined style={{ marginRight: 5 , marginLeft:10}}/>
                    {countPost(item)}
                  </Card>
                </List.Item>
              </Row>
            )}
          />
        </InfiniteScroll>
      </Row>
    </Layout>
  )
}

export default People