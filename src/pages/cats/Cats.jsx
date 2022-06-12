import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import CatDataTable from './CatDataTable'

export default function Cats() {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <CatDataTable />
      </div>
    </div>
  )
}
