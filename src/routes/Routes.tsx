import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import {AdminPath} from "./admin.routes";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        
    },
    {
        path : '/admin',
        element : <App/>,
        children : AdminPath
    },
    {
        path : '/faculty',
        element : <App/>,
        children : AdminPath
    },
    {
        path : '/student',
        element : <App/>,
        children : AdminPath
    },
    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/register',
        element : <Register/>
    }
])

export default router;