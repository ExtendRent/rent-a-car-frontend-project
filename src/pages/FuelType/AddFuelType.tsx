import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/configureStore'
import { addFuelType } from '../../store/slices/fuelTypeSlice'

type Props = {}

const AddFuelType = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const [fuelTypeName, setFuelTypeName] = useState("");

    const handleAddFuelType = () => {
        if (fuelTypeName.trim() !== "" ) {
            dispatch(addFuelType({ name: fuelTypeName}))
            setFuelTypeName("");
        }
    }

    return (
        <div style={{ marginTop: 200 }}>
            <input type="text" value={fuelTypeName} onChange={(e) => setFuelTypeName(e.target.value)} />
            <button onClick={handleAddFuelType}>Add Fuel Type</button>
        </div>
    )
}

export default AddFuelType