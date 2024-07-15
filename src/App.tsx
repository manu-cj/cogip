import './css/App.css'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './component/dashboard/DashBoard'
import NavBar from './component/main/navigation/NavBar'
function App() {

  return (
    <>
    <NavBar/>
      <Routes>
         <Route path="/dashboard" element={<DashBoard />}></Route>
      </Routes>
      
    </>
  )
}

export default App