import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import { ShiftTypeModel } from '../../models/Responses/ShiftTypes/ShiftTypeModel';
import { fetchShiftTypes, getByIdShiftType, updateShiftType } from '../../store/slices/shiftTypeSlice';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';


const UpdateShiftType = () => {
  
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const shiftTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [shiftType, setShiftType] = useState<ShiftTypeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.shiftType.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdShiftType({ id: shiftTypeId }));
      setShiftType((newResponse as any)?.payload);

      dispatch(fetchShiftTypes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Vites tipi giriniz.")
      .min(2, 'Vites tipi en az 2 karakter olmalıdır')
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Vites tipi sadece harflerden oluşmalıdır')
  });

  const initialValues = {
    id: shiftTypeId,
    name: shiftType?.name,
  };

  const handleUpdateShiftType = async (values: any) => {
    try {
      const response = await dispatch(updateShiftType(values));
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
        <h2 className="h2-card">Vites Tipi Güncelle</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateShiftType(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <div className="row-update-shiftType">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Vites Tipi"
                      placeHolder="Vites Tipi Giriniz."
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

export default UpdateShiftType