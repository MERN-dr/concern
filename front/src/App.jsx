import Canvas from "./page/canvas/Canvas";
import Home from "./page/home/Home";
import Activate from "./page/activate/Activate";
import Activated from "./page/activated/Activated";
import "./app.scss";
import { useSelector } from "react-redux";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import User from "./page/user/User";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ?  <Home/> : <Redirect to="login" />}
        </Route>
        <Route path="/login" >
          {user ? <Redirect to="/" /> : <Canvas/>}
        </Route>
        <Route path="/activate/:id" >
          {user ? <Redirect to="/" /> : <Activate/>}
        </Route>
        <Route path="/activated" >
          {user ? <Redirect to="/" /> : <Activated/>}
        </Route>
        {/* {user &&(
          
        )} */}
        <Route path="/user" >
        {user ?  <User/> : <Redirect to="login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
