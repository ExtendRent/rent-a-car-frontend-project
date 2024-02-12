import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { fetchPaymentDetails, updatePaymentDetails } from "../../store/slices/paymentDetailsSlice";
import { useEffect, useState } from "react";
import { fetchPaymentTypes } from "../../store/slices/paymentTypeSlice";


type Props = {}

const PaymentDetails = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const paymentDetailsState = useSelector((state: any) => state.paymentDetails);

    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0);


    useEffect(() => {
        dispatch(fetchPaymentDetails());
    }, [dispatch])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const paymentDetailsId = parseInt(e.target.value, 10);
        setSelectedPaymentDetails(paymentDetailsId);
    }

    const handlePaymentDetailsUpdateSuccess = () => {
        if (selectedPaymentDetails !== null) {
            dispatch(updatePaymentDetails({ id: selectedPaymentDetails, amount: amount }));
            setAmount(0);
            handleCancelUpdate();
        }
    }
    const handleCancelUpdate = () => {
        setSelectedPaymentDetails(0);
        setAmount(0);
        dispatch(fetchPaymentDetails());
    }
    return (
        <div style={{ marginTop: 200 }}>
            <div>
                <h2>Payment Details List</h2>
                <select value={selectedPaymentDetails || " "} onChange={handleSelectChange}>
                    <option value="" disabled>Select a PaymentDetails</option>
                    {paymentDetailsState.paymentDetails.map((paymentDetails: any) => (
                        <option key={paymentDetails.id} value={paymentDetails.id}>
                            {paymentDetails.amount}
                        </option>
                    ))}
                </select>
            </div>
            <div>

                <div>
                    {selectedPaymentDetails !== null && (
                        <input
                            type="text"
                            value={isNaN(amount) ? '' : amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                        />
                    )}
                </div>
            </div>
            <button onClick={handlePaymentDetailsUpdateSuccess}>Update Payment Details</button>
            <button onClick={handleCancelUpdate}>Cancel</button>

        </div>
    )
}

export default PaymentDetails