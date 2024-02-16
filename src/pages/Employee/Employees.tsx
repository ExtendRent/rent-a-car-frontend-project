import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteEmployee, fetchEmployees, updateEmployee } from '../../store/slices/employeeSlice';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./EmployeeTable";
import '../Brands/Brand.css';


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
    <div >
    <SideBar>
      <div className="full-screen">
        <MyMUIDataTable />
      </div>
    </SideBar>
  </div>
  )
}

export default Employees