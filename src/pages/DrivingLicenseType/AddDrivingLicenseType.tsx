import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addDrivingLicenseType } from '../../store/slices/drivingLicenseTypeSlice';

type Props = {}

    const AddDrivingLicenseType = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [licenseLevel, setLicenseLevel] = useState<number>(0);

    const handleAddDrivingLicenseType = () => {
        if (name.trim() !== "") {
          dispatch(addDrivingLicenseType(
            {
              name: name, description: description, licenseLevel: licenseLevel
            }));
          setName("");
          setDescription("");
          setLicenseLevel(0);
        }
      };
  return (
    <div>
        <div style={{ marginTop: 200 }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="number"
          value={licenseLevel}
          onChange={(e) => setLicenseLevel(parseInt(e.target.value,10))}
        />
      </div> 
      <button onClick={handleAddDrivingLicenseType}>Add Driving License Type </button>
    </div>
  )
}
export default AddDrivingLicenseType