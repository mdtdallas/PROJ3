import React from 'react'
import DataTable from '../components/DataTable'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const List = () => {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable />
      </div>
    </div>
  )
}

export default List