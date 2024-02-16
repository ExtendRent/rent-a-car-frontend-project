import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchFuelType, updateFuelType } from '../../store/slices/fuelTypeSlice';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./FuelTypeTable";
import '../Brands/Brand.css'

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

    return (
        <div >
          <SideBar>
            <div className="full-screen">
              <MyMUIDataTable />
            </div>
          </SideBar>
           
        </div>
      );
};

export default FuelTypes