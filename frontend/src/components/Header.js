import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../actions/userActions'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#212529' }
  } else {
    return { color: '#fff' }
  }
}

const Header = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  return (
    <div>
      <ul
        className='nav nav-tabs bg-primary '
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <li className='nav-item'>
          <Link
            to='/'
            className='nav-link'
            style={{
              color: '#E3E7AF',
              fontWeight: '600',
            }}
          >
            Kathakitab
          </Link>
        </li>
        <li>
          <div className='nav-item'>
            <Link to='/' className='nav-link' style={isActive(history, '/')}>
              Home
            </Link>
          </div>
        </li>
        <li>
          <div className='nav-item'>
            <Link
              to={
                userInfo && userInfo.role === 1
                  ? '/admin/dashboard'
                  : '/dashboard'
              }
              className='nav-link'
              style={isActive(
                history,
                `${
                  userInfo && userInfo.role === 1
                    ? '/admin/dashboard'
                    : '/dashboard'
                }`
              )}
            >
              Dashboard
            </Link>
          </div>
        </li>
        {userInfo ? (
          <>
            <li className='nav-item'>
              <Link
                to='/profile'
                className='nav-link'
                style={isActive(history, '/profile')}
              >
                Profile
              </Link>
            </li>
            <li className='nav-item'>
              <span
                className='nav-link'
                style={{ cursor: 'pointer', color: '#fff' }}
                onClick={(e) => logoutHandler(e)}
              >
                Log Out
              </span>
            </li>
          </>
        ) : (
          <>
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-link'
                style={isActive(history, '/login')}
              >
                Log In
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/register'
                className='nav-link'
                style={isActive(history, '/register')}
              >
                Register
              </Link>
            </li>
          </>
        )}
        {/* {userInfo && userInfo.role === 1 && (
          <>
            <li className='nav-item'>
              <Link
                to='/admin/products'
                className='nav-link'
                style={isActive(history, '/admin/products')}
              >
                Products
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/admin/users'
                className='nav-link'
                style={isActive(history, '/admin/users')}
              >
                Users
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/admin/orders'
                className='nav-link'
                style={isActive(history, '/admin/orders')}
              >
                Orders
              </Link>
            </li>
          </>
        )} */}
      </ul>
    </div>
  )
}

export default withRouter(Header)
