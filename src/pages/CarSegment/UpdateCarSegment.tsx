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
import { CarSegmentModel } from '../../models/Responses/CarSegment/CarSegmentModel';
import { fetchCarSegments, getByIdCarSegment, updateCarSegment } from '../../store/slices/carSegmentSlice';


const UpdateCarSegment = () => {
  
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const carSegmentId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [carSegment, setCarSegment] = useState<CarSegmentModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carSegment.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdCarSegment({ id: carSegmentId }));
      setCarSegment((newResponse as any)?.payload);

      dispatch(fetchCarSegments());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Araç segmenti giriniz.")
      .min(2, 'Araç segmenti en az 2 karakter olmalıdır')
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Araç segmenti sadece harflerden oluşmalıdır')
  });

  const initialValues = {
    id: carSegmentId,
    name: carSegment?.name,
  };

  const handleUpdateCarSegment = async (values: any) => {
    try {
      const response = await dispatch(updateCarSegment(values));
      // İşlem başarılı olduğunda
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating car segment: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };
  

  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Araç Segmenti Güncelle</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateCarSegment(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <div className="row-update-carSegment">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Araç Segment"
                      placeHolder="Araç Segmenti Giriniz."
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

export default UpdateCarSegment