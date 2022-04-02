import Home from './pages/Home'
import User from './pages/User';
import NotFound from './pages/NotFound'

const Routers = [
    {
        key: 'home',
        path: '/',
        exact: true,
        component: Home,
        roles: []
    },
    {
        key: 'login',
        path: '/login',
        exact: true,
        component: Home,
        roles: []
    },
    {
        key: 'register',
        path: '/register',
        exact: true,
        component: Home,
        roles: []
    },
    {
        key: 'forgot-password',
        path: '/forgot-password',
        exact: true,
        component: Home,
        roles: []
    },
    {
        key: 'user',
        path: '/user',
        exact: true,
        component: User,
        roles: [1]
    },
    {
        key: '404',
        path: '/',
        exact: false,
        component: NotFound,
        roles: []
    }
];

export default Routers;