import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/configureStore'
import { addColor } from '../../store/slices/colorSlice'
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";

type Props = {}

const AddColor = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAddColor= (values: any) => {
      dispatch(addColor(values));
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
      </div>
      </div>
    </SideBar>
    </Formik>
  )
}

export default AddColor





