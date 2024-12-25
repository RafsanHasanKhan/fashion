import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../App.css'
import Footer from '../components/Footer'
import useAuth from '../hooks/useAuth'
import Loading from '../components/Loading'

const Main = () => {
  const {loading} = useAuth()
  if(loading) {
    return <Loading></Loading>
  }
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