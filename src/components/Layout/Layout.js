import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

function Frame() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Frame