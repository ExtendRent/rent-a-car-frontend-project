import React, { useEffect, useState } from 'react';
import './Car.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchBrands } from '../../store/slices/brandSlice';
import { fetchCarModels, getByBrandIdCarModels } from '../../store/slices/carModelSlice';
import { fetchCarBodyTypes } from '../../store/slices/carBodyTypeSlice';
import { fetchColors } from '../../store/slices/colorSlice';
import { fetchShiftTypes } from '../../store/slices/shiftTypeSlice';
import { fetchFuelType } from '../../store/slices/fuelTypeSlice';
import { fetchVehicleStatus } from '../../store/slices/vehicleStatusSlice';
import { fetchDrivingLicenseTypes } from '../../store/slices/drivingLicenseTypeSlice';
import SideBar from '../../components/Sidebar/SideBar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../../components/FormikInput/FormikInput';
import FormikSelect from '../../components/FormikSelect/FormikSelect'; // FormikSelect bileşenini ekledik
import { addCar } from '../../store/slices/carSlice';

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
  const expectedMinDrivingLicenseTypeState = useSelector((state: any) => state.drivingLicenseType);

  const [selectedCarModel, setSelectedCarModel] = useState<number | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>(undefined);
  const [selectedCarBodyType, setSelectedCarBodyType] = useState<number | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<number | undefined>(undefined);
  const [selectedVehicleStatus, setSelectedVehicleStatus] = useState<number | undefined>(undefined);
  const [selectedShiftType, setSelectedShiftType] = useState<number | undefined>(undefined);
  const [selectedFuelType, setSelectedFuelType] = useState<number | undefined>(undefined);
  const [selectedExpectedMinDrivingLicenseType, setselectedExpectedMinDrivingLicenseType] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [details, setDetails] = useState<string>('');
  const [rentalPrice, setRentalPrice] = useState<number | undefined>(undefined);
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [kilometer, setKilometer] = useState<number | undefined>(undefined);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [seat, setSeat] = useState<number | undefined>(undefined);
  const [luggage, setLuggage] = useState<number | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCarModels());
    dispatch(fetchCarBodyTypes());
    dispatch(fetchColors());
    dispatch(fetchVehicleStatus());
    dispatch(fetchShiftTypes());
    dispatch(fetchFuelType());
    dispatch(fetchDrivingLicenseTypes());
  }, [dispatch])

  const handleAddCar = () => {
    if (year !== undefined && details.trim() !== "" && rentalPrice !== undefined && rentalPrice !== 0 && licensePlate.trim() !== ""
      && kilometer !== undefined && kilometer !== 0 && seat !== undefined && seat !== 0 && luggage !== undefined && luggage !== 0
      && imagePaths.length !== 0 && selectedExpectedMinDrivingLicenseType !== undefined && selectedExpectedMinDrivingLicenseType !== 0
      && selectedBrand !== undefined && selectedCarModel !== undefined && selectedCarBodyType !== undefined && selectedCarBodyType !== 0
      && selectedColor !== undefined && selectedColor !== 0 && selectedVehicleStatus !== undefined && selectedVehicleStatus !== 0
      && selectedShiftType !== undefined && selectedShiftType !== 0 && selectedFuelType !== undefined && selectedFuelType !== 0) {
      dispatch(addCar({
        brandEntityId: selectedBrand!,
        carModelEntityId: selectedCarModel!,
        carBodyTypeEntityId: selectedCarBodyType,
        colorEntityId: selectedColor,
        vehicleStatusEntityId: selectedVehicleStatus,
        shiftTypeEntityId: selectedShiftType,
        fuelTypeEntityId: selectedFuelType,
        expectedMinDrivingLicenseTypeId: selectedExpectedMinDrivingLicenseType,
        year: year!,
        details,
        rentalPrice,
        licensePlate,
        kilometer,
        seat,
        luggage,
        imagePaths
      }));
      setYear(undefined);
      setDetails('');
      setRentalPrice(undefined);
      setLicensePlate('');
      setKilometer(undefined);
      setImagePaths([]);
      setSeat(undefined);
      setLuggage(undefined);
    }
  };

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

  const validationSchema = Yup.object().shape({
    year: Yup.number().required('Yıl giriniz'),
    details: Yup.string().required('Detay giriniz'),
    rentalPrice: Yup.number().required('Araç fiyatı giriniz'),
    licensePlate: Yup.string().required('Plaka giriniz'),
    kilometer: Yup.number().required('Kilometre giriniz'),
    seat: Yup.number().required('Koltuk sayısı giriniz'),
    luggage: Yup.number().required('Bagaj sayısı giriniz'),
    brands: Yup.number().required('Marka seçiniz'),
    carModel: Yup.number().required('Araç modeli seçiniz'),
    selectedCarBodyType: Yup.number().required('Kasa tipi seçiniz'),
    selectedColor: Yup.number().required('Renk seçiniz'),
    selectedVehicleStatus: Yup.number().required('Araç durumu seçiniz'),
    selectedShiftType: Yup.number().required('Vites tipi seçiniz'),
    selectedFuelType: Yup.number().required('Yakıt tipi seçiniz'),
    selectedExpectedMinDrivingLicenseType: Yup.number().required('Ehliyet tipi seçiniz'),
  });

  const initialValues = {
    year: '',
    details: '',
    rentalPrice: '',
    licensePlate: '',
    kilometer: '',
    seat: '',
    luggage: '',
    brands: '',
    carModel: '',
    selectedCarBodyType: '',
    selectedColor: '',
    selectedVehicleStatus: '',
    selectedShiftType: '',
    selectedFuelType: '',
    selectedExpectedMinDrivingLicenseType: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        handleAddCar();
        resetForm(); // Formu sıfırla
      }}
    >
      <SideBar>
        <div className="container-car">
        <h2 className='h2-car'>Araba Ekleme</h2>
          <Form>
            <div className="row">
              <div id='select-block' className="col-md-6">
                <div className="mb-2">
                  <FormikSelect
                      label="Marka Seç"
                      name="brands"
                      options={brandState.brands.map((brands: any) => ({ value: brands.id, label: brands.name }))}
                      value={selectedBrand !== undefined ? selectedBrand : ""}
                      onChange={handleBrandChange}
                    />
                </div>
                {selectedBrand && (
                  <div className="mb-2">
                    <FormikSelect
                      label="Araç Model Seç"
                      name="carModel"
                      options={carModelState.carModel.map((carModel: any) => ({ value: carModel.id, label: carModel.name }))}
                      value={selectedCarModel !== undefined ? selectedCarModel : ""}
                      onChange={handleCarModelChange}
                    />
                  </div>
                )}
                <div className="mb-2">
                  <FormikSelect
                    label="Kasa Tipi Seç"
                    name="selectedCarBodyType"
                    options={carBodyTypeState.carBodyTypes.map((carBodyType: any) => ({ value: carBodyType.id, label: carBodyType.name }))}
                    value={selectedCarBodyType !== undefined ? selectedCarBodyType : ""}
                    onChange={handleCarBodyTypeChange}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Renk Seç"
                    name="selectedColor"
                    options={colorState.colors.map((color: any) => ({ value: color.id, label: color.name }))}
                    value={selectedColor}
                    onChange={handleColorChange}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Araç Durumu Seç"
                    name="selectedVehicleStatus"
                    options={vehicleStatusState.vehicleStatuses.map((vehicleStatus: any) => ({ value: vehicleStatus.id, label: vehicleStatus.name }))}
                    value={selectedVehicleStatus}
                    onChange={handleVehicleStatusChange}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Vites Tipi Seç"
                    name="selectedShiftType"
                    options={shiftTypeState.shiftTypes.map((shiftType: any) => ({ value: shiftType.id, label: shiftType.name }))}
                    value={selectedShiftType}
                    onChange={handleShiftTypeChange}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Yakıt Tipi Seç"
                    name="selectedFuelType"
                    options={fuelTypeState.fuelTypes.map((fuelType: any) => ({ value: fuelType.id, label: fuelType.name }))}
                    value={selectedFuelType}
                    onChange={handleFuelTypeChange}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Ehliyet Tipi Seç"
                    name="selectedExpectedMinDrivingLicenseType"
                    options={expectedMinDrivingLicenseTypeState.drivingLicenseTypes.map((drivingLicenseType: any) => ({ value: drivingLicenseType.id, label: drivingLicenseType.name }))}
                    value={selectedExpectedMinDrivingLicenseType}
                    onChange={handleDrivingLicenseTypeChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="inputImage">Fotoğraf Giriniz</label>
                  <input
                    className="form-control"
                    type="text"
                    value={imagePaths.join(',')}
                    onChange={(e) => setImagePaths(e.target.value.split(','))}
                  />
                </div>
              </div>
              <div id='input-block' className="col-md-6">
                <FormikInput
                  name="year"
                  label="Yıl Giriniz"
                  placeHolder="Yıl Giriniz."
                  value={year !== undefined ? String(year) : ''}
                  type='number'
                />
                <FormikInput
                  name="details"
                  label="Detay Giriniz"
                  placeHolder="Detay Giriniz."
                  value={details}
                  type='text'
                />
                <FormikInput
                  name="rentalPrice"
                  label="Araç Fiyatı Giriniz"
                  placeHolder="Araç Fiyatı Giriniz."
                  value={rentalPrice !== undefined ? String(rentalPrice) : ''}
                  type='number'
                />
                <FormikInput
                  name="licensePlate"
                  label="Plaka Giriniz"
                  placeHolder="Plaka Giriniz."
                  value={licensePlate}
                  type='text'
                />
                <FormikInput
                  name="kilometer"
                  label="Kilometre Giriniz"
                  placeHolder="Kilometre Giriniz."
                  value={kilometer !== undefined ? String(kilometer) : ''}
                  type='number'
                />
                <FormikInput
                  name="seat"
                  label="Koltuk Sayısı Giriniz"
                  placeHolder="Koltuk Sayısı Giriniz."
                  value={seat !== undefined ? String(seat) : ''}
                  type='number'
                />
                <FormikInput
                  name="luggage"
                  label="Bagaj Sayısı Giriniz"
                  placeHolder="Bagaj Sayısı Giriniz."
                  value={luggage !== undefined ? String(luggage) : ''}
                  type='number'
                />
              </div>
            </div>
            <button id='addCarBtn' type="submit" className="btn btn-primary">Araba Ekle</button>
          </Form>
        </div>
      </SideBar>
    </Formik>
  )
}

export default AddCar;
