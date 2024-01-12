import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomNavbar from "./components/Navbar/CustomNavbar";
import Homepage from './pages/Homepage/Homepage';
import Cars from './pages/Cars/Cars';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
      <CustomNavbar />
      <Routes>
				<Route path="/" element={<Homepage />}></Route>
				<Route path="/cars" element={<Cars />}></Route>
        <Route path="/login" element={<Login />}></Route>
			</Routes>
    </>
  );
}

export default App;
