import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserModel } from '../../models/Responses/User/UserModel';
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { changePassword, fetchUsers, getByIdUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../store/useAppDispatch';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';

type Props = {}

const UpdatePassword = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id ?? "", 10);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.user.error);
  


  const validationSchema = Yup.object().shape({
    password: Yup.string()
    .min(8, "Şifre en az 8 hane olmalıdır")
    .max(30, "Şifre en fazla 30 hane olmalıdır")
    .required("Şifre giriniz"),
  })

  const initialValues = {
    id:userId,
    password: "", 
  };

  const handleUpdateUser = async (values: any) => {
    try {
      const response = await dispatch(changePassword(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating discount code: ", error);
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
    window.location.href = "/adminPanel/users";
  };

  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Şifre Güncelle</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateUser(values);
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
                      name="password"
                      label="Şifre"
                      placeHolder="Şifre Giriniz."
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

export default UpdatePassword