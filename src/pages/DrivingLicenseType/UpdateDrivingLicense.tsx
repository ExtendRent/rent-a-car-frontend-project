import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router-dom';
import { DrivingLicenseTypeModel } from '../../models/Responses/DrivingLicenseType/DrivingLicenseTypeModel';
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { fetchDrivingLicenseTypes, getByIdDrivingLicenseType, updateDrivingLicenseType } from '../../store/slices/drivingLicenseTypeSlice';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";

const UpdateDrivingLicenseType = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const drivingLicenseTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [drivingLicenseType, setDrivingLicenseType] = useState<DrivingLicenseTypeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.drivingLicenseType.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdDrivingLicenseType({ id: drivingLicenseTypeId }));
      setDrivingLicenseType((newResponse as any)?.payload);

      dispatch(fetchDrivingLicenseTypes());
    } catch (error) {
      console.error("Error fetching data: ", error);
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
    id: drivingLicenseTypeId,
    name: drivingLicenseType?.name,
    description: drivingLicenseType?.description,
    licenseLevel: drivingLicenseType?.licenseLevel
  };

  const handleUpdateDrivingLicenseType = async (values: any) => {
    try {
      const response = await dispatch(updateDrivingLicenseType(values));
      // İşlem başarılı olduğunda
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };


  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Ehliyet Tipi Güncelle</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateDrivingLicenseType(values);
          }}
          enableReinitialize={true}
        >
          <Form>
              <div className="row-update-drivingLicenseType">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Ehliyet Tipi"
                      placeHolder="Ehliyet Tipi Giriniz."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="description"
                      label="Açıklama"
                      placeHolder="Açıklama Giriniz."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="licenseLevel"
                      label="Seviye "
                      placeHolder="Seviye Giriniz."
                      type="number"
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

export default UpdateDrivingLicenseType