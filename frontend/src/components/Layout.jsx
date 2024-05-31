import React from 'react'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar />
      <div className='flex h-auto flex-col place-items-center justify-center'>
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout