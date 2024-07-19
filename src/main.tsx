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
import Show_contact from './component/show-details/Show_contact.tsx';
import Show_compagnies from './component/show-details/Show_compagnies.tsx';
import DashBoard from './component/dashboard/DashBoard.tsx'
import ErrorPage from './component/pages/Error-page';
import InvoicesDashboard from './component/dashboard/InvoicesDashboard.tsx';
import CompaniesDashboard from './component/dashboard/CompaniesDashboard.tsx';
import ContactDashboard from './component/dashboard/ContactDashboard.tsx';


const router = createBrowserRouter([
  {
    path: "*",
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
    path: "/invoices/:nbPerPage/:page?",
    element: <Invoices/>,
  },
  {
    path: "/contacts/:nbPerPage/:page?",
    element: <Contacts/>,
  },
  {
    path: "/companies/:nbPerPage/:page?",
    element: <Compagnies/>,
  },
  {
    path: "/show_contact/:id",  //On modifiera surement cette route
    element: <Show_contact/>,
  },
  {
    path: "/show_companies",  //On modifiera surement cette route
    element: <Show_compagnies/>,
  },
  {
    path: "/dashboard/invoices",
    element : <InvoicesDashboard/>
  },
  {
    path:"/dashboard/companies",
    element: <CompaniesDashboard/>
  },
  {
    path: "/dashboard/contact",
    element: <ContactDashboard/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)
