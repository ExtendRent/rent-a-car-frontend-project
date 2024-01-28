import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteFuelType, fetchFuelType, updateFuelType } from '../../store/slices/fuelTypeSlice';

type Props = {}

const FuelTypes = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const fuelTypeState = useSelector((state: any) => state.fuelType)

    const [selectedFuelType, setSelectedFuelType] = useState<number | null>(null);
    const [fuelTypeName, setFuelTypeName] = useState("");

    useEffect(() => {
        dispatch(fetchFuelType())
    }, [dispatch])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFuelType(parseInt(e.target.value, 10))
    };

    const handleFuelTypeUpdateSuccess = () => {
        if (fuelTypeName.trim() !== "" && selectedFuelType !== null) {
            dispatch(updateFuelType({ id: selectedFuelType, name: fuelTypeName }))
            handleCancelUpdate();
        }
    };

    const handleCancelUpdate = () => {
        setSelectedFuelType(null);
        setFuelTypeName("");
        dispatch(fetchFuelType());
    };

    const handleDeleteFuelType = async () => {
        if (selectedFuelType !== null) {
            await dispatch(deleteFuelType({ fuelTypeId: selectedFuelType }))
            handleFuelTypeUpdateSuccess();
        }
    };


    return (
        <div style={{ marginTop: 200 }}>
            <h2>Fuel Type List</h2>

            <select value={selectedFuelType || ''} onChange={handleSelectChange}>
                <option value="" disabled>
                    Select a fuel type
                </option>
                {fuelTypeState.fuelTypes.map((fuelType: any) => (
                    <option key={fuelType.id} value={fuelType.id}>
                        {fuelType.name}
                    </option>
                ))}
            </select>


            {selectedFuelType !== null && (
                <div>
                    <input
                        type="text"
                        value={fuelTypeName}
                        onChange={(e) => setFuelTypeName(e.target.value)}
                    />
                    <button onClick={handleFuelTypeUpdateSuccess}>Update Fuel Type</button>
                    <button onClick={handleCancelUpdate}>Cancel</button>
                </div>
            )}

            <button onClick={handleDeleteFuelType} disabled={selectedFuelType === null}>
                Delete Fuel Type
            </button>
        </div>
    )
};

export default FuelTypes