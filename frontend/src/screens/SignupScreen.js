import React from 'react'
import LayoutContainer from '../components/LayoutContainer'
import { API } from '../config'

const SignupScreen = () => {
  return (
    <LayoutContainer
      title='Register Section'
      description="Register your account. It's quick. It's free."
    >
      {API}
    </LayoutContainer>
  )
}

export default SignupScreen
