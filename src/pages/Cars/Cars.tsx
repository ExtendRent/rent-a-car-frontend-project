import React, { useEffect, useState } from 'react'
import './Car.css';
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
import { fetchDrivingLicenseTypes } from '../../store/slices/drivingLicenseTypeSlice';
import { CarModel } from '../../models/Responses/CarModel';

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
  const expectedMinDrivingLicenseTypeState = useSelector((state: any) => state.drivingLicenseType)

  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>(undefined);
  const [selectedCarModel, setSelectedCarModel] = useState<number>(0);
  const [selectedCarBodyType, setSelectedCarBodyType] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedVehicleStatus, setSelectedVehicleStatus] = useState<number>(0);
  const [selectedShiftType, setSelectedShiftType] = useState<number>(0);
  const [selectedFuelType, setSelectedFuelType] = useState<number>(0);
  const [selectedExpectedMinDrivingLicenseType, setselectedExpectedMinDrivingLicenseType] = useState<number>(0);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [details, setDetails] = useState('');
  const [rentalPrice, setRentalPrice] = useState<number>(0);
  const [licensePlate, setLicensePlate] = useState('');
  const [kilometer, setKilometer] = useState<number>(0);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [seat, setSeat] = useState<number>(0);
  const [luggage, setLuggage] = useState<number>(0);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedCarProperties, setSelectedCarProperties] = useState<CarModel | null>(null);
  

  useEffect(() => {
    dispatch(fetchCars());
    dispatch(fetchBrands());
    dispatch(fetchCarModels());
    dispatch(fetchCarBodyTypes());
    dispatch(fetchColors());
    dispatch(fetchVehicleStatus());
    dispatch(fetchShiftTypes());
    dispatch(fetchFuelType());
    dispatch(fetchDrivingLicenseTypes());
  }, [dispatch])

  const handleSelectCarChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = parseInt(e.target.value, 10);
    setSelectedCar(carId);
    const selectedCar = carState.cars.find((car: CarModel) => car.id === carId);
    if (selectedCar) {
        setSelectedCarProperties(selectedCar);
        setSelectedColor(selectedCar.colorEntityId);
        setSelectedBrand(selectedCar.carModelEntityBrandEntityId);
        setSelectedCarBodyType(selectedCar.carBodyTypeEntityId);
        setSelectedCarModel(selectedCar.carModelEntityId);
        setSelectedFuelType(selectedCar.fuelTypeEntityId);
        setSelectedShiftType(selectedCar.shiftTypeEntityId);
        setSelectedVehicleStatus(selectedCar.vehicleStatusEntityId);
        setselectedExpectedMinDrivingLicenseType(selectedCar.expectedMinDrivingLicenseTypeId);
        setDetails(selectedCar.details);
        setYear(selectedCar.year);
        setImagePaths(selectedCar.imagesEntityImagePaths);
        setIsAvailable(selectedCar.isAvailable);
        setKilometer(selectedCar.kilometer);
        setLicensePlate(selectedCar.licensePlate);
        setLuggage(selectedCar.luggage);
        setRentalPrice(selectedCar.rentalPrice);
        setSeat(selectedCar.seat);
    }
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

  const handleDrivingLicenseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedExpectedMinDrivingLicenseType(parseInt(e.target.value, 10));
  }

  const handleCarUpdateSuccess = () => {
    if (selectedCar !== null && year !== undefined && details.trim() !== "" && rentalPrice !== undefined && licensePlate.trim() !== ""
      && kilometer !== undefined && seat !== undefined && luggage !== undefined && imagePaths.length !== 0 && selectedExpectedMinDrivingLicenseType !== undefined &&
      selectedBrand !== undefined && selectedCarModel !== undefined && selectedCarBodyType !== undefined
      && selectedColor !== undefined && selectedVehicleStatus !== undefined && selectedShiftType !== undefined
      && selectedFuelType !== undefined && selectedCarProperties !== null) {
      dispatch(updateCar({
        id: selectedCar,
        brandEntityId: selectedBrand,
        carModelEntityId: selectedCarModel,
        carBodyTypeEntityId: selectedCarBodyType,
        colorEntityId: selectedColor,
        vehicleStatusEntityId: selectedVehicleStatus,
        shiftTypeEntityId: selectedShiftType,
        fuelTypeEntityId: selectedFuelType,
        expectedMinDrivingLicenseTypeId: selectedExpectedMinDrivingLicenseType,
        year: year, details: details, rentalPrice: rentalPrice, licensePlate: licensePlate,
        kilometer: kilometer,
        seat: seat, luggage: luggage, imagePaths: imagePaths,
        isAvailable: isAvailable
      }));
      setYear(undefined);
      setDetails('');
      setRentalPrice(0);
      setLicensePlate('');
      setKilometer(0);
      setImagePaths([]);
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
    setSeat(0);
    setLuggage(0);
    setIsAvailable(false);
    setSelectedCarProperties(null);
    dispatch(fetchCars());
  }

 

  return (
    <div id='container-car' className="container d-flex flex-column align-items-center">


      <div className="row col-md-12">
        <div id='select-block' className="col-md-6">

          <div className="mb-2">
            <label htmlFor="selectCar">Araç Seç</label>
            <select className="form-select" id="carSelect" value={selectedCar || ''} onChange={handleSelectCarChange}>
              <option value="" disabled>

              </option>
              {carState.cars.map((car: any) => (
                <option key={car.id} value={car.id} >
                  {car.carModelEntityBrandEntityName} {car.carModelEntityName}
                </option>
              ))}
            </select>
          </div>
          {selectedCar && (
            <div className="mb-2">
              <label htmlFor="selectBrand">Marka Seç</label>
              <select className="form-select" id="brandSelect" value={selectedBrand || ''} onChange={handleBrandChange} >
                <option value="" disabled></option>
                {brandState.brands.map((brand: any) => (
                  <option key={brand.id} value={brand.id} >
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedBrand && (
            <div className="mb-2">
              <label htmlFor="selectCarModel">Model Seç</label>
              <select className="form-select" id="carModelSelect" value={selectedCarModel || ''} onChange={handleCarModelChange}>
                <option value="" disabled></option>
                {carModelState.carModel.map((carModel: any) => (
                  <option key={carModel.id} value={carModel.id} >
                    {carModel.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedCarProperties &&(
          <div className="mb-2">
            <label htmlFor="selectCarBodyType">Kasa Tipi Seç</label>
            <select className="form-select" id="carBodyTypeSelect" value={selectedCarBodyType || ''} onChange={handleCarBodyTypeChange}>
              <option value="" disabled></option>
              {carBodyTypeState.carBodyTypes.map((carBodyType: any) => (
                <option key={carBodyType.id} value={carBodyType.id} selected={carBodyType.id === selectedCarProperties.carBodyTypeEntityId}>
                  {carBodyType.name}
                </option>
              ))}
            </select>
          </div>
          )}
          <div className="mb-2">
            <label htmlFor="selectColor">Renk Seç</label>
            <select className="form-select" id="colorSelect" value={selectedColor || ''} onChange={handleColorChange}>
              <option value="" disabled></option>
              {colorState.colors.map((color: any) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="selectVehicleStatus">Araç Durumu Seç</label>
            <select className="form-select" id="vehicleStatusSelect" value={selectedVehicleStatus || ''} onChange={handleVehicleStatusChange}>
              <option value="" disabled></option>
              {vehicleStatusState.vehicleStatuses.map((vehicleStatus: any) => (
                <option key={vehicleStatus.id} value={vehicleStatus.id}>
                  {vehicleStatus.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="selectShiftType">Vites Tipi Seç</label>
            <select className="form-select" id="shiftTypeSelect" value={selectedShiftType || ''} onChange={handleShiftTypeChange}>
              <option value="" disabled></option>
              {shiftTypeState.shiftTypes.map((shiftType: any) => (
                <option key={shiftType.id} value={shiftType.id}>
                  {shiftType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="selectFuelType">Yakıt Tipi Seç</label>
            <select className="form-select" id="fuelTypeSelect" value={selectedFuelType || ''} onChange={handleFuelTypeChange}>
              <option value="" disabled></option>
              {fuelTypeState.fuelTypes.map((fuelType: any) => (
                <option key={fuelType.id} value={fuelType.id}>
                  {fuelType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="selectDrivingLicenseType">Ehliyet Tipi Seç</label>
            <select className="form-select" id="drivingLicenseTypeSelect" value={selectedExpectedMinDrivingLicenseType || ''} onChange={handleDrivingLicenseTypeChange}>
              <option value="" disabled></option>
              {expectedMinDrivingLicenseTypeState.drivingLicenseTypes.map((drivingLicenseType: any) => (
                <option key={drivingLicenseType.id} value={drivingLicenseType.id}>
                  {drivingLicenseType.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 15 }} className="mb-2">
            <label style={{ marginLeft: 3 }} htmlFor="isAvailable checkBox">isAvailable</label>
            <input style={{ marginLeft: 6 }} type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
          </div>
        </div>
        <div id='input-block' className="col-md-6">
          <div className="mb-2">
            <label htmlFor="inputYear">Yıl Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="inputDetails">Detay Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="inputRentalPrice">Araç Fiyatı Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "
              type="number"
              value={rentalPrice}
              onChange={(e) => setRentalPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="inputLicensePlate">Plaka Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="inputKilometer">Kilometre Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "
              type="number"
              value={kilometer}
              onChange={(e) => setKilometer(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="inputSeat">Koltuk Sayısı Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "
              type="number"
              value={seat}
              onChange={(e) => setSeat(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="inputLuggage">Bagaj Sayısı Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "
              type="number"
              value={luggage}
              onChange={(e) => setLuggage(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="inputImage">Fotoğraf Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "

              type="text"
              value={imagePaths}
              onChange={(e) => setImagePaths(e.target.value.split(','))}
            />
          </div>

        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={handleCarUpdateSuccess}>Update Car</button>
      <button type="button" className="btn btn-primary" onClick={handleCancelUpdate}>Cancel</button>

     
    </div>)
}


export default Cars