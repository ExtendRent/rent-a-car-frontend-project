import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import { deleteEmployee, fetchEmployees } from "../../store/slices/employeeSlice";

type Props = {}

const DeleteEmployee = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const employeeState = useSelector((state: any) => state.employee);

    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);


    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEmployee(parseInt(e.target.value, 10));
    };

    const handleDeleteEmployee = async () => {
        if (selectedEmployee !== null) {
            await dispatch(deleteEmployee({ employeeId: selectedEmployee }));
            setSelectedEmployee(null);
        }
    };
    
    return (
        <div id='container-shiftType' className="container d-flex flex-column align-items-center">

            <div id='select-block' className="col-md-6">

                <div className="mb-2">
                    <label htmlFor="selectShiftType">Vites Tipi Seç</label>
                    <select className="form-select" id="shiftTypeSelect" value={selectedEmployee || ''} onChange={handleSelectChange}>
                        <option value="" disabled>

                        </option>
                        {employeeState.employees.map((employee: any) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name} {employee.surname}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={handleDeleteEmployee} disabled={selectedEmployee === null}>
                    Delete Employee
                </button>

            </div>

        </div>
    )
}

export default DeleteEmployee