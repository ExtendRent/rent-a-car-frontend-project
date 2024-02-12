import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteDrivingLicenseType, fetchDrivingLicenseTypes } from '../../store/slices/drivingLicenseTypeSlice';

type Props = {}

const DeleteDrivingLicenseType = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const drivingLicenseTypeState = useSelector((state: any) => state.drivingLicenseType);
    const [selectedDrivingLicenseType, setSelectedDrivingLicenseType] = useState<number | null>(null);
  
    useEffect(() => {
      dispatch(fetchDrivingLicenseTypes());
    })
  
    const handleDrivingLicenseTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const drivingLicenseTypeId = parseInt(e.target.value, 10);
      setSelectedDrivingLicenseType(drivingLicenseTypeId);
    }
  
    const handleDeleteDrivingLicenseType = async () => {
      if (selectedDrivingLicenseType !== null) {
        await dispatch(deleteDrivingLicenseType({ drivingLicenseTypeId: selectedDrivingLicenseType }));
        setSelectedDrivingLicenseType(null);
      }
    }
  
    return (
      <div id='container-drivingLicenseType' className="container d-flex flex-column align-items-center">
  
        <div id='select-block' className="col-md-6">
  
          <div className="mb-2">
            <label htmlFor="selectDrivingLicenseType">Ehliyet Tipi Seç</label>
            <select className="form-select" id="drivingLicenseTypeSelect" value={selectedDrivingLicenseType || ''} onChange={handleDrivingLicenseTypeChange}>
              <option value="" disabled>
  
              </option>
              {drivingLicenseTypeState.drivingLicenseTypes.map((drivingLicenseType: any) => (
                <option key={drivingLicenseType.id} value={drivingLicenseType.id} >
                  {drivingLicenseType.name}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleDeleteDrivingLicenseType} disabled={selectedDrivingLicenseType === null}>
            Delete Driving License Type
          </button>
        </div>
  
      </div>
    )
}

export default DeleteDrivingLicenseType