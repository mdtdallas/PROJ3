import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import UsersDataTable from './UsersDataTable'

export default function UsersList() {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <UsersDataTable />
      </div>
    </div>
  )
}
