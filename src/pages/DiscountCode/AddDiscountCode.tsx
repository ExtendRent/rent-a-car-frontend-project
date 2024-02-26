import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addDiscountCode } from '../../store/slices/discountCodeSlice';
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";

type Props = {}

const AddDiscountCode = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
 

  const handleAddDiscountCode = (values: any) => {
      dispatch(addDiscountCode(values));
}; 
const validationSchema = Yup.object().shape({
    discountCode: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "Sadece harf ve rakamlardan oluşmalıdır")
        .required("İndirim kodu gerekli"),
    discountPercentage: Yup.number()
        .min(5, "İndirim oranı en az 5 olmalıdır")
        .max(90, "İndirim oranı en fazla 90 olmalıdır")
        .typeError("Sadece sayılar kabul edilir")
        .required("İndirim oranı gerekli")
});
const initialValues = {
  discountCode: "",
  discountPercentage:0,
};


  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      handleAddDiscountCode(values);
    }}
    enableReinitialize={true}
  >
    <SideBar>
      <div className="container-card">
      <div className="form">
        <h2 className="h2-card">İndirim Kodu Ekleme</h2>
        <Form>
          <div className="row-add-carModel">
            <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
              <div className="mb-2">
                <FormikInput
                  name="discountCode"
                  label="İndirim Kodu "
                  placeHolder="İndirim Kodu Giriniz."
                  type="text"
                />
                <FormikInput
                  name="discountPercentage"
                  label="İndirim Oranı "
                  placeHolder="İndirim Oranı Giriniz."
                  type="number"
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

export default AddDiscountCode