import React, { useState } from "react";
import { RootState } from "../../store/configureStore";
import { addEmployee } from "../../store/slices/employeeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import './Employee.css'
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert } from "@mui/material";
type Props = {};

const AddEmployee = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.employee.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddEmployee = (values: any) => {
    dispatch(addEmployee(values));
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "İsim sadece harflerden oluşmalıdır"
      )
      .required("İsim giriniz"),
    surname: Yup.string()
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Soyisim sadece harflerden oluşmalıdır"
      )
      .required("Soyisim giriniz"),
    emailAddress: Yup.string().required("Mail Adresi Giriniz"),
    password: Yup.string()
      .required("Şifre Giriniz")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
      ),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Telefon numarası sadece sayılardan oluşmalıdır")
      .min(10, "Telefon numarası 10 hane olmalıdır")
      .max(10, "Telefon numarası 10 hane olmalıdır")
      .required("Telefon numarası giriniz"),
    salary: Yup.number()
      .min(0, "Maaş en az 0 olmalıdır")
      .required("Maaş giriniz"),
    imagePath: Yup.string().required("Fotoğraf Giriniz"),
    authority: Yup.string().required("Yetki Giriniz"),
  });
  const initialValues = {
    name: "",
    surname: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    salary: 0,
    imagePath: "",
    authority: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddEmployee(values);
      }}
      enableReinitialize={true}
    >
    <SideBar>
      <div className="container-card">
      <div className="form">
        <h2 className='h2-card'>Çalışan Ekleme</h2>
          <Form>
            <div className="row-add-employee">
              <div id='select-block' className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="İsim "
                    placeHolder="İsim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="surname"
                    label="Soyisim "
                    placeHolder="İsim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="emailAddress"
                    label="Mail Adresi "
                    placeHolder="Mail Adresi Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="password"
                    label="Şifre "
                    placeHolder="Şifre Giriniz."
                    type='text'
                  />
                </div>
              </div>
              <div id='input-block' className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="phoneNumber"
                    label="Telefon Numarası "
                    placeHolder="Telefon Numarası Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="salary"
                    label="Maaş "
                    placeHolder="Maaş Giriniz."
                    type='number'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="imagePath"
                    label="Resim "
                    placeHolder="Resim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="authority"
                    label="Yetki "
                    placeHolder="Yetki Giriniz."
                  />
                </div>
              <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px", marginLeft:"40px" }} type='submit'>Ekle</Button>
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

export default AddEmployee;
