import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteCarBodyType, fetchCarBodyTypes } from '../../store/slices/carBodyTypeSlice';

type Props = {}

const DeleteCarBodyType = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const carBodyTypeState = useSelector((state: any) => state.carBodyType);
    const [selectedCarBodyType, setSelectedCarBodyType] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchCarBodyTypes());
    }, [dispatch])

    const handleCarBodyTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const carBodyTypeId = parseInt(e.target.value, 10);
        setSelectedCarBodyType(carBodyTypeId);
    }

    const handleDeleteCarBodyType = async () => {
        if (selectedCarBodyType !== null) {
            await dispatch(deleteCarBodyType({ carBodyTypeId: selectedCarBodyType }));
            setSelectedCarBodyType(null);
        }
    }

    return (
        <div id='container-carBodyType' className="container d-flex flex-column align-items-center">

            <div id='select-block' className="col-md-6">

                <div className="mb-2">
                    <label htmlFor="selectCarBodyType">Kasa Tipi Seç</label>
                    <select className="form-select" id="carBodyTypeSelect" value={selectedCarBodyType || ''} onChange={handleCarBodyTypeChange}>
                        <option value="" disabled>

                        </option>
                        {carBodyTypeState.carBodyTypes.map((carBodyType: any) => (
                            <option key={carBodyType.id} value={carBodyType.id} >
                                {carBodyType.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleDeleteCarBodyType} disabled={selectedCarBodyType === null}>
                    Delete Car Body Type
                </button>
            </div>

        </div>
    )
}

export default DeleteCarBodyType