import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import Register from './component/login/Register.tsx'
import Login from './component/login/Login.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard from './component/dashboard/DashBoard.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <DashBoard/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)
