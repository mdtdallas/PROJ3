import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import PhotoBoard from './PhotoBoard'

export default function Photos() {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <PhotoBoard />
      </div>
    </div>
  )
}
