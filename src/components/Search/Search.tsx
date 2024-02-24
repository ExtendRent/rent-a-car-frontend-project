import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { getByAllFilteredCars, getByDateCars } from '../../store/slices/carSlice';
import { AppDispatch } from '../../store/configureStore';
import { GetByDateCarResponse } from '../../models/Responses/Car/GetByDateCarResponse';
import SelectedCar from '../../pages/SelectedCar/SelectedCar';
import { AllGetByDateCarResponse } from '../../models/Responses/Car/AllGetByDateCarResponse';
import carIcon from '../../assets/coupe-car.png';
import wheelIcon from '../../assets/steering-wheel.png';
import './Search.css'

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchCarResponse, setSearchCarResponse] = useState<AllGetByDateCarResponse | undefined>();

  return (
    <div className="container-lg mt-5">
      <Formik
        initialValues={{ startDate: new Date().toISOString().slice(0, 10) , endDate: '' }}
        onSubmit={async (values) => {
          const { startDate, endDate } = values;

          if (startDate || endDate) {
            const parsedStartDate = new Date(startDate); // String'i Date'e çevirin
            const parsedEndDate = new Date(endDate);

            const startDateValue = parsedStartDate instanceof Date ? parsedStartDate.toISOString().split('T')[0] : parsedStartDate;
            const endDateValue = parsedEndDate instanceof Date ? parsedEndDate.toISOString().split('T')[0] : parsedEndDate;
            const response = await dispatch(getByAllFilteredCars({
              startDate: startDateValue,
              endDate : endDateValue
            }));
            if (response.payload) {
            
              setSearchCarResponse(response.payload as AllGetByDateCarResponse);
             
            }
            //<SelectedCar key={JSON.stringify(searchCarResponse)} response={searchCarResponse} />
            navigate(`/selectedCar`, { state: { startDate: startDateValue, endDate: endDateValue } });
          } else {
            console.error('startDate and endDate must be defined before navigating.');
          }
        }}
      >
        <Form>
          
          <div className="mb-5">
            <label htmlFor="startDate" className="form-label text-white fs-2 text-fadeInUpFast">
              Başlama Tarihi
            </label>
            
            <Field
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label custom-label text-white fs-2 text-fadeInUpFast">
              Dönüş Tarihi
            </label>
            <Field
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
            />
          </div>
          
      {/*     <button className='button2'>
  <div className="svg-wrapper-1">
  <span>Tarihe Göre Ara</span>
    <div className="svg-wrapper">
    <img src={carIcon} alt="Coupe Car" />
    </div>
  </div>
  
</button> */}

<button className="button3">

Tarihe Göre Ara
<img className= "wheelIcon" src={wheelIcon} alt="wheel" />
</button>
          
        </Form>
      </Formik>
    </div>
  );
};

export default Search;
