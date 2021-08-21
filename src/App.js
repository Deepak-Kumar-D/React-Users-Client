import "./App.css";
import { useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Edit from "./components/Edit";
import { FaReact } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";

function App() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="main">
      <header className="header">
        <FaReact className="react-icon" />

        <h1>React Users</h1>

        <CgMenuRight className="menu" onClick={() => setMenu(!menu)} />
      </header>

      <div className="body">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/create-user">
            <CreateUser />
          </Route>

          <Route path="/edit-user/:id">
            <Edit />
          </Route>

          <Route path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </div>

      <div
        className={menu ? "navbar open" : "navbar close"}
        onClick={() => setMenu(!menu)}
      >
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/create-user">Create User</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
