import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteCarModel, fetchCarModels } from '../../store/slices/carModelSlice';

type Props = {}

const DeleteCarModel = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const carModelState = useSelector((state: any) => state.carModel);
    const [selectedCarModel, setSelectedCarModel] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchCarModels());
    }, [dispatch])

    const handleCarModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const carModelId = parseInt(e.target.value, 10);
        setSelectedCarModel(carModelId);
      }
    
      const handleCancelUpdate = () => {
        setSelectedCarModel(null);
        dispatch(fetchCarModels());
      }
    
      const handleDeleteCarModel = async () => {
        if (selectedCarModel !== null) {
          await dispatch(deleteCarModel({ id: selectedCarModel }));
          // Silme işlemi tamamlandığında tetiklenir
          handleCancelUpdate();
        }
      }    

    return (
         <div id='container-carModel' className="container d-flex flex-column align-items-center">

            <div id='select-block' className="col-md-6">

                <div className="mb-2">
                    <label htmlFor="selectCarModel">Model Seç</label>
                    <select className="form-select" id="carModelSelect" value={selectedCarModel || ''} onChange={handleCarModelChange}>
                        <option value="" disabled>

                        </option>
                        {carModelState.carModels.map((carModel: any) => (
                            <option key={carModel.id} value={carModel.id} >
                                {carModel.name}
                            </option>
                        ))}
                    </select>
                </div>
             <button type="button" className="btn btn-primary" onClick={handleDeleteCarModel} disabled={selectedCarModel === null}>
                    Delete Car Model
                </button> 
            </div>

        </div> 
    )
}

export default DeleteCarModel