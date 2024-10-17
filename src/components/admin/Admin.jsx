import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='mt-5 text-start'>
        <h2>Welcome to Admin Panel</h2>
        <hr />

        <Link to={"/existing-rooms"} className='d-block'>Manage Rooms</Link><br/>
        <Link to={"/existing-bookings"} className='d-block'>Manage Bookings</Link>
    </section>
  )
}

export default Admin