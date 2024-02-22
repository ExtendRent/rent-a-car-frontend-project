import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useParams } from 'react-router-dom';
import { getByCarId, updateCar } from '../../store/slices/carSlice';
import { fetchBrands } from '../../store/slices/brandSlice';
import { fetchCarModels } from '../../store/slices/carModelSlice';
import { fetchCarBodyTypes } from '../../store/slices/carBodyTypeSlice';
import { fetchColors } from '../../store/slices/colorSlice';
import { fetchVehicleStatus } from '../../store/slices/vehicleStatusSlice';
import { fetchShiftTypes } from '../../store/slices/shiftTypeSlice';
import { fetchFuelType } from '../../store/slices/fuelTypeSlice';
import { fetchDrivingLicenseTypes } from '../../store/slices/drivingLicenseTypeSlice';
import { fetchCarSegments } from '../../store/slices/carSegmentSlice';
import { CarModel } from '../../models/Responses/Car/CarModel';
import FormikSelect from '../../components/FormikSelect/FormikSelect';
import { addCarImages } from '../../store/slices/imageSlice';
type Props = {}

const UpdateCar = (props: Props) => {
  const { id } = useParams();
  const carId = parseInt(id || '');
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [file, setFile] = useState<File | undefined>();
  const [car, setCar] = useState<CarModel>();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState = useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const colorState = useSelector((state: any) => state.color);
  const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);
  const shiftTypeState = useSelector((state: any) => state.shiftType);
  const fuelTypeState = useSelector((state: any) => state.fuelType);
  const segmentState = useSelector((state: any) => state.carSegment);
  const expectedMinDrivingLicenseTypeState = useSelector(
    (state: any) => state.drivingLicenseType
  );
  

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
     
      const newAmountResponse = await dispatch(getByCarId({carId}))
      setCar((newAmountResponse as any)?.payload?.response)
    
      dispatch(fetchBrands());
      dispatch(fetchCarModels());
      dispatch(fetchCarBodyTypes());
      dispatch(fetchColors());
      dispatch(fetchVehicleStatus());
      dispatch(fetchShiftTypes());
      dispatch(fetchFuelType());
      dispatch(fetchDrivingLicenseTypes());
      dispatch(fetchCarSegments());
      
       
        
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    /* year: Yup.number()
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
    carSegmentEntityId: Yup.number().required("Segment seçiniz"), */
  });

  const initialValues = {
    year: car?.year,
    details: car?.details,
    rentalPrice: car?.rentalPrice,
    licensePlate: car?.licensePlate,
    kilometer: car?.kilometer,
    seat: car?.seat,
    luggage: car?.luggage,
    colorEntityId: car?.colorEntityId,
    brandEntityId: car?.carModelEntityBrandEntityId,
    carModelEntityId:car?.carModelEntityId,
    carBodyTypeEntityId: car?.carBodyTypeEntityId,
    vehicleStatusEntityId: car?.vehicleStatusEntityId,
    shiftTypeEntityId: car?.shiftTypeEntityId,
    fuelTypeEntityId: car?.fuelTypeEntityId,
    carSegmentEntityId: car?.carSegmentEntityId,
    expectedMinDrivingLicenseTypeId: car?.expectedMinDrivingLicenseTypeId,
    vehicleType: "CAR"
  
  };
  const handleUpdateCar = async (values: any) => {
    if(typeof file === 'undefined') return;
    const formData =new FormData();
    formData.append('files',file)
    formData.append("upload_present" ,"636629149633282");
    
    const { licensePlate, carImageEntityId } = values;
    const imageResponse = await dispatch(addCarImages({
      image: formData,
      licensePlate: values.licensePlate
    }));
    console.log(imageResponse);
   
    
    //dispatch(updateCar(values));
  };
 
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };
  
    // Access the selected files
    const files = target.files;
  
    // Do something with the selected files
    if (files) {
      // Process the files here
     setFile(target.files[0])
     console.log(target.files[0]);
     
    }
  };
  return (
   
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleUpdateCar(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-car">
          <h2 className="h2-car">Araba Ekleme</h2>
          <Form>
            <div className="row">
            <div id="select-block" className="col-md-6">
                <div className="mb-2">
                  <FormikSelect
                    label="Marka Seç"
                    name="brandEntityId"
                    options={brandState.brands.map((brands: any) => ({
                      value: brands.id,
                      label: brands.name,
                    }))}
                  />
                </div>

                <div className="mb-2">
                  <FormikSelect
                    label="Araç Model Seç"
                    name="carModelEntityId"
                    options={carModelState.carModel.map((carModel: any) => ({
                      value: carModel.id,
                      label: carModel.name,
                    }))}
                  />
                </div>

                <div className="mb-2">
                  <FormikSelect
                    label="Kasa Tipi Seç"
                    name="carBodyTypeEntityId"
                    options={carBodyTypeState.carBodyTypes.map(
                      (carBodyType: any) => ({
                        value: carBodyType.id,
                        label: carBodyType.name,
                      })
                    )}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Renk Seç"
                    name="colorEntityId"
                    options={colorState.colors.map((color: any) => ({
                      value: color.id,
                      label: color.name,
                    }))}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Araç Durumu Seç"
                    name="vehicleStatusEntityId"
                    options={vehicleStatusState.vehicleStatuses.map(
                      (vehicleStatus: any) => ({
                        value: vehicleStatus.id,
                        label: vehicleStatus.name,
                      })
                    )}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Vites Tipi Seç"
                    name="shiftTypeEntityId"
                    options={shiftTypeState.shiftTypes.map(
                      (shiftType: any) => ({
                        value: shiftType.id,
                        label: shiftType.name,
                      })
                    )}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Yakıt Tipi Seç"
                    name="fuelTypeEntityId"
                    options={fuelTypeState.fuelTypes.map((fuelType: any) => ({
                      value: fuelType.id,
                      label: fuelType.name,
                    }))}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Ehliyet Tipi Seç"
                    name="expectedMinDrivingLicenseTypeId"
                    options={expectedMinDrivingLicenseTypeState.drivingLicenseTypes.map(
                      (drivingLicenseType: any) => ({
                        value: drivingLicenseType.id,
                        label: drivingLicenseType.name,
                      })
                    )}
                  />
                </div>
                <div className="mb-2">
                  <FormikSelect
                    label="Segment Seç"
                    name="carSegmentEntityId"
                    options={segmentState.carSegments.map(
                      (carSegment: any) => ({
                        value: carSegment.id,
                        label: carSegment.name,
                      })
                    )}
                  />
                </div>
                <div className="mb-2">
                  <input type='file' name='image' onChange={handleOnChange}/>
                </div>
              </div>
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
    </Formik>
  )
}

export default UpdateCar