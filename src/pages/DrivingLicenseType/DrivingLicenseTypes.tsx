import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteDrivingLicenseType, fetchDrivingLicenseTypes, updateDrivingLicenseType } from '../../store/slices/drivingLicenseTypeSlice';

type Props = {}

const DrivingLicenseTypes = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const drivingLicenseTypeState = useSelector((state: any) => state.drivingLicenseType);
  const [selectedDrivingLicenseType, setSelectedDrivingLicenseType] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [licenseLevel, setLicenseLevel] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchDrivingLicenseTypes())
  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDrivingLicenseType(parseInt(e.target.value, 10));
  };

  const handleDrivingLicenseTypeUpdateSuccess = () => {
    if (name.trim() !== "" && selectedDrivingLicenseType !== null) {
      dispatch(updateDrivingLicenseType({
        id: selectedDrivingLicenseType,
        name: name,
        description: description,
        licenseLevel: licenseLevel,
      }));
      handleCancelUpdate();
    }

  };

  const handleCancelUpdate = () => {
    setSelectedDrivingLicenseType(null);
    setName("");
    setDescription("");
    setLicenseLevel(0);
    dispatch(fetchDrivingLicenseTypes());
  };

  const handleDeleteDrivingLicenseType = async () => {
    if (selectedDrivingLicenseType !== null) {
      await dispatch(deleteDrivingLicenseType({ drivingLicenseTypeId: selectedDrivingLicenseType }));
      handleDrivingLicenseTypeUpdateSuccess();
    }
  };

  return (
    <div>
      <div style={{ marginTop: 200 }}>
        <h2>Driving License Type List</h2>

        <select value={selectedDrivingLicenseType || ''} onChange={handleSelectChange}>
          <option value="" disabled>
            Select a employee
          </option>
          {drivingLicenseTypeState.drivingLicenseTypes.map((drivingLicenseType: any) => (
            <option key={drivingLicenseType.id} value={drivingLicenseType.id}>
              {drivingLicenseType.name}
            </option>
          ))}
        </select>
      </div>

      {selectedDrivingLicenseType !== null && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>)}

      {selectedDrivingLicenseType !== null && (
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>)}
      {selectedDrivingLicenseType !== null && (
        <div>
          <input
            type="number"
            value={licenseLevel}
            onChange={(e) => setLicenseLevel(parseInt(e.target.value))}
          />
        </div>)}
      <button onClick={handleDrivingLicenseTypeUpdateSuccess}>Update Driving License Type</button>
      <button onClick={handleCancelUpdate}>Cancel</button>

    </div>
  )
}

export default DrivingLicenseTypes