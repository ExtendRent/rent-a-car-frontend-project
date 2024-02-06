
import React, { useEffect, useState } from 'react';
import './Car.css';
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
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>(undefined);
  const [selectedCarBodyType, setSelectedCarBodyType] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedVehicleStatus, setSelectedVehicleStatus] = useState<number>(0);
  const [selectedShiftType, setSelectedShiftType] = useState<number>(0);
  const [selectedFuelType, setSelectedFuelType] = useState<number>(0);
  const [year, setYear] = useState<number | undefined>(undefined);
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
      setYear(undefined);
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
    <div id='container-car' className="container d-flex flex-column align-items-center">

      <div className="row col-md-12">
        <div id='select-block' className="col-md-6">
          <div className="mb-2">
            <label htmlFor="selectBrand">Marka Seç</label>
            <select className="form-select" id="brandSelect" value={selectedBrand || ''} onChange={handleBrandChange}>
              <option value="" disabled></option>
              {brandState.brands.map((brand: any) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>


          {selectedBrand && (
            <div className="mb-2">
              <label htmlFor="selectCarModel">Araç Model Seç</label>
              <select className="form-select" id="carModelSelect" value={selectedCarModel || ''} onChange={handleCarModelChange}>
                <option value="" disabled></option>
                {carModelState.carModel.map((carModel: any) => (
                  <option key={carModel.id} value={carModel.id}>
                    {carModel.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-2">
            <label htmlFor="selectCarBodyType">Kasa Tipi Seç</label>
            <select className="form-select" id="carBodyTypeSelect" value={selectedCarBodyType || ''} onChange={handleCarBodyTypeChange}>
              <option value="" disabled></option>
              {carBodyTypeState.carBodyTypes.map((carBodyType: any) => (
                <option key={carBodyType.id} value={carBodyType.id}>
                  {carBodyType.name}
                </option>
              ))}
            </select>
          </div>
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
            <label htmlFor="selectVehicleSatus">Araç Durumu Seç</label>
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
            <select className="form-select" id="FuelTypeSelect" value={selectedFuelType || ''} onChange={handleFuelTypeChange}>
              <option value="" disabled></option>
              {fuelTypeState.fuelTypes.map((fuelType: any) => (
                <option key={fuelType.id} value={fuelType.id}>
                  {fuelType.name}
                </option>
              ))}
            </select>
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
            <label htmlFor="inputDrivingLicenseType">Ehliyet Tipi Giriniz</label>
            <input style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              paddingRight: '10px'
            }} className="form-select "
              type="text"
              value={expectedDrivingLicenseTypes}
              onChange={(e) => setExpectedDrivingLicenseTypes(e.target.value.split(','))}
            />

          </div>
        </div>
      </div>
      <button id='addCarBtn' type="button" className="btn btn-primary" onClick={handleAddCar}>Add Car</button>
    </div>
  )
}

export default AddCar