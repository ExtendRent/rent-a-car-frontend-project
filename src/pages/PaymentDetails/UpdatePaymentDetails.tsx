import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button } from "@mui/joy";
import FormikInput from '../../components/FormikInput/FormikInput';
import SideBar from '../../components/Sidebar/SideBar';
import { Alert } from "@mui/material";
import { PaymentDetailsModel } from '../../models/Responses/PaymentDetails/PaymentDetailsModel';
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { fetchPaymentDetails, getByIdPaymentDetails, updatePaymentDetails } from '../../store/slices/paymentDetailsSlice';

type Props = {}

const UpdatePaymentDetails = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const paymentDetailsId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.paymentDetails.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdPaymentDetails({ id: paymentDetailsId }));
      setPaymentDetails((newResponse as any)?.payload);

      dispatch(fetchPaymentDetails());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Ödeme tutarı boş geçilemez.")
    
  });

  const initialValues = {
    id: paymentDetailsId,
    amount: paymentDetails?.amount,
  };

  const handleUpdatePaymentDetails = async (values: any) => {
    try {
      const response = await dispatch(updatePaymentDetails(values))
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
          <h2 className="h2-card">Fatura Güncelle</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleUpdatePaymentDetails(values);
            }}
            enableReinitialize={true}
          >

            <Form>
              <div className="row-update-paymentDetails">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="amount"
                      label="Ödeme Tutarı"
                      placeHolder="Ödeme Tutarı Giriniz."
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

export default UpdatePaymentDetails