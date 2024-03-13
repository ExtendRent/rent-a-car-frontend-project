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
import { DiscountCodeModel } from '../../models/Responses/DiscountCode/DiscountCodeModel';
import { fetchDiscountCodes, getByIdDiscountCode, updateDiscountCode } from '../../store/slices/discountCodeSlice';


const UpdateDiscountCode = () => {
  
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const discountCodeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [discountCode, setDiscountCode] = useState<DiscountCodeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.discountCode.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdDiscountCode({ id: discountCodeId }));
      setDiscountCode((newResponse as any)?.payload);

      dispatch(fetchDiscountCodes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    discountCode: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "Sadece harf ve rakamlardan oluşmalıdır")
        .required("İndirim kodu gerekli"),
    discountPercentage: Yup.number()
        .min(5, "İndirim oranı en az 5 olmalıdır")
        .max(90, "İndirim oranı en fazla 90 olmalıdır")
        .typeError("Sadece sayılar kabul edilir")
        .required("İndirim oranı gerekli")
});

const initialValues = {
  id: discountCodeId,
  discountCode: discountCode?.discountCode,
  discountPercentage:discountCode?.discountPercentage,
};
  const handleUpdateDiscountCode = async (values: any) => {
    try {
      const response = await dispatch(updateDiscountCode(values));
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
        <h2 className="h2-card">İndirim Kodu Güncelle</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateDiscountCode(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <div className="row-update-discountCode">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="discountCode"
                      label="İndirim Kodu"
                      placeHolder="İndirim Kodu Giriniz."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="discountPercentage"
                      label="İndirim Yüzdesi"
                      placeHolder="İndirim Yüzdesi Giriniz"
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

export default UpdateDiscountCode