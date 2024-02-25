import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { addFuelType } from "../../store/slices/fuelTypeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";

type Props = {};

const AddFuelType = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddFuelType = (values: any) => {
    dispatch(addFuelType(values));
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Yakıt Tipi en az 2 karakter olmalıdır")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Yakıt Tipi sadece harflerden oluşmalıdır"
      )
      .required("Yakıt Tipi Giriniz"),
  });
  const initialValues = {
    name: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddFuelType(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
        <div className="form">
          <h2 className="h2-card">Yakıt Tipi Ekleme</h2>
          <Form>
            <div className="row">
              <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="Yakıt Tipi "
                    placeHolder="Yakıt Tipi Giriniz."
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
  );
};

export default AddFuelType;
