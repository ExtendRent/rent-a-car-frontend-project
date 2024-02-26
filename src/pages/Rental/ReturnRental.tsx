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
    <div className="container-card return-rental-container">
        <div className="form return-rental-form">
        <h2 className="h2-card">Kiralama Tamamla</h2>
        <div className="returnRental">
            <p style={{textAlign:'center', marginTop:'100px'}}><label htmlFor="endDate">Bitiş Günü:</label></p>
            <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            </div>
        
        
        <div className="returnRental">
        <p style={{textAlign:'center', marginTop:'20px'}}><label htmlFor="endKilometer">Güncel km:</label></p>
            <input
                type="number"
                id="endKilometer"
                value={endKilometer}
                onChange={(e) => setEndKilometer(parseInt(e.target.value))}
            />
        </div>
        <div className="form-actions return-rental-action">
        <button className='return-button' onClick={handlePaymentTypeUpdateSuccess}>Kiralamayı Bitir</button>
        <button className='return-button' onClick={handleCancelUpdate}>İptal</button>
        </div>
        </div>
    </div>
);
}

export default ReturnRental