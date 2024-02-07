import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchPaymentTypes, updatePaymentType } from '../../store/slices/paymentTypeSlice';

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
    <div style={{ marginTop: 200 }}>

      <select value={selectedPaymentType || " "} onChange={handleSelectChange}>
        <option value="" disabled></option> 
        {paymentTypeState.paymentTypes.map((paymentType: any) => (
          <option key={paymentType.id} value={paymentType.id}>
            {paymentType.name}
          </option>
        ))}
      </select> 
 
      {selectedPaymentType !== null && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}

      <div>
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
      </div>

      <button onClick={handlePaymentTypeUpdateSuccess}>Update Payment Type</button>
      <button onClick={handleCancelUpdate}>Cancel</button>

    </div>
  )
}

export default PaymentTypes