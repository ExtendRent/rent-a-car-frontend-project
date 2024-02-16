import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchBrands } from '../../store/slices/brandSlice';
import { deleteCarModel, fetchCarModels, getByBrandIdCarModels, updateCarModel } from '../../store/slices/carModelSlice';
import SideBar from '../../components/Sidebar/SideBar';
import '../Brands/Brand.css';
import MyMUIDataTable from "./CarModelTable";

type Props = {}

const CarModels = (props: Props) => {

  const dispatch =useDispatch<AppDispatch>();
  const brandState =useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);

  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCarModel, setSelectedCarModel] = useState<number | null>(null);

  const [carModelName, setCarModelName] = useState('');
 
  useEffect(()=>{
    dispatch(fetchBrands())
  },[dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);

      setSelectedBrand(brandId);
      if (!isNaN(brandId)) {
        dispatch(getByBrandIdCarModels({brandId}));
      }   
  };

  const handleCarModelSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carModelId = parseInt(e.target.value, 10);
    setSelectedCarModel(carModelId);
  };

  const handleUpdateCarModel = () => {
    if (carModelName.trim() !== '' && selectedBrand !== null && selectedCarModel !== null) {
      dispatch(updateCarModel({ brandEntityId: selectedBrand, carModelEntityName: carModelName ,carModelEntityId:selectedCarModel})).then(() => {
        // Güncelleme işlemi tamamlandığında tetiklenir
        handleCancelUpdate();
      });
    }
  };
  
  const handleCancelUpdate = () => {
    setSelectedBrand(null);
    setSelectedCarModel(null); 
    setCarModelName(''); 
    // Markaları tekrar getir
    dispatch(fetchCarModels());
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

export default CarModels