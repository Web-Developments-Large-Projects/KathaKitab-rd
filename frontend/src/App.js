import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'
import Header from './components/Header'

const App = () => {
  return (
    <Router>
      <main>
        {/* <Switch> */}
        <Header />
        <Route exact path='/' component={HomeScreen} />
        <Route path='/register' component={SignupScreen} />
        <Route path='/login' component={SigninScreen} />
        {/* </Switch> */}
      </main>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
