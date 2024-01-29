import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './components/register/SignUp';
import Home from './components/homepage/Home';
import Login from './components/loginpage/Login';
import Admin from './components/admindash/Admin';
import Adminlog from './components/adminlogin/Adminlog';


function App() {
  const user = localStorage.getItem("token");
  return (
    <>
    {/* <Home/>
    <Admin/> */}
    <Routes>
      {user && <Route path='/' exact element={<Home/>}/>}
      <Route path='/signup' exact element={<SignUp/>}/>
      <Route path='login' exact element={<Login/>}/>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path='/dashboard' exact element={<Admin/>}/>
      <Route path='/adminlogin' exact element={<Adminlog/>}/>
    </Routes>
    </>
  );
}

export default App;
