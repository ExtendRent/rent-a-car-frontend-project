import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useEffect, useState } from 'react';
import { fetchVehicleStatus, updateVehicleStatus } from '../../store/slices/vehicleStatusSlice';

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
        <div style={{ marginTop: 200 }}>
            <h2>Vehicle Status List</h2>

            <select value={selectedVehicleStatus || ''} onChange={handleSelectChange}>
                <option value="" disabled>
                    Select a Vehicle Status
                </option>
                {vehicleStatusState.vehicleStatuses.map((vehicleStatus: any) => (
                    <option key={vehicleStatus.id} value={vehicleStatus.id}>
                        {vehicleStatus.name}
                    </option>
                ))}
            </select>

            {selectedVehicleStatus !== null && (
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleVehicleStatusUpdateSuccess}>Update ShiftType</button>
                    <button onClick={handleCancelUpdate}>Cancel</button>
                </div>
            )}
        </div>
    )
}

export default VehicleStatuses