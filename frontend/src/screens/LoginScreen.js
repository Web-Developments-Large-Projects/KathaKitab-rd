import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutContainer from '../components/LayoutContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    message: '',
  })

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) history.push(redirect)
  }, [userInfo, history, redirect])

  const formChangeHandler = (eventName) => (event) => {
    setValues({ ...values, [eventName]: event.target.value })
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()
    setValues({ ...values, message: '' })

    const { email, password } = values
    dispatch(login({ email, password }))
  }

  const signinForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          className='form-control'
          onChange={formChangeHandler('email')}
          value={values.email}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          className='form-control'
          onChange={formChangeHandler('password')}
          value={values.password}
        />
      </div>

      <button className='btn btn-primary' onClick={(e) => formSubmitHandler(e)}>
        Login
      </button>
    </form>
  )

  return (
    <LayoutContainer
      title='Login Section'
      description='Log in to browse the app via your account'
      className='container col-md-8 offset-md-2'
    >
      {loading && <Loader />}
      {error ? (
        <Message alert='danger'>{error}</Message>
      ) : values.message !== '' ? (
        <Message alert='danger'>{values.message}</Message>
      ) : null}
      {signinForm()}

      {JSON.stringify(values)}
    </LayoutContainer>
  )
}

export default LoginScreen
