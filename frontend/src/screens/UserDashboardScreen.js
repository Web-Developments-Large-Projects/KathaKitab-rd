import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LayoutContainer from '../components/LayoutContainer'

const UserDashboardScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userLinks = () => {
    return (
      <div className='card'>
        <h1 className='card-header'>Links</h1>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/cart' className='nav-link'>
              My Cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/profile-update' className='nav-link'>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  const userDetails = () => {
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

  const purchaseHistory = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase History</h3>
        <ul className='list-group'>
          <li className='list-group-item'>History</li>
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
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userDetails()}
          {purchaseHistory()}
        </div>
      </div>
    </LayoutContainer>
  )
}

export default UserDashboardScreen
