import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Button } from "@mui/joy";
import * as Yup from "yup";
import { AppDispatch } from "../../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../../store/slices/carSlice";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { fetchBrands } from "../../store/slices/brandSlice";
import { fetchCarModels } from "../../store/slices/carModelSlice";
import { fetchCarBodyTypes } from "../../store/slices/carBodyTypeSlice";
import { fetchColors } from "../../store/slices/colorSlice";
import { fetchVehicleStatus } from "../../store/slices/vehicleStatusSlice";
import { fetchShiftTypes } from "../../store/slices/shiftTypeSlice";
import { fetchFuelType } from "../../store/slices/fuelTypeSlice";
import { fetchDrivingLicenseTypes } from "../../store/slices/drivingLicenseTypeSlice";

type Props = {};

const AddCar = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState = useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const colorState = useSelector((state: any) => state.color);
  const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);
  const shiftTypeState = useSelector((state: any) => state.shiftType);
  const fuelTypeState = useSelector((state: any) => state.fuelType);
  const expectedMinDrivingLicenseTypeState = useSelector((state: any) => state.drivingLicenseType);
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
  const validationSchema = Yup.object().shape({
    year: Yup.number()
      .min(2005, "Yıl en az 2005 olmalıdır")
      .max(2024, "Yıl en fazla 2024 olmalıdır")
      .required("Yıl giriniz"),
    details: Yup.string()
      .max(500, "Açıklama en fazla 500 karakter olmalıdır")
      .required("Detay giriniz"),
    rentalPrice: Yup.number()
      .min(110, "Kiralama ücreti en az 110 olmalıdır")
      .required("Araç fiyatı giriniz"),
    licensePlate: Yup.string()
      .matches(
        /^(\d{2}[ ]?[A-Za-z]{1,3}[ ]?\d{2}|\d{2}[ ]?[A-Za-z]{2}[ ]?\d{3})$/,
        "Geçerli bir plaka giriniz"
      )
      .required("Plaka giriniz"),
    kilometer: Yup.number()
      .min(1, "Kilometre en az 1 olmalıdır")
      .required("Kilometre giriniz"),
    seat: Yup.number()
      .min(1, "Koltuk sayısı en az 1 olmalıdır")
      .max(15, "Koltuk sayısı en fazla 15 olmalıdır")
      .required("Koltuk sayısı giriniz"),
    luggage: Yup.number()
      .min(1, "Bagaj sayısı en az 1 olmalıdır")
      .max(15, "Bagaj sayısı en fazla 15 olmalıdır")
      .required("Bagaj sayısı giriniz"),
    brandEntityId: Yup.number().required('Marka seçiniz'),
    carModelEntityId: Yup.number().required('Araç modeli seçiniz'),
    carBodyTypeEntityId: Yup.number().required('Kasa tipi seçiniz'),
    colorEntityId: Yup.number().required('Renk seçiniz'),
    vehicleStatusEntityId: Yup.number().required('Araç durumu seçiniz'),
    shiftTypeEntityId: Yup.number().required('Vites tipi seçiniz'),
    fuelTypeEntityId: Yup.number().required('Yakıt tipi seçiniz'),
    expectedMinDrivingLicenseTypeId: Yup.number().required('Ehliyet tipi seçiniz'),
    imagePaths:Yup.string().required("Fotoğraf giriniz"),

  });

  const initialValues = {
    year: 0,
    details: "",
    rentalPrice: 0,
    licensePlate: "",
    kilometer: 0,
    seat: 0,
    luggage: 0,
    brandEntityId: '',
    carModelEntityId: '',
    carBodyTypeEntityId: '',
    colorEntityId: '',
    vehicleStatusEntityId: '',
    shiftTypeEntityId: '',
    fuelTypeEntityId: '',
    expectedMinDrivingLicenseTypeId: '',
    imagePaths:''
  };
  const handleAddCar = (values: any) => {
    dispatch(addCar(values));
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        
        setSelectedValue(values);
        handleAddCar(values);
        console.log(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-car">
          <h2 className="h2-car">Araba Ekleme</h2>
          <Form>
            <div className="row">
            <div id='select-block' className="col-md-6">
                <div className="mb-2">
                  <FormikSelect
                      label="Marka Seç"
                      name="brandEntityId"
                      options={brandState.brands.map((brands: any) => ({ value: brands.id, label: brands.name }))}
                    />
             
                </div>
                
                  <div className="mb-2">
                    <FormikSelect
                      label="Araç Model Seç"
                      name="carModelEntityId"
                      options={carModelState.carModel.map((carModel: any) => ({ value: carModel.id, label: carModel.name }))}
                     
                    />
                  </div>
                
                <div className="mb-2">
                  <FormikSelect
                    label="Kasa Tipi Seç"
                    name="carBodyTypeEntityId"
                    options={carBodyTypeState.carBodyTypes.map((carBodyType: any) => ({ value: carBodyType.id, label: carBodyType.name }))}
                    
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Renk Seç"
                    name="colorEntityId"
                    options={colorState.colors.map((color: any) => ({ value: color.id, label: color.name }))}
                    
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Araç Durumu Seç"
                    name="vehicleStatusEntityId"
                    options={vehicleStatusState.vehicleStatuses.map((vehicleStatus: any) => ({ value: vehicleStatus.id, label: vehicleStatus.name }))}
                    
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Vites Tipi Seç"
                    name="shiftTypeEntityId"
                    options={shiftTypeState.shiftTypes.map((shiftType: any) => ({ value: shiftType.id, label: shiftType.name }))}
                   
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Yakıt Tipi Seç"
                    name="fuelTypeEntityId"
                    options={fuelTypeState.fuelTypes.map((fuelType: any) => ({ value: fuelType.id, label: fuelType.name }))}
                   
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Ehliyet Tipi Seç"
                    name="expectedMinDrivingLicenseTypeId"
                    options={expectedMinDrivingLicenseTypeState.drivingLicenseTypes.map((drivingLicenseType: any) => ({ value: drivingLicenseType.id, label: drivingLicenseType.name }))}
                   
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="imagePaths"
                    label="Fotoğraf Giriniz"
                    placeHolder="Fotoğraf Giriniz."
                    type="text"
                  />
                </div>
              </div>
              <div id="input-block" className="col-md-6">
                <FormikInput
                  name="year"
                  label="Yıl Giriniz"
                  placeHolder="Yıl Giriniz."
                  type="number"
                />

                <FormikInput
                  name="details"
                  label="Detay Giriniz"
                  placeHolder="Detay Giriniz."
                  type="text"
                />
                <FormikInput
                  name="rentalPrice"
                  label="Araç Fiyatı Giriniz"
                  placeHolder="Araç Fiyatı Giriniz."
                  type="number"
                />
                <FormikInput
                  name="licensePlate"
                  label="Plaka Giriniz"
                  placeHolder="Plaka Giriniz."
                  type="text"
                />
                <FormikInput
                  name="kilometer"
                  label="Kilometre Giriniz"
                  placeHolder="Kilometre Giriniz."
                  type="number"
                />
                <FormikInput
                  name="seat"
                  label="Koltuk Sayısı Giriniz"
                  placeHolder="Koltuk Sayısı Giriniz."
                  type="number"
                />
                <FormikInput
                  name="luggage"
                  label="Bagaj Sayısı Giriniz"
                  placeHolder="Bagaj Sayısı Giriniz."
                  type="number"
                />
              </div>
            </div>
            <Button type="submit" className="btn btn-primary">
              Araba Ekle
            </Button>
          </Form>
        </div>
      </SideBar>
    </Formik>
  );
};

export default AddCar;