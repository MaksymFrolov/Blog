import Home from "../pages/Home"
import Login from "../pages/Login"
import People from "../pages/People"
import Person from "../pages/Person"
import Post from "../pages/Post"
import Posts from "../pages/Posts"

export interface IRoute{
    path:string
    element: React.ComponentType
}

export enum RouteNames{
    LOGIN = "/login",
    HOME = "/",
    POST = "/post",
    POSTS = "/posts",
    PERSON = "/person",
    PEOPLE = "/people"
}

export const publicRoutes: IRoute[] = [
    {path:RouteNames.HOME, element:Home},
    {path:RouteNames.POST, element:Post},
    {path:RouteNames.POSTS, element:Posts},
    {path:RouteNames.LOGIN, element:Login}
]

export const privateRoutes: IRoute[] = [
    {path:RouteNames.PERSON, element:Person},
    {path:RouteNames.PEOPLE, element:People},
    {path:RouteNames.HOME, element:Home},
    {path:RouteNames.POST, element:Post},
    {path:RouteNames.POSTS, element:Posts}
]