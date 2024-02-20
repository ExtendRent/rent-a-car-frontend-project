import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useParams } from 'react-router-dom';
import carService from '../../services/carService';
import colorService from '../../services/colorService';
import brandService from '../../services/brandService';
import carModelService from '../../services/carModelService';
import carBodyTypeService from '../../services/carBodyTypeService';
import { CarModel } from '../../models/Responses/Car/CarModel';
import { ColorModel } from '../../models/Responses/Color/ColorModel';
import { BrandModel } from '../../models/Responses/Brand/BrandModel';
import { CarBodyTypeModel } from '../../models/Responses/CarBodyType/CarBodyTypeModel';
import { CarModelModel } from '../../models/Responses/CarModel/CarModelModel';
import { getByCarId } from '../../store/slices/carSlice';
import { fetchBrands } from '../../store/slices/brandSlice';
import { fetchCarModels } from '../../store/slices/carModelSlice';
import { fetchCarBodyTypes } from '../../store/slices/carBodyTypeSlice';
import { fetchColors } from '../../store/slices/colorSlice';
import { fetchVehicleStatus } from '../../store/slices/vehicleStatusSlice';
import { fetchShiftTypes } from '../../store/slices/shiftTypeSlice';
import { fetchFuelType } from '../../store/slices/fuelTypeSlice';
import { fetchDrivingLicenseTypes } from '../../store/slices/drivingLicenseTypeSlice';
import { fetchCarSegments } from '../../store/slices/carSegmentSlice';
import { GetAllCarsModel } from '../../models/Responses/Car/GetAllCarsModel';
type Props = {}

const UpdateCar = (props: Props) => {
  const { id } = useParams();
  const carId = parseInt(id || '');
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [car, setCar] = useState<CarModel>();
  const [colors, setColors] = useState<ColorModel[]>([]);
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [resultBrand, setResultBrand] = useState<BrandModel[]>([]);
  const [carBodyType, setCarBodyType] = useState<CarBodyTypeModel[]>([]);
  const [models, setModels] = useState<CarModelModel[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    }
    else
      fetchData();

  }, [id, isSubmited]);

  const fetchData = async () => {
    try {
      const [carResponse, colorsResponse, brandsResponse, modelsResponse] = await Promise.all([
        id ? carService.getByCarId(parseInt(id)) : null,
        colorService.getAll(),
        brandService.getAll(),
        carModelService.getAll()
      ]);
      setCar(carResponse?.data);
      
      
      setColors(colorsResponse?.data.response);
      setBrands(brandsResponse?.data.response || []);
      setModels(modelsResponse?.data.response || []);
     
       
        
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

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
    brandEntityId: Yup.number().required("Marka seçiniz"),
    carModelEntityId: Yup.number().required("Araç modeli seçiniz"),
    carBodyTypeEntityId: Yup.number().required("Kasa tipi seçiniz"),
    colorEntityId: Yup.number().required("Renk seçiniz"),
    vehicleStatusEntityId: Yup.number().required("Araç durumu seçiniz"),
    shiftTypeEntityId: Yup.number().required("Vites tipi seçiniz"),
    fuelTypeEntityId: Yup.number().required("Yakıt tipi seçiniz"),
    expectedMinDrivingLicenseTypeId: Yup.number().required(
      "Ehliyet tipi seçiniz"
    ),
    carImageEntityId: Yup.string().required("Fotoğraf giriniz"),
    carSegmentEntityId: Yup.number().required("Segment seçiniz"),
  });

  const initialValues = {
    year: car?.year,
    details: car?.details,
    rentalPrice: car?.rentalPrice,
    licensePlate: car?.licensePlate,
    kilometer: car?.kilometer,
    seat: car?.seat,
    luggage: car?.luggage,
    
  };
  
  console.log(car?.year);
  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
       
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-car">
          <h2 className="h2-car">Araba Ekleme</h2>
          <Form>
            <div className="row">
           
              <div id="input-block" className="col-md-6">
                <div className="mb-2">
                  <FormikInput
                    name="year"
                    label="Yıl Giriniz"
                    placeHolder="Yıl Giriniz."
                    type="number"
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="details"
                    label="Detay Giriniz"
                    placeHolder="Detay Giriniz."
                    type="text"
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="rentalPrice"
                    label="Araç Fiyatı Giriniz"
                    placeHolder="Araç Fiyatı Giriniz."
                    type="number"
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="licensePlate"
                    label="Plaka Giriniz"
                    placeHolder="Plaka Giriniz."
                    type="text"
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="kilometer"
                    label="Kilometre Giriniz"
                    placeHolder="Kilometre Giriniz."
                    type="number"
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="seat"
                    label="Koltuk Sayısı Giriniz"
                    placeHolder="Koltuk Sayısı Giriniz."
                    type="number"
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="luggage"
                    label="Bagaj Sayısı Giriniz"
                    placeHolder="Bagaj Sayısı Giriniz."
                    type="number"
                  />
                </div>
                
              </div>
            </div>
            <Button type="submit" className="btn btn-primary">
              Araba Ekle
            </Button>
          </Form>
        </div>
      </SideBar>
    </Formik></>
  )
}

export default UpdateCar