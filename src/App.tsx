
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './component/dashboard/DashBoard'
function App() {

  return (
    <>
      <Routes>
         <Route path="/dashboard" element={<DashBoard />}></Route>
      </Routes>
      
    </>
  )
}

export default App
