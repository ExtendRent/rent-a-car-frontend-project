import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { FuelTypeModel } from '../../models/Responses/FuelType/FuelTypeModel';
import { fetchFuelType, getByIdFuelType, updateFuelType } from '../../store/slices/fuelTypeSlice';


const UpdateFuelType = () => {
  
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const fuelTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [fuelType, setFuelType] = useState<FuelTypeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.fuelType.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdFuelType({ id: fuelTypeId }));
      setFuelType((newResponse as any)?.payload);

      dispatch(fetchFuelType());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Yakıt tipi giriniz.")
      .min(2, 'Yakıt tipi en az 2 karakter olmalıdır')
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Yakıt tipi sadece harflerden oluşmalıdır')
  });

  const initialValues = {
    id: fuelTypeId,
    name: fuelType?.name,
  };

  const handleUpdateFuelType = async (values: any) => {
    try {
      const response = await dispatch(updateFuelType(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating fuel type: ", error);
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };
  

  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Yakıt Tipi Güncelle</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateFuelType(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <div className="row-update-fuelType">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Yakıt Tipi"
                      placeHolder="Yakıt Tipi Giriniz."
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

export default UpdateFuelType