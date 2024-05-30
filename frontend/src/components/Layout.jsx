import React from 'react'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <div className='flex flex-grow'>
        <Sidebar />
        <div className='flex flex-grow justify-center'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout