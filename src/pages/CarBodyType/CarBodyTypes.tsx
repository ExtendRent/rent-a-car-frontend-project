import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteCarBodyType, fetchCarBodyTypes, updateCarBodyType } from '../../store/slices/carBodyTypeSlice';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./CarBodyTypeTable";
import '../Brands/Brand.css';

type Props = {}

const CarBodyTypes = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);

  const [selectedCarBodyType, setSelectedCarBodyType] = useState<number | null>(null);

  const [carBodyTypeName, setCarBodyTypeName] = useState('');

  useEffect(() => {
    dispatch(fetchCarBodyTypes())
  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarBodyType(parseInt(e.target.value, 10));
  };

  const handleCarBodyTypeUpdateSuccess = () => {
    if (carBodyTypeName.trim() !== "" && selectedCarBodyType !== null) {
      dispatch(updateCarBodyType({ id: selectedCarBodyType, name: carBodyTypeName }))
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setSelectedCarBodyType(null);
    setCarBodyTypeName("");
    dispatch(fetchCarBodyTypes());
  };

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

export default CarBodyTypes