import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import { deleteFuelType, fetchFuelType } from "../../store/slices/fuelTypeSlice";

type Props = {}

const DeleteFuelType = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const fuelTypeState = useSelector((state: any) => state.fuelType)

    const [selectedFuelType, setSelectedFuelType] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchFuelType())
    }, [dispatch])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFuelType(parseInt(e.target.value, 10))
    };

   /*  const handleCancelUpdate = () => {
        setSelectedFuelType(null);
        dispatch(fetchFuelType());
    }; */

    const handleDeleteFuelType = async () => {
        if (selectedFuelType !== null) {
            await dispatch(deleteFuelType({ fuelTypeId: selectedFuelType }))
            setSelectedFuelType(null);
           // handleCancelUpdate();
        }

    };


    return (
        <div id='container-shiftType' className="container d-flex flex-column align-items-center">
    
        <div id='select-block' className="col-md-6">

          <div className="mb-2">
            <label htmlFor="selectFuelType">Yakıt Tipi Seç</label>
            <select className="form-select" id="fuelTypeSelect"  value={selectedFuelType || ''} onChange={handleSelectChange}>
              <option value="" disabled>

              </option>
              {fuelTypeState.fuelTypes.map((fuelType: any) => (
                    <option key={fuelType.id} value={fuelType.id}>
                        {fuelType.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleDeleteFuelType} disabled={selectedFuelType === null}>
                Delete Fuel Type
            </button>
      
          </div>
           
        </div>
    )
}

export default DeleteFuelType