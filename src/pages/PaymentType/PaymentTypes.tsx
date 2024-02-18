import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchPaymentTypes, updatePaymentType } from '../../store/slices/paymentTypeSlice';
import '../Brands/Brand.css';
import MyMUIDataTable from "./PaymentTypeTable";
import SideBar from '../../components/Sidebar/SideBar';

type Props = {}

const PaymentTypes = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const paymentTypeState = useSelector((state: any) => state.paymentType);
  
  const [selectedPaymentType, setSelectedPaymentType] = useState<number | null>(null)
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    dispatch(fetchPaymentTypes())
  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paymentTypeId = parseInt(e.target.value, 10);
    setSelectedPaymentType(paymentTypeId);
    console.log(paymentTypeId);
    
  };

  const handlePaymentTypeUpdateSuccess = () => {
    if (name.trim() !== "" && selectedPaymentType !== null) {
      dispatch(updatePaymentType({ id: selectedPaymentType, name: name, isActive: isActive }));
      handleCancelUpdate();
    }
  }

  const handleCancelUpdate = () => {
    setSelectedPaymentType(null);
    setName("");
    dispatch(fetchPaymentTypes());
  }

  return (
    <div >
      <SideBar>
        <div className="full-screen">
          <MyMUIDataTable />
        </div>
      </SideBar>
       
    </div>
  );
}

export default PaymentTypes