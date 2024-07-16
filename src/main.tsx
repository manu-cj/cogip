import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import Register from './component/form/Register.tsx'
import Login from './component/form/Login.tsx'
import Invoices from './component/pages/Invoices.tsx'
import Contacts from './component/pages/Contacts.tsx';
import Compagnies from './component/pages/Compagnies.tsx';
import Show_contact from './component/pages/Show_contact.tsx';
import Show_compagnies from './component/pages/Show_compagnies.tsx';
import DashBoard from './component/dashboard/DashBoard.tsx'
import ErrorPage from './component/pages/Error-page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/signup",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <DashBoard/>,
  },
  {
    path: "/invoices",
    element: <Invoices/>,
  },
  {
    path: "/contacts",
    element: <Contacts/>,
  },
  {
    path: "/companies",
    element: <Compagnies/>,
  },
  {
    path: "/show_contact",  //On modifiera surement cette route
    element: <Show_contact/>,
  },
  {
    path: "/show_compagnies",  //On modifiera surement cette route
    element: <Show_compagnies/>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)
