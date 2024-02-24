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
import { color } from "@mui/system";
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
  const [customerBlocked, setCustomerBlocked] = useState(0);
  const [customerIsDeleted, setCustomerIsDeleted] = useState(0);
  const [employeeCountIsDeleted, setEmployeeCountIsDeleted] = useState(0);
  const [employeeCountIsDeletedTrue, setEmployeeCountIsDeletedTrue] = useState(0);
  const [adminCountIsDeleted, setAdminCountIsDeleted] = useState(0);
  const [adminCountIsDeletedTrue, setAdminCountIsDeletedTrue] = useState(0);
  const [carInUse, setCarInUse] = useState(0);
  const [carMaintenance, setCarMaintenance] = useState(0);
  const [carCountIsDeleted, setCarCountIsDeleted] = useState(0);
  const [rentalActive, setRentalActive] = useState(0);
  const [rentalFinished, setRentalFinished] = useState(0);
  const [rentalCountIsDeleted, setRentalCountIsDeleted] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
        const fetchedUserCountIsDeleted: any = await dispatch(getUserCountIsDeleted({ deleted: false }));
        const fetchedUserCountIsTrue: any = await dispatch(getUserCountIsDeleted({ deleted: true }));
        
        const fetchedCustomerPending: any = await dispatch(getCustomerCountByStatus({ status:"PENDING_VERIFYING"  }));
        const fetchedCustomerBlocked: any = await dispatch(getCustomerCountByStatus({ status:"BLOCKED"  }));

        const fetchedCustomerIsDeleted: any = await dispatch(getCustomerCountIsDeleted({ deleted : false  }));
        
        const fetchedEmployeeCountIsDeleted: any = await dispatch(getEmployeeCountIsDeleted({ deleted: false }));
        const fetchedEmployeeCountIsTrue: any = await dispatch(getEmployeeCountIsDeleted({ deleted: true }));

        const fetchedAdminCountIsDeleted: any = await dispatch(getAdminCountIsDeleted({ deleted: false }));
        const fetchedAdminCountIsTrue: any = await dispatch(getAdminCountIsDeleted({ deleted: true }));
        
        const fetchedCarInUse: any = await dispatch(getCarCountByStatus({ statusId: 1  }));
        const fetchedCarMaintenance: any = await dispatch(getCarCountByStatus({ statusId: 2  }));
        const fetchedCarCountIsDeleted: any = await dispatch(getCarCountIsDeleted({ deleted: false }));
        
        const fetchedRentalActive: any = await dispatch(getRentalCountByStatus({ status: 1  }));
        const fetchedRentalFinished: any = await dispatch(getRentalCountByStatus({ status: 2  }));
        const fetchedRentalCountIsDeleted: any = await dispatch(getRentalCountIsDeleted({ deleted: false }));


        setUserCountIsDeleted(fetchedUserCountIsDeleted.payload.response as number);
        setUserCountIsDeletedTrue(fetchedUserCountIsTrue.payload.response as number);

        setCustomerPending(fetchedCustomerPending.payload.response as number);
        setCustomerBlocked(fetchedCustomerBlocked.payload.response as number);
        setCustomerIsDeleted(fetchedCustomerIsDeleted.payload.response as number);

        setEmployeeCountIsDeleted(fetchedEmployeeCountIsDeleted.payload.response as number);
        setEmployeeCountIsDeletedTrue(fetchedEmployeeCountIsTrue.payload.response as number);

        setAdminCountIsDeleted(fetchedAdminCountIsDeleted.payload.response as number);
        setAdminCountIsDeletedTrue(fetchedAdminCountIsTrue.payload.response as number);

        setCarInUse(fetchedCarInUse.payload.response as number);
        setCarMaintenance(fetchedCarMaintenance.payload.response as number);
        setCarCountIsDeleted(fetchedCarCountIsDeleted.payload.response as number);

        setRentalActive(fetchedRentalActive.payload.response as number);
        setRentalFinished(fetchedRentalFinished.payload.response as number);
        setRentalCountIsDeleted(fetchedRentalCountIsDeleted.payload.response as number);

    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="container2">
        <div className="row">
            <div className="col-md-4 col-lg-3">
            <div className="card order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">
                    Kullanıcılar
                </h4>
                <h6 className="m-b-20">
                <i className="fa fa-user" style={{fontSize: "24px" ,color: '#8C1816'}}></i>{" "}
                    Aktif Kullanıcılar : <span>{userCountIsDeleted}</span>
                </h6>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px" ,color: '#8C1816'}}
                    ></i>{" "}
                    Silinen Kullanıcılar : <span>{userCountIsDeletedTrue}</span>
                </h6>
                <br />
                </div>
            </div>
            </div>
          
            <div className="col-md-4 col-lg-3">
            <div className="card order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">
                    Müşteriler
                </h4>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px", color: '#8C1816'}}
                    ></i>{" "}
                    Onay Bekleyenler : <span>{customerPending}</span>
                </h6>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Engellenenler : <span>{customerBlocked}</span>
                </h6>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Mevcut : <span>{customerIsDeleted}</span>
                </h6>
                </div>
            </div>
            </div>
            <div className="col-md-4 col-lg-3">
            <div className="card order-card">
                <div className="card-block">
                <h4 style={{ textAlign: "center" }} className="m-b-20">
                    ÇALIŞANLAR
                </h4>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Aktif Kullanıcılar : <span>{employeeCountIsDeleted}</span>
                </h6>
                <h6 className="m-b-20">
                    <i
                    className="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Silinen Kullanıcılar : <span>{employeeCountIsDeletedTrue}</span>
                </h6>
                <br />
                </div>
            </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 col-lg-3">
                <div className="card order-card">
                <div className="card-block">
                    <h4 style={{ textAlign: "center" }} className="m-b-20">
                    ADMIN
                    </h4>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Aktif Kullanıcılar : <span>{adminCountIsDeleted}</span>
                    </h6>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Silinenler : <span>{adminCountIsDeletedTrue}</span>
                    </h6>
                    <br />
                    <br />
                </div>
                </div>
            </div>

            <div className="col-md-4 col-lg-3">
                <div className="card order-card">
                <div className="card-block">
                    <h4 style={{ textAlign: "center" }} className="m-b-20">
                    ARABA
                    </h4>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-car"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Kullanımda : <span>{carInUse}</span>
                    </h6>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-car"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Bakımda : <span>{carMaintenance}</span>
                    </h6>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-car"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Mevcut : <span>{carCountIsDeleted}</span>
                    </h6>
                    <br />
                </div>
                </div>
            </div>

            <div className="col-md-4 col-lg-3">
                <div className="card order-card">
                <div className="card-block">
                    <h4 style={{ textAlign: "center"}} className="m-b-20">
                    KİRALAMA
                    </h4>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Aktif : <span>{rentalActive}</span>
                    </h6>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: '#8C1816' }}
                    ></i>{" "}
                    Tamamlanan : <span>{rentalFinished}</span>
                    </h6>
                    <h6 className="m-b-20">
                    <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: '#8C1816'}}
                    ></i>{" "}
                    Mevcut : <span>{rentalCountIsDeleted}</span>
                    </h6>
                    <br />
                </div>
                </div>
            </div>
        </div>
    </div>
  
  );
};

export default AdminCards;
