import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { addCarBodyType } from "../../store/slices/carBodyTypeSlice";
import { Button } from "@mui/joy";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";

type Props = {};

const AddCarBodyType = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddCarBodyType = (values: any) => {
    dispatch(addCarBodyType(values));
  };
  const validationSchema = Yup.object().shape({
    carBodyTypeEntityName: Yup.string()
      .min(2, "Kasa Tipi en az 2 karakter olmalıdır")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Kasa Tipi sadece harflerden oluşmalıdır")
      .required("Kasa Tipi Giriniz"),
  });
  const initialValues = {
    carBodyTypeEntityName: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddCarBodyType(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
        <div className="form">
          <h2 className="h2-card">Kasa Tipi Ekleme</h2>
          <Form>
            <div className="row-add-carModel">
              <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="carBodyTypeEntityName"
                    label="Kasa Tipi "
                    placeHolder="Kasa Tipi Giriniz."
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

export default AddCarBodyType;
