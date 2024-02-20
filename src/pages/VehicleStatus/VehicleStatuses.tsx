import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useEffect, useState } from 'react';
import { fetchVehicleStatus, updateVehicleStatus } from '../../store/slices/vehicleStatusSlice';
import '../Brands/Brand.css';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./VehicleStatusTable";

type Props = {}

const VehicleStatuses = (props: Props) => {

   

    return (
        <div >
          <SideBar>
            <div className="full-screen">
              <MyMUIDataTable />
            </div>
          </SideBar>
           
        </div>
      );
}

export default VehicleStatuses