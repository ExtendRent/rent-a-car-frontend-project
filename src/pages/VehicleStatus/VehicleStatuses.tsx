import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useEffect, useState } from 'react';
import { fetchVehicleStatus, updateVehicleStatus } from '../../store/slices/vehicleStatusSlice';
import '../Brands/Brand.css';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./VehicleStatusTable";

type Props = {}

const VehicleStatuses = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);

    const [selectedVehicleStatus, setselectedVehicleStatus] = useState<number | null>(null);
    const [name, setName] = useState("");

    useEffect(() => {
      dispatch(fetchVehicleStatus())
    }, [dispatch])
    
    const handleSelectChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setselectedVehicleStatus(parseInt(e.target.value, 10));
    };

    const handleVehicleStatusUpdateSuccess = () => {
        if(name.trim() !== "" && selectedVehicleStatus !== null){
            dispatch(updateVehicleStatus({ id: selectedVehicleStatus, name: name}));
            handleCancelUpdate();
        }
    }

    const handleCancelUpdate = () => {
        setselectedVehicleStatus(null);
        setName("");
        dispatch(fetchVehicleStatus());
    }

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