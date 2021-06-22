import React from 'react'
import { useSelector } from 'react-redux'
import LayoutContainer from '../components/LayoutContainer'

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <LayoutContainer
      title={
        userInfo
          ? `Welcome ${userInfo.name} to Home Page`
          : 'Welcome to Home Page'
      }
      description='Node React E-commerce App'
    ></LayoutContainer>
  )
}

export default HomeScreen
