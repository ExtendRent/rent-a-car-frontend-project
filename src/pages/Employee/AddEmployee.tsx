import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { addEmployee } from "../../store/slices/employeeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";

type Props = {};

const AddEmployee = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

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
      <div className="container-car">
        <h2 className='h2-car'>Çalışan Ekleme</h2>
          <Form>
            <div className="row">
              <div id='select-block' className="col-md-6">
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="İsim Giriniz"
                    placeHolder="İsim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="surname"
                    label="Soyisim Giriniz"
                    placeHolder="İsim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="emailAddress"
                    label="Mail Adresi Giriniz"
                    placeHolder="Mail Adresi Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="password"
                    label="Şifre Giriniz"
                    placeHolder="Şifre Giriniz."
                    type='text'
                  />
                </div>
              </div>
              <div id='input-block' className="col-md-6">
                <div className="mb-2">
                  <FormikInput
                    name="phoneNumber"
                    label="Telefon Numarası Giriniz"
                    placeHolder="Telefon Numarası Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="salary"
                    label="Maaş Giriniz"
                    placeHolder="Maaş Giriniz."
                    type='number'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="imagePath"
                    label="Resim Giriniz"
                    placeHolder="Resim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="authority"
                    label="Yetki Giriniz"
                    placeHolder="Yetki Giriniz."
                  />
                </div>
              </div>
              <Button type='submit'>Ekle</Button>
            </div>
        </Form>
        </div>
      </SideBar>
    </Formik>
  );
};

export default AddEmployee;
