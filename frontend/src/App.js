import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Header from './components/Header'
import UserDashboardScreen from './screens/UserDashboardScreen'
import {
  PrivateRoute,
  ClientRoute,
  AdminRoute,
} from './middlewares/authMiddlewares'
import AdminDashboardScreen from './screens/AdminDashboardScreen'

const App = () => {
  return (
    <Router>
      <main id='main-container'>
        {/* <Switch> */}
        <Header />
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/register' component={RegisterScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <ClientRoute exact path='/dashboard' component={UserDashboardScreen} />
        <AdminRoute
          path='/admin/dashboard'
          exact
          component={AdminDashboardScreen}
        />
        {/* <Route exact path='/dashboard' component={UserDashboardScreen} /> */}
        {/* </Switch> */}
      </main>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
