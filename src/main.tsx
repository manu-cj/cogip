import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import Register from './component/Register.tsx'
import Login from './component/Login.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)
