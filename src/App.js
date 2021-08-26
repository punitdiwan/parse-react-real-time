import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './routes/Home';
import Auth from './routes/Auth';

export default function App() {


  return (
    <Router>
      <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}