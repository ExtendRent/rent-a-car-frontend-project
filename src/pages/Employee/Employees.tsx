import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteEmployee, fetchEmployees, updateEmployee } from '../../store/slices/employeeSlice';

type Props = {}

const Employees = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const employeeState = useSelector((state: any) => state.employee);

  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(typeof e.target.value);

    setSelectedEmployee(parseInt(e.target.value, 10));
  };

  const handleEmployeeUpdateSuccess = () => {
    if(name.trim() !== "" && selectedEmployee !== null ){
      dispatch(updateEmployee({
        id:selectedEmployee,
        name: name,
        surname: surname,
        emailAddress: emailAddress,
        password: password,
        phoneNumber: phoneNumber,
        salary: salary,
      }));
      handleCancelUpdate();
    }
    
  };

  const handleCancelUpdate = () => {
    setSelectedEmployee(null);
    setName("");
    setSurname("");
    setEmailAddress("");
    setPassword("");
    setPhoneNumber("");
    setSalary(0);
    dispatch(fetchEmployees());
  };

  return (

    <div>
      <div style={{ marginTop: 200 }}>
        <h2>Employee List</h2>

        <select value={selectedEmployee || ''} onChange={handleSelectChange}>
          <option value="" disabled>
            Select a employee
          </option>
          {employeeState.employees.map((employee: any) => (
            <option key={employee.id} value={employee.id}>
              {employee.name} {employee.surname}
            </option>
          ))}
        </select>
      </div>
      {selectedEmployee !== null && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>)}

      {selectedEmployee !== null && (
        <div>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>)}
      {selectedEmployee !== null && (
        <div>
          <input
            type="text"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>)}
      {selectedEmployee !== null && (
        <div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>)}
      {selectedEmployee !== null && (
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>)}

      {selectedEmployee !== null && (
        <div>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(parseInt(e.target.value, 10))}
          />

        </div>)}
        <button onClick={handleEmployeeUpdateSuccess}>Update Employee</button>
          <button onClick={handleCancelUpdate}>Cancel</button>

    </div>
  )
}

export default Employees