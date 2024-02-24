import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addCarSegment } from '../../store/slices/carSegmentSlice';
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";

type Props = {}

const AddCarSegment = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
  
    const handleAddCarSegment= (values: any) => {
        dispatch(addCarSegment(values));
    };
    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, "Segment en az 2 karakter olmalıdır")
        .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Segment sadece harflerden oluşmalıdır")
        .required("Segment Giriniz"),
    });
    const initialValues = {
      name: "",
    };
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      handleAddCarSegment(values);
    }}
    enableReinitialize={true}
  >
    <SideBar>
      <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Segment Ekleme</h2>
        <Form>
          <div className="row">
            <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
              <div className="mb-2">
                <FormikInput
                  name="name"
                  label="Segment Giriniz"
                  placeHolder="Segment Giriniz."
                  type="text"
                />
                <Button type="submit">Ekle</Button>
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

export default AddCarSegment