import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import Login from './components/Login'
import SignUp from './components/SignUp'
import SearchContainer from './components/SearchContainer'
import ProfileContainer from './components/ProfileContainer'
import ReservationContainer from './components/ReservationContainer'
import Home from './components/Home'
import StudioShowContainer from './components/StudioShowContainer'
import ProfileDetails from './components/ProfileDetails'
import Wrapper from './components/Wrapper'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
      <Route path="/instructors/:customPath" render={routerProps => <Wrapper {...routerProps}/>} />
      <Route exact path="/welcome" component={App} />
      <Route exact path="/login" render={routerProps => <Login {...routerProps}/>} />
      <Route exact path="/signup" render={routerProps => <SignUp {...routerProps}/>} />
      <Route exact path="/home" render={routerProps => <Home {...routerProps}/>} />
      <Route exact path="/search" render={routerProps => <SearchContainer {...routerProps}/>} />
      <Route exact path="/reserve" render={routerProps => <ReservationContainer {...routerProps}/>}/>
      <Route exact path="/profile" render={routerProps => <ProfileContainer {...routerProps}/>}/>
      <Route exact path="/profile/favorites" render={routerProps => <ProfileContainer {...routerProps}/>}/>
      <Route exact path="/profile/reservations" render={routerProps => <ProfileContainer {...routerProps}/>}/>

      <Route exact path="/flywheel_sports" render={routerProps => <StudioShowContainer {...routerProps}/>}/>
      <Route exact path="/soulcycle" component={StudioShowContainer} />
      <Route exact path="/peleton" component={StudioShowContainer} />
      <Route exact path="/crank" component={StudioShowContainer} />
      <Route exact path="/cyc_fitness" component={StudioShowContainer} />
      <Route exact path="/ryde_fitness" component={StudioShowContainer} />
      <Route exact path="/swerve_fitness" component={StudioShowContainer} />
      <Route exact path="/sync_studio" component={StudioShowContainer} />
      <Route exact path="/aqua_studio" component={StudioShowContainer} />

      <Redirect from="/" to="/welcome" />
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
