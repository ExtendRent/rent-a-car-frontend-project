import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/configureStore'
import { addAdmin } from '../../store/slices/adminSlice'

type Props = {}

const AddAdmin = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salary, setSalary] = useState<number>(0);
  const [imagePath, setImagePath] = useState("");
  const [status, setStatus] = useState("");
  const [authority, setAuthority] = useState("");


  const handleAddAdmin = () => {
      if(name.trim() !== "" && surname.trim() !== "" && emailAddress.trim() !== "" && password.trim() !== ""
      && phoneNumber.trim() !== "" && salary !== null && imagePath.trim() !== "" && status.trim() !== "" 
      && authority.trim() !== ""){
      dispatch(addAdmin({name: name, surname: surname, emailAddress: emailAddress, password: password,
        phoneNumber: phoneNumber, salary: salary, imagePath: imagePath, status: status, authority: authority}));
      setName("");
      setSurname("");
      setEmailAddress("");
      setPassword("");
      setPhoneNumber("");
      setSalary(0);
      setImagePath("");
      setStatus("");
      setAuthority("");
    }
  }


  return (
    <div style={{ marginTop: 100 }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="surname"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          placeholder="emailAddress"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="phoneNumber"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={salary !== null ? salary.toString() : ''}
          onChange={(e) => setSalary(parseFloat(e.target.value))}
          placeholder="salary"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          placeholder="imagePath"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="status"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={authority}
          onChange={(e) => setAuthority(e.target.value)}
          placeholder="authority"
        />
      </div>

      <button onClick={handleAddAdmin}>Add Addmin</button>

    </div>
  )
}

export default AddAdmin