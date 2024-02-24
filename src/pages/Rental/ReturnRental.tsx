import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import { fetchRentals, returnRental } from "../../store/slices/rentalSlice";
import "./ReturnRental.css";
import { useParams } from "react-router-dom";

type Props = {}

const ReturnRental = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const rentalState = useSelector((state: any) => state.rental);

  const { id } = useParams();
  const rentalId = parseInt(id || '');
  
  const [endDate, setEndDate] = useState("");
  const [endKilometer, setEndKilometer] = useState(0);

  useEffect(() => {
    dispatch(fetchRentals())
  }, [dispatch])

  const handlePaymentTypeUpdateSuccess = () => {
      dispatch(returnRental({ returnDate: endDate, id: rentalId, endKilometer: endKilometer }));
      handleCancelUpdate();
    }

  const handleCancelUpdate = () => {
    setEndDate("");
    setEndKilometer(0);
    dispatch(fetchRentals());
  }

  return (
    <div className="return-rental-form">
        <h2>Return Rental</h2>
        <div className="form-control">
            <label htmlFor="endDate">End Date:</label>
            <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
        </div>
        
        <div className="form-control">
            <label htmlFor="endKilometer">End Kilometer:</label>
            <input
                type="number"
                id="endKilometer"
                value={endKilometer}
                onChange={(e) => setEndKilometer(parseInt(e.target.value))}
            />
        </div>
        <div className="form-actions">
        <button onClick={handlePaymentTypeUpdateSuccess}>Update Payment Type</button>
        <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
    </div>
);
}

export default ReturnRental