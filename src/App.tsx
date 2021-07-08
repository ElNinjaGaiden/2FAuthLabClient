import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import './App.css';

// Components
import Startup from './Startup';
import Drawer from './components/drawer';

// Views
import Login from './views/login/login';
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
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Home} />
              <Route path="/view2" component={View2} />
            </Switch>
          </div>
        </Router>
      </Startup>
    </Provider>
  );
}

export default App;
