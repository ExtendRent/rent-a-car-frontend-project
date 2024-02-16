import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteShiftType, fetchShiftTypes, updateShiftType } from '../../store/slices/shiftTypeSlice';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./ShiftTypeTable";
import '../Brands/Brand.css';

export default function ShiftTypes() {

    const dispatch = useDispatch<AppDispatch>();
    const shiftTypeState = useSelector((state: any) => state.shiftType);

    const [selectedShiftType, setSelectedShiftType] = useState<number | null>(null);
    const [shiftTypeName, setShiftTypeName] = useState("");

    useEffect(() => {
        dispatch(fetchShiftTypes())
      }, [dispatch]) 
    
      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        setSelectedShiftType(parseInt(e.target.value, 10));
      };

      const handleShiftTypeUpdateSuccess = () => {
        if(shiftTypeName.trim() !== "" && selectedShiftType !== null){
          dispatch(updateShiftType({id:selectedShiftType, name: shiftTypeName}));
          handleCancelUpdate();
        }
        
      };

      const handleCancelUpdate = () => {
        setSelectedShiftType(null);
        setShiftTypeName("");
        dispatch(fetchShiftTypes());
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
