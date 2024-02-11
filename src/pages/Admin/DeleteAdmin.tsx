import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteAdmin, fetchAdmins } from '../../store/slices/adminSlice';

type Props = {}

const DeleteAdmin = (props: Props) => {
  

    const dispatch = useDispatch<AppDispatch>();
    const adminState = useSelector((state: any) => state.admin);
    const [selectedAdmin, setSelectedAdmin] = useState<number | null>(null);
  
    useEffect(() => {
      dispatch(fetchAdmins());
    })
  
    const handleAdminChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAdmin(parseInt(e.target.value, 10));    
    };
    
  
    
    const handleDeleteAdmin = async () => {
      if (selectedAdmin !== null) {
        await dispatch(deleteAdmin({ adminId: selectedAdmin }));
        setSelectedAdmin(null);
      }
    }
  
    return (
      <div id='container-admin' className="container d-flex flex-column align-items-center">
  
        <div id='select-block' className="col-md-6">
  
          <div className="mb-2">
            <label htmlFor="selectAdmin">Admin Seç</label>
            <select className="form-select" id="adminSelect" value={selectedAdmin || ''} onChange={handleAdminChange}>
              <option value="" disabled>
  
              </option>
              {adminState.admins.map((admin: any) => (
                <option key={admin.id} value={admin.id} >
                  {admin.name}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleDeleteAdmin} disabled={selectedAdmin === null}>
            Delete Admin
          </button>
        </div>
  
      </div>
    )
}

export default DeleteAdmin