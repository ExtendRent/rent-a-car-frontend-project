import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { addDrivingLicenseType } from "../../store/slices/drivingLicenseTypeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert } from "@mui/material";

type Props = {};

const AddDrivingLicenseType = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.drivingLicenseType.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddDrivingLicenseType = (values: any) => {
    try{
    dispatch(addDrivingLicenseType(values));
    setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Z]{1,3}$/, "Geçersiz ehliyet tipi")
      .required("Ehliyet tipi gerekli"),
    description: Yup.string()
      .max(30, "En fazla 30 karakter girebilirsiniz")
      .required("Açıklama gerekli"),
    licenseLevel: Yup.number()
      .min(0, "Lisans seviyesi en az 0 olmalıdır")
      .required("Lisans seviyesi gerekli"),
  });

  const initialValues = {
    name: "",
    description: "",
    licenseLevel: 0,
  };

  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Ehliyet Tipi Ekleme</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleAddDrivingLicenseType(values);
          }}
          enableReinitialize={true}
        >
          
            <Form>
              <div className="row-add-carModel">
                <div id="select-block" className="col-md-6" style={{ marginTop: '110px' }}>
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Ehliyet Tipi "
                      placeHolder="Ehliyet Tipi Giriniz."
                      type="text"
                    />
                    <FormikInput
                      name="description"
                      label="Açıklama"
                      placeHolder="Açıklama Giriniz."
                      type="text"
                    />
                    <FormikInput
                      name="licenseLevel"
                      label="Seviye "
                      placeHolder="Seviye Giriniz."
                      type="number"
                    />
                    <Button style={{ marginTop: '30px', backgroundColor: "rgb(140,24,24)", color: "white", width: "200px", borderRadius: "10px", marginLeft: "140px" }} type='submit'>Ekle</Button>
                  </div>
                </div>
              </div>
            </Form>
            {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
        {!errorCustom && successMessage && (
          <Alert severity="success">{successMessage}</Alert>
        )}
          
        </Formik>
      </div>
    </div>
    </SideBar>
  );
};
export default AddDrivingLicenseType;
