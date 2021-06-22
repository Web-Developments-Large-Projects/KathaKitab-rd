import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LayoutContainer from '../components/LayoutContainer'

const AdminDashboardScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminLinks = () => {
    return (
      <div className='card'>
        <h1 className='card-header'>Admin Links</h1>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/create-category' className='nav-link'>
              Create Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/create-product' className='nav-link'>
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminDetails = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{`Name:  ${userInfo.name}`}</li>
          <li className='list-group-item'>{`Email: ${userInfo.email}`}</li>
          <li className='list-group-item'>{`Role:  ${
            userInfo.role === 1 ? 'Admin' : 'Registered User'
          }`}</li>
        </ul>
      </div>
    )
  }

  return (
    <LayoutContainer
      title='Dashboard'
      description={`Welcome ${userInfo ? userInfo.name : 'User'}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-3'>{adminLinks()}</div>
        <div className='col-9'>{adminDetails()}</div>
      </div>
    </LayoutContainer>
  )
}

export default AdminDashboardScreen
