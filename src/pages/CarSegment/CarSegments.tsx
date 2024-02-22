import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchCarSegments, updateCarSegment } from '../../store/slices/carSegmentSlice';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./CarSegmentTable";
import '../Brands/Brand.css';

type Props = {}

const CarSegments = () => {


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