import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store/configureStore'
import { addAdmin } from '../../store/slices/adminSlice'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import FormikInput from '../../components/FormikInput/FormikInput'
import SideBar from '../../components/Sidebar/SideBar'
import {Alert, Button } from '@mui/material';
import '../Employee/Employee.css'
import { useAppDispatch } from '../../store/useAppDispatch'
import { useAppSelector } from '../../store/useAppSelector'
type Props = {}

const AddAdmin = (props: Props) => {

  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState({});
  const errorCustom = useAppSelector((state: RootState) => state.employee.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
 
  const handleAddAdmin = (values: any) => {
      dispatch(addAdmin(values));
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'İsim sadece harflerden oluşmalıdır')
      .required('İsim giriniz'),
    surname: Yup.string()
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Soyisim sadece harflerden oluşmalıdır')
      .required('Soyisim giriniz'),
    emailAddress: Yup.string().required('Mail Adresi Giriniz'),
    password: Yup.string().required('Şifre Giriniz')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Telefon numarası sadece sayılardan oluşmalıdır')
      .min(10, 'Telefon numarası 10 hane olmalıdır')
      .max(10, 'Telefon numarası 10 hane olmalıdır')
      .required('Telefon numarası giriniz'),
    salary: Yup.number()
      .min(0, 'Maaş en az 0 olmalıdır')
      .required('Maaş giriniz'),
    imagePath: Yup.string().required('Fotoğraf Giriniz'),
    authority: Yup.string().required('Yetki Giriniz'),
  })
  const initialValues = {
    name:'',
    surname:'',
    emailAddress:'',
    password:'',
    phoneNumber:'',
    salary: 0,
    imagePath:'',
    authority:'',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleAddAdmin(values);
      }}
      enableReinitialize={true}
    >
    <SideBar>
      <div className="container-card">
      <div className="form">
        <h2 className='h2-card'>Admin Ekleme</h2>
          <Form>
            <div className="row-add-employee">
              <div id='select-block' className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="İsim"
                    placeHolder="İsim Giriniz."
                    type='text' 
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="surname"
                    label="Soyisim"
                    placeHolder="İsim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="emailAddress"
                    label="Mail Adresi"
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
              <div id='input-block' className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="phoneNumber"
                    label="Telefon Numarası"
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
                    label="Yetki"
                    placeHolder="Yetki Giriniz."
                  />
                </div>
              <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px" }} type='submit'>Ekle</Button>
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

export default AddAdmin