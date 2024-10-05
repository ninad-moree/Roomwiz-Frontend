import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='mt-5 text-start'>
        <h2>Welcome to Admin Panel</h2>
        <hr />

        <Link to={"/add-room"} className='d-block'>
            Manage Rooms
        </Link>
    </section>
  )
}

export default Admin