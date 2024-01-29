import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteAdmin, fetchAdmins, updateAdmin } from '../../store/slices/adminSlice';

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
  const [status, setStatus] = useState("");
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
        status: status, 
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
    setStatus("");
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
    <div style={{ marginTop: 200 }}>
      <h2>Admin List</h2>

      <select value={selectedAdmin || ''} onChange={handleSelectChange}>
        <option value="" disabled>
          Select a admin
        </option>
        {adminState.admins.map((admin: any) => (
          <option key={admin.id} value={admin.id}>
            {admin.name} {admin.surname}
          </option>
        ))}
      </select>

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
        </div>
      )}

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="surname"
          />
        </div>
      )}

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="emailAddress"
          />
        </div>
      )}

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
      )}

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="phoneNumber"
          />
        </div>
      )}

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(parseFloat(e.target.value))}
          />
        </div>
      )}

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            placeholder="imagePath"
          />
        </div>
      )}

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="status"
          />
        </div>
      )}

      {selectedAdmin !== null && (
        <div>
          <input
            type="text"
            value={authority}
            onChange={(e) => setAuthority(e.target.value)}
            placeholder="authority"
          />
        </div>
      )}

      <button style={{ marginLeft: 8 }} onClick={handleAdminUpdateSuccess}>Update</button>
      <button style={{ marginLeft: 8 }} onClick={handleCancelUpdate}>Cancel</button>
      <button onClick={handleDeleteAdmin} disabled={selectedAdmin === null}>
        Delete
      </button>
    </div>
  )
}

export default Admins