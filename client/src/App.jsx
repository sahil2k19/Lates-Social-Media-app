import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/"  element = {<Home/>} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/profile"  element={<Profile/> }/>
          <Route path="/register"  element={<Register/> }/>
        </Routes>
      </Router>



      {/* <Home/>;
      <Login/>;
      <Profile/>;
      <Register/>; */}
    </>
  ) 
}

export default App;
