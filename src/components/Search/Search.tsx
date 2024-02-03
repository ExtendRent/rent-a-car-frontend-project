import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { getByDateCars } from '../../store/slices/carSlice';
import { AppDispatch } from '../../store/configureStore';
import { GetByDateCarResponse } from '../../models/Responses/GetByDateCarResponse';
import SelectedCar from '../../pages/SelectedCar/SelectedCar';
import { AllGetByDateCarResponse } from '../../models/Responses/AllGetByDateCarResponse';

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchCarResponse, setSearchCarResponse] = useState<AllGetByDateCarResponse | undefined>();

  return (
    <div className="container-lg mt-5">
      <Formik
        initialValues={{ startDate: '', endDate: '' }}
        onSubmit={async (values) => {
          const { startDate, endDate } = values;

          if (startDate && endDate) {
            const parsedStartDate = new Date(startDate); // String'i Date'e çevirin
            const parsedEndDate = new Date(endDate);

            const startDateValue = parsedStartDate instanceof Date ? parsedStartDate.toISOString().split('T')[0] : parsedStartDate;
            const endDateValue = parsedEndDate instanceof Date ? parsedEndDate.toISOString().split('T')[0] : parsedEndDate;
            const response = await dispatch(getByDateCars({
              startDate: startDateValue,
              finishDate : endDateValue
            }));
            if (response.payload) {
              //console.log(response.payload);
              
              setSearchCarResponse(response.payload as AllGetByDateCarResponse);
             
            }
            //<SelectedCar key={JSON.stringify(searchCarResponse)} response={searchCarResponse} />
            navigate(`/selectedCar`, { state: searchCarResponse });
          } else {
            console.error('startDate and endDate must be defined before navigating.');
          }
        }}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Alış Tarihi
            </label>
            <Field
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              İade Tarihi
            </label>
            <Field
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ara
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Search;
