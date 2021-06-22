import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import LayoutContainer from '../components/LayoutContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history, location }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    message: '',
  })

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: userInfoLogin } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo || userInfoLogin) history.push(redirect)
  }, [userInfo, history, redirect, userInfoLogin])

  const formChangeHandler = (eventName) => (event) => {
    setValues({ ...values, [eventName]: event.target.value })
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()
    setValues({ ...values, message: '' })

    if (values.password !== values.confirmPassword) {
      setValues({ ...values, message: 'Passwords do no match' })
    } else {
      const { name, email, password } = values
      dispatch(register({ name, email, password }))
    }
  }

  const signupForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={formChangeHandler('name')}
          value={values.name}
        />
      </div>

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
      <div className='form-group'>
        <label className='text-muted'>Confirm Password</label>
        <input
          type='password'
          className='form-control'
          onChange={formChangeHandler('confirmPassword')}
          value={values.confirmPassword}
        />
      </div>
      <button className='btn btn-primary' onClick={(e) => formSubmitHandler(e)}>
        Submit
      </button>
    </form>
  )

  return (
    <>
      <LayoutContainer
        title='Register Section'
        description="Register your account. It's quick. It's free."
        className='container col-md-8 offset-md-2'
      >
        {loading && <Loader />}
        {error ? (
          <Message alert='danger'>{error}</Message>
        ) : values.message !== '' ? (
          <Message alert='danger'>{values.message}</Message>
        ) : null}
        {signupForm()}

        {JSON.stringify(values)}
      </LayoutContainer>
    </>
  )
}

export default RegisterScreen
