import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'

const routes = [
    {
        path: "/register",
        component: RegisterPage,
        title: 'Register',
        auth: false
    },
    {
        path: "/login",
        component: LoginPage,
        title: 'Login',
        auth: false
    },
    {
        path: "/",
        component: HomePage,
        title: 'Home',
        auth: true
    },
]

export default routes;