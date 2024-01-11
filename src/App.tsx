import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomNavbar from "./components/Navbar/CustomNavbar";
import Homepage from './pages/Homepage/Homepage';
import Cars from './pages/Cars/Cars';

function App() {
  return (
    <>
      <CustomNavbar />
      <Routes>
				<Route path="/" element={<Homepage />}></Route>
				<Route path="/cars" element={<Cars />}></Route>
			</Routes>
    </>
  );
}

export default App;
