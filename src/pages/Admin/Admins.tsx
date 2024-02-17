import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteAdmin, fetchAdmins, updateAdmin } from '../../store/slices/adminSlice';
import SideBar from '../../components/Sidebar/SideBar';
import '../Brands/Brand.css';
import MyMUIDataTable from "./AdminTable";


type Props = {}

const Admins = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();

  const adminState = useSelector((state: any) => state.admin);

  const [selectedAdmin, setSelectedAdmin] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salary, setSalary] = useState<number>(0);
  const [imagePath, setImagePath] = useState("");
  const [authority, setAuthority] = useState("");

  useEffect(() => {
    dispatch(fetchAdmins())
    /* console.log(adminState); */
  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAdmin(parseInt(e.target.value, 10));    
  };

  const handleAdminUpdateSuccess = () => {
    if(selectedAdmin !== null && name.trim() !== ""){ 
      dispatch(updateAdmin({
        id: selectedAdmin,
        name: name,
        surname: surname,
        emailAddress: emailAddress, 
        password: password,
        phoneNumber: phoneNumber, 
        salary: salary, 
        imagePath: imagePath, 
        authority: authority
      }))
      handleCancelUpdate();
    };
  }

  const handleCancelUpdate = () => {
    setSelectedAdmin(null);
    setName("");
    setSurname("");
    setEmailAddress("");
    setPassword("");
    setPhoneNumber("");
    setSalary(0);
    setImagePath("");
    setAuthority("");
    dispatch(fetchAdmins());
  }

  const handleDeleteAdmin = async () => {
    if(selectedAdmin !== null){
      await dispatch(deleteAdmin({adminId : selectedAdmin}))
      handleAdminUpdateSuccess();
    }
  };

  return (
    <div >
      <SideBar>
        <div className="full-screen">
          <MyMUIDataTable />
        </div>
      </SideBar>
       
    </div>
  );
}

export default Admins