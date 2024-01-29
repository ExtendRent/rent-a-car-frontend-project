import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addEmployee } from '../../store/slices/employeeSlice';

type Props = {}

const AddEmployee = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salary, setSalary] = useState(0);


  const handleAddEmployee = () => {
    if (name.trim() !== "") {
      dispatch(addEmployee(
        {
          name: name, surname: surname, emailAddress: emailAddress, password: password,
          phoneNumber: phoneNumber, salary: salary
        }));
      setName("");
    }
  };
  return (
    <div>
      <div style={{ marginTop: 200 }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
      <input
          type="text"
          value={salary !== null ? salary.toString() : ''}
          onChange={(e) => setSalary(parseFloat(e.target.value))}
        />
      </div>

      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  )
}

export default AddEmployee