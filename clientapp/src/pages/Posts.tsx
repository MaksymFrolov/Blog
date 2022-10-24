import { Card, Divider, Layout, List, Row } from 'antd'
import {MessageOutlined} from '@ant-design/icons'
import React,{FC, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IPost } from '../models/IPost'
import { useNavigate } from 'react-router-dom'
import { PostsActionCreators } from '../store/reduce/posts/action-creators'
import { UsersActionCreators } from '../store/reduce/users/action-creators'
import { CommentsActionCreators } from '../store/reduce/comments/action-creators'

const Posts: FC = () => {
  const navigate = useNavigate()
  const { error, posts, isLoading, enough, page } = useTypedSelector(t => t.posts)
  const { users } = useTypedSelector(t => t.users)
  const { loadPosts } = useActions(PostsActionCreators)
  const { loadUsers } = useActions(UsersActionCreators)
  const findUser = (post: IPost) => {
    const user = users.find(t => t.id === post.personId)
    return user?.firstName
  }
  useEffect(() => {
    loadPosts(0, 5, [])
    loadUsers()
  }, [])
  const sliceContent = (content: string) => {
    if (content.length > 1000) {
      return content.slice(0, 1000) + "..."
    }
    else {
      return content
    }
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
      <Row justify='center'>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            loadPosts(page, 5, posts)
          }}
          hasMore={enough}
          loader={<Card style={{ width: 600, marginBottom: 15, marginTop: 15 }} loading={true} />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            loading={isLoading}
            dataSource={posts}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  title={item.title}
                  style={{ width: 600, marginRight: 15, marginLeft: 15 }}
                  onClick={() => { navigate(`/posts/${item.id}`) }}
                  extra={
                    <a onClick={() => { navigate(`/people/${item.personId}`) }}>
                      {findUser(item)}
                    </a>
                  }>
                  <p>
                    {
                      sliceContent(item.content)
                    }
                  </p>
                  <Divider plain style={{ marginBottom: 5 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <MessageOutlined style={{ marginRight: 5 }} />
                      {item.commentIds.length}
                    </div>
                    <div>
                        Posted: <>
                          {
                            item.dateCreated
                          }
                        </>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Row>
    </Layout>
  )
}

export default Posts