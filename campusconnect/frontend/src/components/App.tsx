import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage/LandingPage";
import ClubApplication from "./Club/ClubApplication";
import ClubPage from "./Club/ClubPage";
import LoadingIndicator from "./Utils/LoadingIndicator";

function App() {
  // Used to keep track of whether the user is currently logged in or not
  const [isAuth, setAuth] = useState(false);

  const navigate = useNavigate();
  // Every time the page is re-rendered, this is called
  useEffect(() => {
    let checkAuth = async () => {
      let response = await fetch("/api/authentication/isauth", {
        method: "GET",
      });
      if (response.ok) {
        setAuth(true);
      } else {
        setAuth(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, []);

  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<LandingPage isAuth={isAuth}/>} /> */}
          <Route path="/home" element={isAuth === null ? <LoadingIndicator /> : <LandingPage isAuth={isAuth} />} />

          <Route path="/club/application" element={<ClubApplication />} />
          <Route path="/club/:name/:id" element={isAuth === null ? <LoadingIndicator /> : <ClubPage isAuth={isAuth}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
