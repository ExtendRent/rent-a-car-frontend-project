import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
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

type Props = {}

const AddCarModel = (props: Props) => {

  const dispatch =useDispatch<AppDispatch>();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState =useSelector((state: any) => state.brand);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  useEffect(()=>{
    dispatch(fetchBrands())
  },[dispatch])

  const handleAddCarModel =async (values: any) => {
    try {

      const response = await dispatch(addCarModel(values));
      if ("error" in response) {
        if (response.error.message && response.error.message.includes("1007")) {
        setErrorMessage("İşlem başarısız.");
    
        } else {
        setErrorMessage("İşlem başarısız.");
   
        }
    } else {
        setSuccessMessage("Araba Modeli Eklendi.");
        setTimeout(() => {
        setSuccessMessage("");
        window.location.reload();
        }, 2000); 
    }
    }
    catch (error) {
      console.error("Redux action dispatch hatası:", error);
      setErrorMessage("İşlem başarısız. Lütfen tekrar deneyin.");
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
        {errorMessage && <Alert severity="error" style={{width:"430px"}}>{errorMessage}</Alert>}
          {successMessage && (
          <Alert severity="success">{successMessage}</Alert>
          )}
        </div>
        </div>
      </SideBar>
    </Formik>
  )
}

export default AddCarModel