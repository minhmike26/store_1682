import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

//Layout wrapper chứa: Header, main (chứa các component con) và Footer
const UserLayout = () => {
  return (
    <>
    <Header />
    <main>
      <Outlet /> {/* hiển thị các component con */}
    </main>
    <Footer />
    </>
  )
}

export default UserLayout