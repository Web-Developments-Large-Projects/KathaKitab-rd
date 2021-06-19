import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#212529' }
  } else {
    return { color: '#fff' }
  }
}

const Header = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link to='/' className='nav-link' style={isActive(history, '/')}>
            Home
          </Link>
        </li>
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
      </ul>
    </div>
  )
}

export default withRouter(Header)
