import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Single from "./pages/Single";
import New from "./pages/New";
import { userInputs, showInputs, catInputs, photoInputs } from "./formInputs";
import "./themes.css";
import React, { useContext } from "react";
import { DarkModeContext } from "./components/darkModeContext";
import DBadmin from "./pages/DBadmin/DBadmin";
import UsersList from "./pages/users/UsersList";
import ShowsList from "./pages/shows/ShowsList";
import UserSingle from "./pages/users/UserSingle";
import ShowSingle from "./pages/shows/ShowSingle";
import Cats from "./pages/cats/Cats";
import Cat from "./pages/cats/Cat";
import Photos from "./pages/photos/Photos";
import NewUser from "./pages/users/NewUser";
import ProtectedRoutes from "./ProtectedRoutes";
import EditUser from "./pages/users/EditUser";
import NewShow from "./pages/shows/NewShow";
import EditShow from "./pages/shows/EditShow";
import EditCat from "./pages/cats/EditCat";
import NewCat from "./pages/cats/NewCat";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "App dark" : "App"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route element={<ProtectedRoutes />}>
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<UserSingle />} />
                <Route
                  path="new"
                  element={<NewUser inputs={userInputs} title="Add New User" />}
                />
                <Route
                  path="edit/:id"
                  element={<EditUser inputs={userInputs} title="Edit User" />}
                />
              </Route>
              <Route path="shows">
                <Route index element={<ShowsList />} />
                <Route path=":id" element={<ShowSingle />} />
                <Route
                  path="new"
                  element={<NewShow inputs={showInputs} title="Create Show" />}
                />
                <Route
                  path="edit/:id"
                  element={<EditShow inputs={showInputs} title="Edit Show" />}
                />
              </Route>
              <Route path="cats">
                <Route index element={<Cats />} />
                <Route path=":id" element={<Cat />} />
                <Route
                  path="new"
                  element={<NewCat inputs={catInputs} title="Add New Cat" />}
                />
                <Route
                  path="edit/:id"
                  element={<EditCat inputs={catInputs} title="Edit Cat" />}
                />
              </Route>
              <Route path="photos" exact element={<Photos />} />
              <Route path="dbadmin">
                <Route index element={<DBadmin />} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={photoInputs} title="Add New Cat" />}
                />
              </Route>
            </Route>
            <Route path="login" exact element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
