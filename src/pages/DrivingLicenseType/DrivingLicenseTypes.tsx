import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteDrivingLicenseType, fetchDrivingLicenseTypes, updateDrivingLicenseType } from '../../store/slices/drivingLicenseTypeSlice';
import SideBar from '../../components/Sidebar/SideBar';
import '../Brands/Brand.css';
import MyMUIDataTable from "./DrivingLicenseTypeTable";

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
    <div >
      <SideBar>
        <div className="full-screen">
          <MyMUIDataTable />
        </div>
      </SideBar>
       
    </div>
  );
}

export default DrivingLicenseTypes