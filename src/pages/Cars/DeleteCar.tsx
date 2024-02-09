import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteCar, fetchCars } from '../../store/slices/carSlice';

type Props = {}

const DeleteCar = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const carState = useSelector((state: any) => state.car);
    const [selectedCar, setSelectedCar] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchCars());
    })

    const handleCarChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const carId = parseInt(e.target.value, 10);
        setSelectedCar(carId);
        console.log(carId);
        
      }
    

    const handleCancelUpdate = () =>{
        setSelectedCar(null);
    }

    const handleDeleteCar = async () => {
        if (selectedCar !== null) {
          await dispatch(deleteCar({ carId: selectedCar }));
          // Silme işlemi tamamlandığında tetiklenir
          handleCancelUpdate();
        }
      }

    return (
        <div id='container-car' className="container d-flex flex-column align-items-center">
    
        <div id='select-block' className="col-md-6">

          <div className="mb-2">
            <label htmlFor="selectCar">Araç Seç</label>
            <select className="form-select" id="carSelect" value={selectedCar || ''} onChange={handleCarChange}>
              <option value="" disabled>

              </option>
              {carState.cars.map((car: any) => (
                <option key={car.id} value={car.id} >
                  {car.carModelEntityBrandEntityName} {car.carModelEntityName} {car.year}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleDeleteCar} disabled={selectedCar === null}>
                Delete Car
            </button>
          </div>
           
        </div>
    )
}

export default DeleteCar