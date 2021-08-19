import logo from './logo.svg';
import './App.css';
import Main from './pages/main.js'
import Table from './pages/table.js'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">

    <Router>

          <Switch>
          <Route exact path="/">
             <Table/>
          </Route>
            <Route exact path="/table">
               <Table/>
            </Route>
            <Route  path="/table/:id">
              <Main number={0}/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
