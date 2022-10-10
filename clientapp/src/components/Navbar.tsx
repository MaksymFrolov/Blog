import { Layout, Row, Menu } from 'antd'
import React,{FC} from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RouteNames } from '../router'

const Navbar: FC = () => {
    const navigate = useNavigate()
    const {isAuth}=useTypedSelector(state=>state.auth)
    const publicMenuItems =[
        {
            key:1,
            onClick:()=>navigate(RouteNames.HOME),
            label:"Home"
        },
        {
            key: 2,
            onClick:()=>navigate(RouteNames.POSTS),
            label:"Posts"
        },
        {
            key:3,
            onClick:()=>navigate(RouteNames.PEOPLE),
            label:"People"
        },
        {
            key: 4,
            onClick: () => navigate(RouteNames.LOGIN),
            label:"Login"
        },
    ]
    const privateMenuItems =[
        {
            key: 1,
            onClick: () => navigate(RouteNames.HOME),
            label:"Home"
        },
        {
            key: 2,
            onClick: () => navigate(RouteNames.POSTS),
            label:"Posts"
        },
        {
            key: 3,
            onClick: () => navigate(RouteNames.PEOPLE),
            label:"People"
        },
        {
            key: 4,
            onClick: () => navigate(RouteNames.HOME),
            label:"Logout"
        }
    ]
    return (
        <Layout.Header>
            <Row justify="end">
                {
                    isAuth
                        ?
                        <>
                            <div style={{ color: 'white' }}>
                                Hello
                            </div>
                            <Menu theme="dark" mode='horizontal' selectable={false} items={privateMenuItems}/>
                        </>
                        :
                        <Menu theme="dark" mode="horizontal" selectable={false} items={publicMenuItems}/>
                }

            </Row>
        </Layout.Header>
    )
}

export default Navbar