import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/configureStore'
import { addAdmin } from '../../store/slices/adminSlice'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import FormikInput from '../../components/FormikInput/FormikInput'
import SideBar from '../../components/Sidebar/SideBar'
import {Button } from '@mui/material';
type Props = {}

const AddAdmin = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salary, setSalary] = useState<number>(0);
  const [imagePath, setImagePath] = useState("");
  const [authority, setAuthority] = useState("");


  const handleAddAdmin = () => {
      if(name.trim() !== ""){
      dispatch(addAdmin({name: name, surname: surname, emailAddress: emailAddress, password: password,
        phoneNumber: phoneNumber, salary: salary, imagePath: imagePath, authority: authority}));
      setName("");
      setSurname("");
      setEmailAddress("");
      setPassword("");
      setPhoneNumber("");
      setSalary(0);
      setImagePath("");
      setAuthority("");
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'İsim sadece harflerden oluşmalıdır')
      .required('İsim giriniz'),
    surname: Yup.string()
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Soyisim sadece harflerden oluşmalıdır')
      .required('Soyisim giriniz'),
    emailAddress: Yup.string().required('Mail Adresi Giriniz'),
    password: Yup.string().required('Şifre Giriniz'),
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
    salary:'',
    imagePath:'',
    authority:'',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        handleAddAdmin();
        resetForm(); // Formu sıfırla
      }}
    >
    <SideBar>
      <div className="container-car">
        <h2 className='h2-car'>Admin Ekleme</h2>
          <Form>
            <div className="row">
              <div id='select-block' className="col-md-6">
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="İsim Giriniz"
                    placeHolder="İsim Giriniz."
                    value={name}
                    onChange={(value) => setName(value as string)}
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="surname"
                    label="Soyisim Giriniz"
                    placeHolder="İsim Giriniz."
                    value={surname}
                    onChange={(value) => setSurname(value as string)}
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="emailAddress"
                    label="Mail Adresi Giriniz"
                    placeHolder="Mail Adresi Giriniz."
                    value={emailAddress}
                    onChange={(value) => setEmailAddress(value as string)}
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="password"
                    label="Şifre Giriniz"
                    placeHolder="Şifre Giriniz."
                    value={password}
                    onChange={(value) => setPassword(value as string)}
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
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value as string)}
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="salary"
                    label="Maaş Giriniz"
                    placeHolder="Maaş Giriniz."
                    value={salary !== undefined ? String(salary) : ''}
                    onChange={(value) => setSalary(value as number)}
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="imagePath"
                    label="Resim Giriniz"
                    placeHolder="Resim Giriniz."
                    value={imagePath}
                    onChange={(value) => setImagePath(value as string)}
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="authority"
                    label="Yetki Giriniz"
                    placeHolder="Yetki Giriniz."
                    value={authority}
                    onChange={(value) => setAuthority(value as string)}
                    type='text'
                  />
                </div>
              </div>
              <Button onClick={handleAddAdmin}>Ekle</Button>
            </div>
        </Form>
        </div>
      </SideBar>
    </Formik>
  )
}

export default AddAdmin