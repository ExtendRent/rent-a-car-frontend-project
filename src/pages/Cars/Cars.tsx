import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteCar, fetchCars, getByCarId, updateCar } from '../../store/slices/carSlice';
import { fetchCarModels, getByBrandIdCarModels } from '../../store/slices/carModelSlice';
import { fetchBrands } from '../../store/slices/brandSlice';
import { fetchCarBodyTypes } from '../../store/slices/carBodyTypeSlice';
import { fetchColors } from '../../store/slices/colorSlice';
import { fetchVehicleStatus } from '../../store/slices/vehicleStatusSlice';
import { fetchShiftTypes } from '../../store/slices/shiftTypeSlice';
import { fetchFuelType } from '../../store/slices/fuelTypeSlice';

type Props = {}

const Cars = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const colorState = useSelector((state: any) => state.color);
  const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);
  const shiftTypeState = useSelector((state: any) => state.shiftType);
  const fuelTypeState = useSelector((state: any) => state.fuelType);
  const carState = useSelector((state: any) => state.car);

  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [selectedCarModel, setSelectedCarModel] = useState<number>(0);
  const [selectedCarBodyType, setSelectedCarBodyType] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedVehicleStatus, setSelectedVehicleStatus] = useState<number>(0);
  const [selectedShiftType, setSelectedShiftType] = useState<number>(0);
  const [selectedFuelType, setSelectedFuelType] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [details, setDetails] = useState('');
  const [rentalPrice, setRentalPrice] = useState<number>(0);
  const [licensePlate, setLicensePlate] = useState('');
  const [kilometer, setKilometer] = useState<number>(0);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [expectedDrivingLicenseTypes, setExpectedDrivingLicenseTypes] = useState<string[]>([]);
  const [seat, setSeat] = useState<number>(0);
  const [luggage, setLuggage] = useState<number>(0);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);


  useEffect(() => {
    dispatch(fetchCars());
    dispatch(fetchBrands());
    dispatch(fetchCarModels());
    dispatch(fetchCarBodyTypes());
    dispatch(fetchColors());
    dispatch(fetchVehicleStatus());
    dispatch(fetchShiftTypes());
    dispatch(fetchFuelType());
  }, [dispatch])

  const handleCarChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = parseInt(e.target.value, 10);
    setSelectedCar(carId);
    /* const carResponse = await dispatch(getByCarId({carId}));
    if(carResponse.payload){
      console.log(carResponse.payload);
    } */
  }

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const brandId = parseInt(e.target.value, 10);
    setSelectedBrand(brandId);

    if (!isNaN(brandId)) {
      dispatch(getByBrandIdCarModels({ brandId }));
    }

  };

  const handleCarModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carModelId = parseInt(e.target.value, 10);
    setSelectedCarModel(carModelId);
  };

  const handleCarBodyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarBodyType(parseInt(e.target.value, 10));
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(parseInt(e.target.value, 10));
  }

  const handleVehicleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVehicleStatus(parseInt(e.target.value, 10));
  }

  const handleShiftTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShiftType(parseInt(e.target.value, 10));
  }

  const handleFuelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFuelType(parseInt(e.target.value, 10));
  }

  const handleCarUpdateSuccess = () => {
    if (selectedCar !== null && year !== undefined && details.trim() !== "" && rentalPrice !== undefined && licensePlate.trim() !== ""
      && kilometer !== undefined && seat !== undefined && luggage !== undefined && imagePaths.length !== 0 && expectedDrivingLicenseTypes.length !== 0 &&
      selectedBrand !== undefined && selectedCarModel !== undefined && selectedCarBodyType !== undefined
      && selectedColor !== undefined && selectedVehicleStatus !== undefined && selectedShiftType !== undefined
      && selectedFuelType !== undefined) {
      dispatch(updateCar({
        id: selectedCar,
        brandEntityId: selectedBrand,
        carModelEntityId: selectedCarModel,
        carBodyTypeEntityId: selectedCarBodyType,
        colorEntityId: selectedColor,
        vehicleStatusEntityId: selectedVehicleStatus,
        shiftTypeEntityId: selectedShiftType,
        fuelTypeEntityId: selectedFuelType,
        year: year, details: details, rentalPrice: rentalPrice, licensePlate: licensePlate,
        kilometer: kilometer,
        seat: seat, luggage: luggage, imagePaths: imagePaths, expectedDrivingLicenseTypes: expectedDrivingLicenseTypes,
        isAvailable: isAvailable
      }));
      setYear(0);
      setDetails('');
      setRentalPrice(0);
      setLicensePlate('');
      setKilometer(0);
      setImagePaths([]);
      setExpectedDrivingLicenseTypes([]);
      setSeat(0);
      setLuggage(0);
      setIsAvailable(false);
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setSelectedCar(0);
    setSelectedBrand(0);
    setSelectedCarModel(0);
    setSelectedCarBodyType(0);
    setSelectedColor(0);
    setSelectedFuelType(0);
    setSelectedShiftType(0);
    setSelectedVehicleStatus(0);
    setYear(0);
    setDetails('');
    setRentalPrice(0);
    setLicensePlate('');
    setKilometer(0);
    setImagePaths([]);
    setExpectedDrivingLicenseTypes([]);
    setSeat(0);
    setLuggage(0);
    setIsAvailable(false);
    dispatch(fetchCars());
  }

  const handleDeleteCar = async() => {
    if (selectedCar !== null) {
      await dispatch(deleteCar({ carId: selectedCar }));
      // Silme işlemi tamamlandığında tetiklenir
      handleCancelUpdate();
    }
  }

  return (
    <div style={{ marginTop: 200 }}>
      <h2>Car List</h2>
      <select value={selectedCar || ''} onChange={handleCarChange}>
        <option value="" disabled>
          Select a car
        </option>
        {carState.cars.map((car: any) => (
          <option key={car.id} value={car.id}>
            {car.carModelEntityBrandEntityName} {car.carModelEntityName}
          </option>
        ))}
      </select>

      {selectedCar && (
        <div>
          <select value={selectedBrand || ''} onChange={handleBrandChange} >
            <option value="" disabled>
              Select a brand
            </option>
            {brandState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id} >
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedBrand && (
        <div>
          <select value={selectedCarModel || ''} onChange={handleCarModelChange}>
            <option value="" disabled>
              Select a car model
            </option>
            {carModelState.carModel.map((carModel: any) => (
              <option key={carModel.id} value={carModel.id} >
                {carModel.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <select value={selectedCarBodyType || ''} onChange={handleCarBodyTypeChange}>
          <option value="" disabled>
            Select a car body type
          </option>
          {carBodyTypeState.carBodyTypes.map((carBodyType: any) => (
            <option key={carBodyType.id} value={carBodyType.id}>
              {carBodyType.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={selectedColor || ''} onChange={handleColorChange}>
          <option value="" disabled>
            Select a color
          </option>
          {colorState.colors.map((color: any) => (
            <option key={color.id} value={color.id} >
              {color.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={selectedVehicleStatus || ''} onChange={handleVehicleStatusChange}>
          <option value="" disabled>
            Select a vehicle Status
          </option>
          {vehicleStatusState.vehicleStatuses.map((vehicleStatus: any) => (
            <option key={vehicleStatus.id} value={vehicleStatus.id}>
              {vehicleStatus.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={selectedShiftType || ''} onChange={handleShiftTypeChange}>
          <option value="" disabled>
            Select a shift type
          </option>
          {shiftTypeState.shiftTypes.map((shiftType: any) => (
            <option key={shiftType.id} value={shiftType.id}>
              {shiftType.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={selectedFuelType || ''} onChange={handleFuelTypeChange}>
          <option value="" disabled>
            Select a fuel type
          </option>
          {fuelTypeState.fuelTypes.map((fuelType: any) => (
            <option key={fuelType.id} value={fuelType.id}>
              {fuelType.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input placeholder='year'
          type="text"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <input placeholder='details'
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div>
        <input placeholder='rental price'
          type="text"
          value={rentalPrice}
          onChange={(e) => setRentalPrice(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <input placeholder='license plate'
          type="text"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
      </div>
      <div>
        <input placeholder='kilometer'
          type="text"
          value={kilometer}
          onChange={(e) => setKilometer(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <input placeholder='seat'
          type="text"
          value={seat}
          onChange={(e) => setSeat(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <input placeholder='luggage'
          type="text"
          value={luggage}
          onChange={(e) => setLuggage(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <input
          placeholder='Enter image paths separated by commas'
          type="text"
          value={imagePaths}
          onChange={(e) => setImagePaths(e.target.value.split(','))}
        />
      </div>
      <div>
        <input
          placeholder='expected driving license types'
          type="text"
          value={expectedDrivingLicenseTypes}
          onChange={(e) => setExpectedDrivingLicenseTypes(e.target.value.split(','))}
        />
      </div>
      <div>
        <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
      </div>

      <button onClick={handleCarUpdateSuccess}>Update Car</button>
      <button onClick={handleCancelUpdate}>Cancel</button>

      <button onClick={handleDeleteCar} disabled={selectedCar === null}>
          Delete Car
        </button>
    </div>)
}


export default Cars