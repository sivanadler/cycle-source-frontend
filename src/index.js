import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import Login from './components/Login'
import SearchContainer from './components/SearchContainer'
import ProfileContainer from './components/ProfileContainer'
import ReservationContainer from './components/ReservationContainer'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/search" component={SearchContainer} />
      <Route exact path="/reserve" component={ReservationContainer} />
      <Route exact path="/profile" component={ProfileContainer} />
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
