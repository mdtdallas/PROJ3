import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ShowsDataTable from './ShowsDataTable'

export default function ShowsList() {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ShowsDataTable />
      </div>
    </div>
  )
}
