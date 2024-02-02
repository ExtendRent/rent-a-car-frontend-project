
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchBrands } from '../../store/slices/brandSlice';
import { fetchCarModels, getByBrandIdCarModels } from '../../store/slices/carModelSlice';
import { addCar } from '../../store/slices/carSlice';
import { fetchCarBodyTypes } from '../../store/slices/carBodyTypeSlice';
import { fetchColors } from '../../store/slices/colorSlice';
import { fetchShiftTypes } from '../../store/slices/shiftTypeSlice';
import { fetchFuelType } from '../../store/slices/fuelTypeSlice';
import { fetchVehicleStatus } from '../../store/slices/vehicleStatusSlice';


type Props = {}
const AddCar = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const colorState = useSelector((state: any) => state.color);
  const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);
  const shiftTypeState = useSelector((state: any) => state.shiftType);
  const fuelTypeState = useSelector((state: any) => state.fuelType);


  const [selectedCarModel, setSelectedCarModel] = useState<number>();
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
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

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCarModels());
    dispatch(fetchCarBodyTypes());
    dispatch(fetchColors());
    dispatch(fetchVehicleStatus());
    dispatch(fetchShiftTypes());
    dispatch(fetchFuelType());
  }, [dispatch])

  const handleAddCar = () => {
    if (year !== undefined && details.trim() !== "" && rentalPrice !== undefined && licensePlate.trim() !== ""
      && kilometer !== undefined && seat !== undefined && luggage !== undefined && imagePaths.length !== 0 && expectedDrivingLicenseTypes.length !== 0 &&
      selectedBrand !== undefined && selectedCarModel !== undefined && selectedCarBodyType !== undefined
      && selectedColor !== undefined && selectedVehicleStatus !== undefined && selectedShiftType !== undefined
      && selectedFuelType !== undefined) {
      dispatch(addCar({
        brandEntityId: selectedBrand,
        carModelEntityId: selectedCarModel,
        carBodyTypeEntityId: selectedCarBodyType,
        colorEntityId: selectedColor,
        vehicleStatusEntityId: selectedVehicleStatus,
        shiftTypeEntityId: selectedShiftType,
        fuelTypeEntityId: selectedFuelType,
        year: year, details: details, rentalPrice: rentalPrice, licensePlate: licensePlate,
        kilometer: kilometer,
        seat: seat, luggage: luggage, imagePaths: imagePaths, expectedDrivingLicenseTypes: expectedDrivingLicenseTypes
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
    }
  };
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);

    setSelectedBrand(brandId);
    console.log(brandId);


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


  return (
    <div style={{ marginTop: 200 }}>
      <div>
        <select value={selectedBrand || ''} onChange={handleBrandChange}>
          <option value="" disabled>
            Select a brand
          </option>
          {brandState.brands.map((brand: any) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

      </div>

      {selectedBrand && (
        <div>
          <select value={selectedCarModel || ''} onChange={handleCarModelChange}>
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
            <option key={color.id} value={color.id}>
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
      <button onClick={handleAddCar}>Add Car</button>
    </div>
  )
}

export default AddCar