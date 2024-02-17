import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchCarSegments, updateCarSegment } from '../../store/slices/carSegmentSlice';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./CarSegmentTable";
import '../Brands/Brand.css';

type Props = {}

const CarSegments = () => {

const dispatch = useDispatch<AppDispatch>();
const carSegmentState = useSelector((state: any) => state.carSegment);

const [selectedCarSegment, setSelectedCarSegment] = useState<number | null>(null);
const [name, setName] = useState("");

useEffect(() => {
  dispatch(fetchCarSegments())
}, [dispatch])

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(typeof e.target.value);
  
  setSelectedCarSegment(parseInt(e.target.value, 10));
};

const handleColorUpdateSuccess = () => {
  if(name.trim() !== "" && selectedCarSegment !== null){
    dispatch(updateCarSegment({id:selectedCarSegment, name: name}));
    handleCancelUpdate();
  }
  
};

const handleCancelUpdate = () => {
  setSelectedCarSegment(null);
  setName("");
  dispatch(fetchCarSegments());
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

export default CarSegments