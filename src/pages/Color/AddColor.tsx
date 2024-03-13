import React, { useState } from 'react'
import {  RootState } from '../../store/configureStore'
import { addColor } from '../../store/slices/colorSlice'
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useAppDispatch } from '../../store/useAppDispatch';
import { useAppSelector } from '../../store/useAppSelector';
import { Alert } from '@mui/material';

type Props = {}

const AddColor = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.color.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");


  const handleAddColor= (values: any) => {
    try{
      dispatch(addColor(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating color: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
     
  };
  const validationSchema = Yup.object().shape({
    colorEntityName: Yup.string()
      .min(2, "Renk en az 2 karakter olmalıdır")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Renk sadece harflerden oluşmalıdır")
      .required("Renk Giriniz"),
  });
  const initialValues = {
    colorEntityName: "",
  };
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      handleAddColor(values);
    }}
  >
    <SideBar>
      <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Renk Ekleme</h2>
        <Form>
          <div className="row">
            <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
              <div className="mb-2">
                <FormikInput
                  name="colorEntityName"
                  label="Renk "
                  placeHolder="Renk Giriniz."
                  type="text"
                />
                 <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px", marginLeft:"140px" }} type='submit'>Ekle</Button>
              </div>
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

export default AddColor





