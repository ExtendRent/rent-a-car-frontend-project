import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Button } from "@mui/joy";
import * as Yup from "yup";
import { RootState } from "../../store/configureStore";
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
import { fetchCarSegments } from "../../store/slices/carSegmentSlice";
import FormikCheckbox from "../../components/FormikCheckbox/FormikCheckbox";
import { addCarImages } from "../../store/slices/imageSlice";
import './UpdateCar.css';
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import { Alert } from "@mui/material";
type Props = {};

const AddCar = (props: Props) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | undefined>();
  const [selectedValue, setSelectedValue] = useState({});
  const [imageValue, setImageValue] = useState({});
  const brandState = useAppSelector((state: any) => state.brand);
  const carModelState = useAppSelector((state: any) => state.carModel);
  const carBodyTypeState = useAppSelector((state: any) => state.carBodyType);
  const colorState = useAppSelector((state: any) => state.color);
  const vehicleStatusState = useAppSelector((state: any) => state.vehicleStatus);
  const shiftTypeState = useAppSelector((state: any) => state.shiftType);
  const fuelTypeState = useAppSelector((state: any) => state.fuelType);
  const expectedMinDrivingLicenseTypeState = useAppSelector(
    (state: any) => state.drivingLicenseType
  );
  const segmentState = useAppSelector((state: any) => state.carSegment);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [imageError, setImageError] = useState("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.imageLoad.error
  );
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCarModels());
    dispatch(fetchCarBodyTypes());
    dispatch(fetchColors());
    dispatch(fetchVehicleStatus());
    dispatch(fetchShiftTypes());
    dispatch(fetchFuelType());
    dispatch(fetchDrivingLicenseTypes());
    dispatch(fetchCarSegments());
  }, [dispatch]);
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
    carSegmentEntityId: Yup.number().required("Segment seçiniz"),
  });

  const initialValues = {
    year: 0,
    details: "",
    rentalPrice: 0,
    licensePlate: "",
    kilometer: 0,
    seat: 0,
    luggage: 0,
    brandEntityId: "",
    carModelEntityId: "",
    carBodyTypeEntityId: "",
    colorEntityId: "",
    vehicleStatusEntityId: "",
    shiftTypeEntityId:"",
    fuelTypeEntityId: "",
    expectedMinDrivingLicenseTypeId: "",
    vehicleType: "CAR",
    carSegmentEntityId: "",
    available: true,
  };
  const handleAddCar = async (values: any) => {
    if (typeof file === "undefined") {
      setImageError("Lütfen bir resim seçiniz");
      return;
    }
    
    const formData = new FormData();
    try {
      formData.append("image", file);
      const thunkParams = {
        image: formData,
        licensePlate: values.licensePlate 
    };
      const imageResponse = await dispatch(addCarImages(thunkParams));
      if (imageResponse) {
        const carImageEntityId = imageResponse.payload;
        const updatedValues = { ...values, carImageEntityId };
        const response = await dispatch(addCar(updatedValues));
        setSuccessMessage("İşlem başarıyla tamamlandı");
      }
    } catch (error) {
      console.error("Error : ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
    window.location.href = "/adminPanel/cars";
  }
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    const files = target.files;

    if (files) {
      setFile(target.files[0]);
      setImageError("");
    }
    else {
      // Eğer resim seçilmediyse hata mesajını ayarla
      setImageError("Lütfen bir resim seçiniz");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);

        handleAddCar(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Araba Ekleme</h2>
              <Form>
                <div className="row space">
                  <div id="select-block" className="col-md-6">
                    <div className="mb-2">
                      <FormikSelect
                        label="Marka"
                        name="brandEntityId"
                        options={brandState.brands.map((brands: any) => ({
                          value: brands.id,
                          label: brands.name,
                        }))}
                      />
                    </div>

                    <div className="mb-2">
                      <FormikSelect
                        label="Araç Model "
                        name="carModelEntityId"
                        options={carModelState.carModel.map((carModel: any) => ({
                          value: carModel.id,
                          label: carModel.name,
                        }))}
                      />
                    </div>

                    <div className="mb-2">
                      <FormikSelect
                        label="Kasa Tipi "
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
                        label="Renk "
                        name="colorEntityId"
                        options={colorState.colors.map((color: any) => ({
                          value: color.id,
                          label: color.name,
                        }))}
                      />
                    </div>
                    <div className="mb-2">
                      <FormikSelect
                        label="Araç Durumu "
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
                        label="Vites Tipi "
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
                        label="Yakıt Tipi "
                        name="fuelTypeEntityId"
                        options={fuelTypeState.fuelTypes.map((fuelType: any) => ({
                          value: fuelType.id,
                          label: fuelType.name,
                        }))}
                      />
                    </div>
                    <div className="mb-2">
                      <FormikSelect
                        label="Ehliyet Tipi "
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
                        label="Segment "
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
                      <input type="file" name="image" onChange={handleOnChange} />
                      {imageError && <Alert severity="error">{imageError}</Alert>}
                    </div>
                  </div>
                  <div id="input-block" className="col-md-6">
                    <div className="mb-2">
                      <FormikInput
                        name="year"
                        label="Yıl "
                        placeHolder="Yıl Giriniz."
                        type="number"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikInput
                        name="details"
                        label="Detay "
                        placeHolder="Detay Giriniz."
                        type="text"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikInput
                        name="rentalPrice"
                        label="Araç Fiyatı "
                        placeHolder="Araç Fiyatı Giriniz."
                        type="number"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikInput
                        name="licensePlate"
                        label="Plaka "
                        placeHolder="Plaka Giriniz."
                        type="text"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikInput
                        name="kilometer"
                        label="Kilometre "
                        placeHolder="Kilometre Giriniz."
                        type="number"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikInput
                        name="seat"
                        label="Koltuk Sayısı "
                        placeHolder="Koltuk Sayısı Giriniz."
                        type="number"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikInput
                        name="luggage"
                        label="Bagaj Sayısı "
                        placeHolder="Bagaj Sayısı Giriniz."
                        type="number"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikCheckbox
                        name="available"
                        label="Araba Geçerli Mi "
                      />
                    </div>
                    <div className="mb-2">
                    <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px", marginLeft:"140px" }} type='submit'> Ekle</Button>
                      {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
                      {!errorCustom && successMessage && (
                        <Alert severity="success">{successMessage}</Alert>
                      )}
                    
                    </div>
                  </div>
                </div>
              </Form>
          </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default AddCar;
