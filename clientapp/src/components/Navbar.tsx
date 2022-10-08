import { Layout, Row, Menu } from 'antd'
import React,{FC} from 'react'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../route'

const Navbar: FC = () => {
    const navigate = useNavigate()
    const auth = true
    const publicMenuItems =[
        {
            key: 1,
            onClick: () => navigate(RouteNames.LOGIN),
            label:"Login"
        }
    ]
    const privateMenuItems =[
        {
            key: 1,
            onClick: () => navigate(RouteNames.HOME),
            label:"Logout"
        }
    ]
    return (
        <Layout.Header>
            <Row justify="end">
                {
                    auth
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