import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes, RouteNames } from '../route'

const AppRouter = () => {
    const auth = false
  return (
    auth?
        <Routes>
            {privateRoutes.map(route=>
                <Route path={route.path}
                        element={<route.element/>}
                        key={route.path}
                />
            )}
            <Route
                path="*"
                element={<Navigate to={RouteNames.HOME} replace />}
            />
        </Routes>
        :
        <Routes>
            {publicRoutes.map(route=>
                <Route path={route.path}
                        element={<route.element/>}
                        key = {route.path}
                />
            )}
            <Route
                path="*"
                element={<Navigate to={RouteNames.HOME} replace />}
            />
        </Routes>
  )
}

export default AppRouter