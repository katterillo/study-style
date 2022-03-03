import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import CalendarPage from './Calendar/Calendar'
import PomTimer from './Pomodoro/PomTimer'
import Search from './user/Search'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/userprofiles" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/user/:userId" component={Profile}/>
        <PrivateRoute path="/userprofile/edit/:userId" component={EditProfile}/>
        <Route path="/userprofile/:userId" component={Profile}/>
        <Route path="/calendar" component={CalendarPage}/>
        <Route path="/pomodoro" component={PomTimer}/>
        <Route path="/search" component={Search}/>
      </Switch>
    </div>)
}

export default MainRouter
