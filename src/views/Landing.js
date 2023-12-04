import Footer from 'components/Footers/Footer'
import Navbar from 'components/Landing/Navbar'
import WorkingSpace from 'components/Landing/WorkingSpace'
import React from 'react'

function Landing() {
  return (
    <div className=''>
        <Navbar/>
        <div className=' my-8 rounded mx-auto max-w-screen-lg'>
            <WorkingSpace />
        </div>
        <Footer />
    </div>
  )
}

export default Landing