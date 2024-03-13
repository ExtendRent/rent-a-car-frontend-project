import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  RootState } from "../../store/configureStore";
import { fetchBrands } from "../../store/slices/brandSlice";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Button } from "@mui/joy";
import {
  fetchCarModels,
  getByIdCarModels,
  updateCarModel,
} from "../../store/slices/carModelSlice";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { GetByIdCarModelModel } from "../../models/Responses/CarModel/GetByIdCarModelModel";
import "./CarModel.css";
import { useAppSelector } from "../../store/useAppSelector";
import './CarModel.css'
import { Alert } from "@mui/material";
import { useAppDispatch } from "../../store/useAppDispatch";
type Props = {};

const UpdateCarModel = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const carModelId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [carModel, setCarModel] = useState<GetByIdCarModelModel>();
  const [file, setFile] = useState<File | undefined>();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState = useAppSelector((state: any) => state.brand);
  const carModelState = useAppSelector((state: any) => state.carModel);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carModel.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdCarModels({ id: carModelId }));
      setCarModel((newResponse as any)?.payload.response);

      dispatch(fetchCarModels());
      dispatch(fetchBrands());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    brandEntityId: Yup.number().required("Marka seçiniz"),
    carModelEntityId: Yup.number().required("Model seçiniz"),
    carModelEntityName: Yup.string()
      .min(2, "Model en az 2 karakter olmalıdır")
      .required("Model Giriniz"),
  });
  const initialValues = {
    brandEntityId: carModel?.brandEntityId,
    carModelEntityId: carModel?.id,
    carModelEntityName: carModel?.name,
  };

  const handleUpdateCarModel = async (values: any) => {

    try {
      const response = await dispatch(updateCarModel(values));
      // İşlem başarılı olduğunda
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.reload();
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
    
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleUpdateCarModel(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Model Güncelleme</h2>
            <Form>
              <div className="row-add-carModel">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
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
                    <FormikInput
                      name="carModelEntityName"
                      label="Model Giriniz"
                      placeHolder="Model Giriniz."
                      type="text"
                    />
                  </div>
                  <Button
                    style={{
                      marginTop: "30px",
                      backgroundColor: "rgb(140,24,24)",
                      color: "white",
                      width: "200px",
                      borderRadius: "10px",
                      marginLeft: "140px",
                    }}
                    type="submit"
                  >
                    Güncelle
                  </Button>
                </div>
              </div>
            </Form>
            {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
            {!errorCustom && successMessage && (
                <Alert severity="success">{successMessage}</Alert>
            )}
          </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default UpdateCarModel;
