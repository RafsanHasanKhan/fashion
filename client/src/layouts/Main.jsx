import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../App.css'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <div >
      <Navbar></Navbar>
        <div>
        <Outlet ></Outlet>
        </div>
      <Footer></Footer>
    </div>
  )
}

export default Main