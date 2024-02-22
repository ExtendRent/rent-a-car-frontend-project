import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import { fetchRentals, returnRental } from "../../store/slices/rentalSlice";
import "./ReturnRental.css";

type Props = {}

const ReturnRental = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const rentalState = useSelector((state: any) => state.rental);

  
  const [endDate, setEndDate] = useState("");
  const [rentalId, setRentalId] = useState(0);
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
    setRentalId(0);
    setEndKilometer(0);
    dispatch(fetchRentals());
  }

  return (
    <div>
        <h2>Return Rental</h2>
        <div>
            <label htmlFor="endDate">End Date:</label>
            <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="rentalId">id:</label>
            <input
                type="number"
                id="rentalId"
                value={rentalId}
                onChange={(e) => setRentalId(parseInt(e.target.value))}
            />
        </div>
        <div>
            <label htmlFor="endKilometer">End Kilometer:</label>
            <input
                type="number"
                id="endKilometer"
                value={endKilometer}
                onChange={(e) => setEndKilometer(parseInt(e.target.value))}
            />
        </div>
        <button onClick={handlePaymentTypeUpdateSuccess}>Update Payment Type</button>
      <button onClick={handleCancelUpdate}>Cancel</button>
    </div>
);
}

export default ReturnRental