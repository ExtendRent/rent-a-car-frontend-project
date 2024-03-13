import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { AdminModel } from '../../models/Responses/Admin/AdminModel';
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { fetchAdmins, getByIdAdmin, updateAdmin } from '../../store/slices/adminSlice';
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";

type Props = {}

const UpdateAdmin = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const adminId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [admin, setAdmin] = useState<AdminModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.admin.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdAdmin({ id: adminId }));
      setAdmin((newResponse as any)?.payload);

      dispatch(fetchAdmins());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

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
    id:adminId,
    name:admin?.name,
    surname:admin?.surname,
    emailAddress:admin?.email,
    password:'',
    phoneNumber:admin?.phoneNumber,
    salary: admin?.salary,
    imagePath:'',
    authority:admin?.authority,
  }

  const handleUpdateAdmin = async (values: any) => {
    try {
      const response = await dispatch(updateAdmin(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating discount code: ", error);
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };


  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Çalışan Güncelle</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateAdmin(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <div className="row-update-employee">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Ad"
                      placeHolder="Çalışan Adı Giriniz."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="surname"
                      label="Soyad"
                      placeHolder="Soyadı Giriniz"
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="emailAddress"
                      label="email"
                      placeHolder="Mail Adresi Giriniz"
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="password"
                      label="Şifre"
                      placeHolder="Şifre Giriniz"
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="phoneNumber"
                      label="Telefon"
                      placeHolder="Telefon Giriniz"
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="salary"
                      label="Maaş"
                      placeHolder="Maaş Giriniz"
                      type="number"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="authority"
                      label="Yetki"
                      placeHolder="Yetki Giriniz"
                      type="text"
                    />
                  </div>
                  <Button
                    style={{
                      marginTop: "30px",
                      backgroundColor: "rgb(140,24,24)",
                      color: "white",
                      width: "200px",
                      borderRadius: "10px",
                      marginLeft: "140px",
                    }}
                    type="submit"
                  >
                    Güncelle
                  </Button>
                </div>
              </div>
            </Form>
          
        </Formik>
        {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
        {!errorCustom && successMessage && (
        <Alert severity="success">{successMessage}</Alert>
          )}
      </div>
    </div>
    </SideBar>
  )
}

export default UpdateAdmin