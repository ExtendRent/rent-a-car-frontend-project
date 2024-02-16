import React, { useEffect, useState } from 'react'
import '../AdminPanel/AdminPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchColors, updateColor } from '../../store/slices/colorSlice';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./ColorTable";
import '../Brands/Brand.css';



type Props = {}

const Colors = () => {

  const dispatch = useDispatch<AppDispatch>();
  const colorState = useSelector((state: any) => state.color);

  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    dispatch(fetchColors())
  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(typeof e.target.value);
    
    setSelectedColor(parseInt(e.target.value, 10));
  };

  const handleColorUpdateSuccess = () => {
    if(colorName.trim() !== "" && selectedColor !== null){
      dispatch(updateColor({id:selectedColor, name: colorName}));
      handleCancelUpdate();
    }
    
  };

  const handleCancelUpdate = () => {
    setSelectedColor(null);
    setColorName("");
    dispatch(fetchColors());
  };

  return (
    <div >
    <SideBar>
      <div className="full-screen">
        <MyMUIDataTable />
      </div>
    </SideBar>
     
  </div>


  )
}

export default Colors