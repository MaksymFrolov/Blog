import { Card, Divider, Layout, List, Row } from 'antd'
import Column from 'antd/lib/table/Column'
import React, {FC, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate, useParams } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { CommentsActionCreators } from '../store/reduce/comments/action-creators'
import { PostActionCreators } from '../store/reduce/post/action-creators'
import { UsersActionCreators } from '../store/reduce/users/action-creators'

const Post: FC = () => {
  const navigate = useNavigate()
  const param = useParams()
  const { post, isLoading, error } = useTypedSelector(t => t.post)
  const { comments, error: commentError, page, enough, isLoading: commentIsLoading } = useTypedSelector(t => t.comments)
  const { users } = useTypedSelector(t => t.users)
  const { loadPost } = useActions(PostActionCreators)
  const { loadComments } = useActions(CommentsActionCreators)
  const { loadUsers } = useActions(UsersActionCreators)
  useEffect(() => {
    loadPost(param.id)
    loadComments(0, 5, [])
    loadUsers()
  }, [])
  return (
    <Layout
    id='scrollableDiv'
    style={{
      height: 'calc(100vh - 64px)',
      overflow: 'auto'
    }}
    >
      <Row justify='center' style={{marginTop:50}}>
        {error && <div style={{ color: 'red' }}>
          {error}
        </div>}
        <Card hoverable title={post.title} style={{ width: 900 }} loading={isLoading}>
          <p>{post.body}</p>
        </Card>
      <Divider plain>Comments</Divider>
        {commentError && <div style={{ color: 'red' }}>
          {commentError}
        </div>}
        <InfiniteScroll
          dataLength={comments.length}
          next={() => {
            loadComments(page, 5, comments)
          }}
          hasMore={enough}
          loader={<Card style={{ width: 600, marginBottom: 15, marginTop: 15 }} loading={true} />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            loading={commentIsLoading}
            dataSource={comments.filter(t=>t.postId===post.id)}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  title={item.name}
                  style={{ width: 600}}
                // extra={
                //   <a onClick={() => { navigate(`/people/${item.id}`) }}>
                //     {findUser(item)}
                //   </a>
                // }
                >
                  <p>{item.body}</p>
                </Card>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Row>
    </Layout>
  )
}

export default Post