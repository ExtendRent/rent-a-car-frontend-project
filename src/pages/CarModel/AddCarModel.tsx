import React, { useEffect, useState } from 'react'
import { RootState } from '../../store/configureStore';
import { addCarModel } from '../../store/slices/carModelSlice';
import { fetchBrands } from '../../store/slices/brandSlice';
import { Button } from "@mui/joy";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikSelect from '../../components/FormikSelect/FormikSelect';
import './CarModel.css'
import { Alert } from "@mui/material";
import { useAppSelector } from '../../store/useAppSelector';
import { useAppDispatch } from '../../store/useAppDispatch';

type Props = {}

const AddCarModel = (props: Props) => {

  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState =useAppSelector((state: any) => state.brand);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carModel.error);
  
  useEffect(()=>{
    dispatch(fetchBrands())
  },[dispatch])

  const handleAddCarModel =async (values: any) => {
  
      try {
        const response = await dispatch(addCarModel(values));
        // İşlem başarılı olduğunda
        setSuccessMessage("İşlem başarıyla tamamlandı");
        window.location.reload();
      } catch (error) {
        console.error("Error updating shift type: ", error);
        // Hata durumunda
        setErrorMessage("İşlem sırasında bir hata oluştu");
      }
       
  };
  const validationSchema = Yup.object().shape({
    carModelEntityName: Yup.string()
      .min(2, "Model en az 2 karakter olmalıdır")
      .required("Model Giriniz"),
    brandEntityId: Yup.number().required('Marka seçiniz'),
  });
  const initialValues = {
    brandEntityId: "",
    carModelEntityName:"",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleAddCarModel(values);
      }}
      enableReinitialize={true}
    >
    <SideBar>
        <div className="container-card">
        <div className="form">
          <h2 className="h2-card">Model Ekleme</h2>
          <Form>
            <div className="row-add-carModel">
              <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                    <FormikSelect
                      label="Marka "
                      name="brandEntityId"
                      options={brandState.brands.map((brands: any) => ({ value: brands.id, label: brands.name }))}
                    />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="carModelEntityName"
                    label="Model "
                    placeHolder="Model Giriniz."
                    type="text"
                  />
                </div>
                <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px", marginLeft:"140px" }} type='submit'>Ekle</Button>
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
  )
}

export default AddCarModel