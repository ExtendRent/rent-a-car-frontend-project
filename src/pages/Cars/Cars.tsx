import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchCars } from '../../store/slices/carSlice';
import { fetchCarModels, getByBrandIdCarModels } from '../../store/slices/carModelSlice';
import { fetchBrands } from '../../store/slices/brandSlice';

type Props = {}

const Cars = (props: Props) => {

  const dispatch =useDispatch<AppDispatch>();
  const brandState =useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const colorState = useSelector((state:any) => state.color);
  const vehicleStatusState =useSelector((state:any) => state.vehicleStatus);
  const shiftTypeState = useSelector((state:any) => state.shiftType);
  const fuelTypeState =useSelector((state:any) => state.fuelType);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCarModel, setSelectedCarModel] = useState<number | null>(null);
  const [selectedCarBodyType, setSelectedCarBodyType] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedVehicleStatus, setSelectedVehicleStatus] = useState<number | null>(null);
  const [selectedShiftType, setSelectedShiftType] = useState<number | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [details, setDetails] = useState('');
  const [rentalPrice, setRentalPrice] = useState<number | null>(null);
  const [licensePlate, setLicensePlate] = useState('');
  const [kilometer, setKilometer] = useState<number | null>(null);
  const [imagePaths, setImagePaths] = useState([]);
  const [expectedDrivingLicenseTypes, setExpectedDrivingLicenseTypes] = useState([]);
  const [seat, setSeat] = useState<number | null>(null);
  const [luggage, setLuggage] = useState<number | null>(null);


    useEffect(()=>{
    dispatch(fetchCars());
    dispatch(fetchBrands());
    dispatch(fetchCarModels());
  },[dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);

      setSelectedBrand(brandId);
      console.log(brandId);
      

      if (!isNaN(brandId)) {
        dispatch(getByBrandIdCarModels({brandId}));
      }
      
  };

  const handleCarModelSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carModelId = parseInt(e.target.value, 10);
    setSelectedCarModel(carModelId);
    
  };
  
  return (
    <div style={{ marginTop: 200 }}>
      <h2>Car List</h2>
      <label>Select a Brand:</label>
      <select value={selectedBrand || ''} onChange={handleSelectChange}>
        <option value="" disabled>
          Select a brand
        </option>
        {brandState.brands.map((brand: any) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      {selectedBrand && (
        <div>
          <label>Select a Car Model:</label>
          <select value={selectedCarModel || ''} onChange={handleCarModelSelectChange}>
            <option value="" disabled>
              Select a car model
            </option>
            {carModelState.carModel.map((carModel: any) => (
              <option key={carModel.id} value={carModel.id}>
                {carModel.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default Cars