import { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import { Button } from "@mui/joy";
import FormikInput from '../../components/FormikInput/FormikInput';
import SideBar from '../../components/Sidebar/SideBar';
import { Alert } from "@mui/material";
import { RootState } from '../../store/configureStore';
import { useAppSelector } from '../../store/useAppSelector';
import { PaymentTypeModel } from '../../models/Responses/PaymentType/PaymentTypeModel';
import { fetchPaymentTypes, getByIdPaymentType, updatePaymentType } from '../../store/slices/paymentTypeSlice';
import FormikCheckbox from '../../components/FormikCheckbox/FormikCheckbox';


const UpdatePaymentType = () => {

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const paymentTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [paymentType, setPaymentType] = useState<PaymentTypeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.paymentType.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdPaymentType({ id: paymentTypeId }));
      setPaymentType((newResponse as any)?.payload);

      dispatch(fetchPaymentTypes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Ödeme tipi giriniz.")
      .min(2, 'Ödeme tipi en az 2 karakter olmalıdır')
      .max(20, 'Ödeme tipi en fazla 20 karakter olmalıdır')
      .matches(/^[\sa-zA-ZğüşıöçĞÜŞİÖÇ]*$/, 'Ödeme tipi sadece harflerden oluşmalıdır'),
    active: Yup.boolean()
  });

  const initialValues = {
    id: paymentTypeId,
    name: paymentType?.name,
    active: paymentType?.active
  };

  const handleUpdatePaymentType = async (values: any) => {
    try {
      const response = await dispatch(updatePaymentType(values))
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
          <h2 className="h2-card">Ödeme Tipi Güncelle</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleUpdatePaymentType(values);
            }}
            enableReinitialize={true}
          >

            <Form>
              <div className="row-update-paymentType">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Ödeme Tipi"
                      placeHolder="Ödeme Tipi Giriniz."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikCheckbox
                      name="active"
                      label="Ödeme Tipi Aktif mi?"
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

export default UpdatePaymentType