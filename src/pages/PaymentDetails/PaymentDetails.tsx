import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import {
  fetchPaymentDetails,
  updatePaymentDetails,
} from "../../store/slices/paymentDetailsSlice";
import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import '../Brands/Brand.css';
import MyMUIDataTable from "./PaymentDetailsTable";

type Props = {};

const PaymentDetails = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const paymentDetailsState = useSelector((state: any) => state.paymentDetails);

  const [selectedPaymentDetails, setSelectedPaymentDetails] =
    useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchPaymentDetails());
  }, [dispatch]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paymentDetailsId = parseInt(e.target.value, 10);
    setSelectedPaymentDetails(paymentDetailsId);
  };

  const handlePaymentDetailsUpdateSuccess = () => {
    if (selectedPaymentDetails !== null) {
      dispatch(
        updatePaymentDetails({ id: selectedPaymentDetails, amount: amount })
      );
      setAmount(0);
      handleCancelUpdate();
    }
  };
  const handleCancelUpdate = () => {
    setSelectedPaymentDetails(0);
    setAmount(0);
    dispatch(fetchPaymentDetails());
  };
  return (
    <div >
      <SideBar>
        <div className="full-screen">
          <MyMUIDataTable />
        </div>
      </SideBar>
       
    </div>
  );
};

export default PaymentDetails;
