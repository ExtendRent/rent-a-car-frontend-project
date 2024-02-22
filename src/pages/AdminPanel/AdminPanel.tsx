import AdminRoutes from '../AdminRoutes/AdminRoutes'
import "./AdminPanelCard.css"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/configureStore'
import { useEffect } from 'react'
import { getUserCountIsDeleted } from '../../store/slices/userSlice'
import { getCustomerCountByStatus, getCustomerCountIsDeleted } from '../../store/slices/customerSlice'
import { getEmployeeCountIsDeleted } from '../../store/slices/employeeSlice'
import { getAdminCountIsDeleted } from '../../store/slices/adminSlice'
import { getCarCountByStatus, getCarCountIsDeleted } from '../../store/slices/carSlice'
import { getRentalCountByStatus, getRentalCountIsDeleted } from '../../store/slices/rentalSlice'


type Props = {}

const AdminPanel = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const rentalState = useSelector((state: any) => state.rental);
  const carState = useSelector((state: any) => state.car);
  const userState = useSelector((state: any) => state.user);
  const customerState = useSelector((state: any) => state.customer);
  const employeeState = useSelector((state: any) => state.employee);
  const adminState = useSelector((state: any) => state.admin);

  useEffect(() => {
    dispatch(getUserCountIsDeleted({ deleted: false }));
    dispatch(getCustomerCountByStatus({ status: "PENDING_VERIFYING" }));
    dispatch(getCustomerCountIsDeleted({ deleted: false }));
    dispatch(getEmployeeCountIsDeleted({ deleted: false }));
    dispatch(getAdminCountIsDeleted({ deleted: false }));
    dispatch(getCarCountByStatus({ statusId: 2 }));
    dispatch(getCarCountIsDeleted({ deleted: false }));
    dispatch(getRentalCountByStatus({ status: 3 }));
    dispatch(getRentalCountIsDeleted({ deleted: false }));
  }, [dispatch]);


  return (
    <div>
      <AdminRoutes />
     <div className="container2">
        <div className="row">

          <div className="col-md-4 col-lg-3">
            <div className="card bg-c-purple order-card">
              <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">USER</h4>
                <br/>
                <h6 className="m-b-20"><i className="fa fa-user" aria-hidden="true" style={{ fontSize: "24px" }}></i>  Total Active : <span>{userState.users}</span></h6>
                <br/><br/>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <div className="card bg-c-pink order-card">
              <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">CUSTOMER</h4>
                <br></br>
                <h6 className="m-b-20"><i className="fa fa-user" aria-hidden="true" style={{ fontSize: "24px" }}></i> Penfing Verifying : <span>{customerState.customers}</span></h6>
                <h6 className="m-b-20"><i className="fa fa-user" aria-hidden="true" style={{ fontSize: "24px" }}></i> Total Active : <span>{customerState.customers}</span></h6>
                <br/>
                
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3">
            <div className="card bg-c-vivid-green order-card">
              <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">EMPLOYEE</h4>
                <br></br>
                <h6 className="m-b-20"><i className="fa fa-user" aria-hidden="true" style={{ fontSize: "24px" }}></i>  Total Active : <span>{employeeState.employees}</span></h6>
                <br/><br/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <div className="card bg-c-blue order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">ADMIN</h4>
                <br></br>
                <h6 className="m-b-20"><i className="fa fa-user" aria-hidden="true" style={{ fontSize: "24px" }}></i>  Total Active : <span>{adminState.admins}</span></h6>
                <br/><br/>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3">
              <div className="card bg-c-green order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">CAR</h4>
                <h6 className="m-b-20"><i className="fa fa-car" aria-hidden="true" style={{ fontSize: "24px" }}></i> Pending Verifying : <span>{carState.cars}</span></h6>
                <h6 className="m-b-20"><i className="fa fa-car" aria-hidden="true" style={{ fontSize: "24px" }}></i> Total Active : <span>{carState.cars}</span></h6>
                <br/><br/>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3">
              <div className="card bg-c-yellow order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">RENTAL</h4>
                <h6 className="m-b-20"><i className="fa fa-user" aria-hidden="true" style={{ fontSize: "24px" }}></i> Pending Verifying : <span>{rentalState.rentals}</span></h6>
                <h6 className="m-b-20"><i className="fa fa-user" aria-hidden="true" style={{ fontSize: "24px" }}></i> Total Active : <span>{rentalState.rentals}</span></h6>
                <br/><br/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel