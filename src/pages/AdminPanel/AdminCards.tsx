import React, { useState } from "react";
import "./AdminPanelCard.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useEffect } from "react";
import { getUserCountIsDeleted } from "../../store/slices/userSlice";
import {
  getCustomerCountByStatus,
  getCustomerCountIsDeleted,
} from "../../store/slices/customerSlice";
import { getEmployeeCountIsDeleted } from "../../store/slices/employeeSlice";
import { getAdminCountIsDeleted } from "../../store/slices/adminSlice";
import {
  getCarCountByStatus,
  getCarCountIsDeleted,
} from "../../store/slices/carSlice";
import {
  getRentalCountByStatus,
  getRentalCountIsDeleted,
} from "../../store/slices/rentalSlice";
type Props = {};

const AdminCards = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const rentalState = useSelector((state: any) => state.rental);
  const carState = useSelector((state: any) => state.car);
  const userState = useSelector((state: any) => state.user);
  const customerState = useSelector((state: any) => state.customer);
  const employeeState = useSelector((state: any) => state.employee);
  const adminState = useSelector((state: any) => state.admin);
  const [userCountIsDeleted, setUserCountIsDeleted] = useState(0);
  const [userCountIsDeletedTrue, setUserCountIsDeletedTrue] = useState(0);
  const [customerPending, setCustomerPending] = useState(0);
  const [customerVerified, setCustomerVerified] = useState(0);
  const [customerBlocked, setCustomerBlocked] = useState(0);
  
  
  useEffect(() => {
    const fetchData = async () => {
        const fetchedUserCountIsDeleted: any = await dispatch(getUserCountIsDeleted({ deleted: false }));
        const fetchedUserCountIsTrue: any = await dispatch(getUserCountIsDeleted({ deleted: true }));
        
        const fetchedCustomerPending: any = await dispatch(getCustomerCountByStatus({ status:"PENDING_VERIFYING"  }));
        const fetchedCustomerVerified: any = await dispatch(getCustomerCountByStatus({ status:"VERIFIED"  }));
        const fetchedCustomerBlocked: any = await dispatch(getCustomerCountByStatus({ status:"BLOCKED"  }));
        
        dispatch(getCustomerCountIsDeleted({ deleted: false }));
        dispatch(getEmployeeCountIsDeleted({ deleted: false }));
        dispatch(getAdminCountIsDeleted({ deleted: false }));
        dispatch(getCarCountByStatus({ statusId: 2 }));
        dispatch(getCarCountIsDeleted({ deleted: false }));
        dispatch(getRentalCountByStatus({ status: 3 }));
        dispatch(getRentalCountIsDeleted({ deleted: false }));


        setUserCountIsDeleted(fetchedUserCountIsDeleted.payload.response as number);
        setUserCountIsDeletedTrue(fetchedUserCountIsTrue.payload.response as number);

        setCustomerPending(fetchedCustomerPending.payload.response as number);
        setCustomerVerified(fetchedCustomerVerified.payload.response as number);
        setCustomerBlocked(fetchedCustomerBlocked.payload.response as number);
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="container2">
        <div className="row">
            <div className="col-md-4 col-lg-3">
            <div className="card bg-c-purple order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">
                    Kullanıcılar
                </h4>
                <br />
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Aktif Kullanıcılar : <span>{userCountIsDeleted}</span>
                </h6>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Silinen Kullanıcılar : <span>{userCountIsDeletedTrue}</span>
                </h6>
                <br />
                </div>
            </div>
            </div>
          
            <div className="col-md-4 col-lg-3">
            <div className="card bg-c-pink order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">
                    Müşteriler
                </h4>
                <br></br>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Onay Bekleyenler : <span>{customerPending}</span>
                </h6>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Onaylananlar : <span>{customerVerified}</span>
                </h6>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Engellenenler : <span>{customerBlocked}</span>
                </h6>
                </div>
            </div>
            </div>
            <div className="col-md-4 col-lg-3">
            <div className="card bg-c-vivid-green order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">
                    EMPLOYEE
                </h4>
                <br></br>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Total Active : <span>{employeeState.employees}</span>
                </h6>
                <br />
                <br />
                </div>
            </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 col-lg-3">
                <div className="card bg-c-blue order-card">
                <div className="card-block">
                    <h4 style={{ textAlign: "center" }} className="m-b-20">
                    ADMIN
                    </h4>
                    <br></br>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Total Active : <span>{adminState.admins}</span>
                    </h6>
                    <br />
                    <br />
                </div>
                </div>
            </div>

            <div className="col-md-4 col-lg-3">
                <div className="card bg-c-green order-card">
                <div className="card-block">
                    <h4 style={{ textAlign: "center" }} className="m-b-20">
                    CAR
                    </h4>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-car"
                        aria-hidden="true"
                        style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Pending Verifying : <span>{carState.cars}</span>
                    </h6>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-car"
                        aria-hidden="true"
                        style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Total Active : <span>{carState.cars}</span>
                    </h6>
                    <br />
                    <br />
                </div>
                </div>
            </div>

            <div className="col-md-4 col-lg-3">
                <div className="card bg-c-yellow order-card">
                <div className="card-block">
                    <h4 style={{ textAlign: "center" }} className="m-b-20">
                    RENTAL
                    </h4>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Pending Verifying : <span>{rentalState.rentals}</span>
                    </h6>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ fontSize: "24px" }}
                    ></i>{" "}
                    Total Active : <span>{rentalState.rentals}</span>
                    </h6>
                    <br />
                    <br />
                </div>
                </div>
            </div>
        </div>
    </div>
  
  );
};

export default AdminCards;
