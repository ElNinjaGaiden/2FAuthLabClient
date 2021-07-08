import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';

// Components
import Startup from './Startup';
import Drawer from './components/drawer';
import PrivateRoute from './components/privateRoute';

// Views
import Login from './views/login/login';
import SignUp from './views/signUp/signUp';
import Home from './views/home/home';
import View2 from './views/view2';

// Redux store
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Startup>
        <Router>
          <div id="app">
            <Drawer />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/view2" component={View2} />
            </Switch>
          </div>
        </Router>
      </Startup>
    </Provider>
  );
}

export default App;
