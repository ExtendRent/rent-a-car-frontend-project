import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser,FaPlus ,FaCarSide,FaMinus,FaRedo,FaMediumM,FaMastodon,FaCaravan,FaPalette,FaTicketAlt,FaIdCard ,FaHospitalUser,FaGasPump ,FaRegUser     } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa6";

import { TbManualGearbox } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { MdCarCrash } from "react-icons/md";

import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './Sidebar.css';
const routes = [
 
  {
    path: "",
    name: "Arabalar",
    icon: <FaCarSide />,
    subRoutes: [
      {
        path: "/adminPanel/addCar",
        name: "Araba Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/Cars",
        name: "Araba Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteCar",
        name: "Araba Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Markalar",
    icon: <FaMediumM  />,
    subRoutes: [
      {
        path: "/adminPanel/AddBrand",
        name: "Marka Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/Brands",
        name: "Marka Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteBrand",
        name: "Marka Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Modeller",
    icon: <FaMastodon  />,
    subRoutes: [
      {
        path: "/adminPanel/AddCarModel",
        name: "Marka Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/CarModels",
        name: "Marka Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteCarModel",
        name: "Marka Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Araba Kasa Tipi",
    icon: <FaCaravan  />,
    subRoutes: [
      {
        path: "/adminPanel/AddCarBodyType",
        name: "Araba Kasa Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/CarBodyTypes",
        name: "Araba Kasa Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteCarBodyType",
        name: "Araba Kasa Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Renkler",
    icon: <FaPalette   />,
    subRoutes: [
      {
        path: "/adminPanel/AddColor",
        name: "Renk Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/Colors",
        name: "Renk Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteColor",
        name: "Renk Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "İndirim Kodu",
    icon: <FaTicketAlt    />,
    subRoutes: [
      {
        path: "/adminPanel/AddDiscountCode",
        name: "İndirim Kodu Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/DiscountCodes",
        name: "İndirim Kodu Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteDiscountCode",
        name: "İndirim Kodu Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Ehliyet Tipi",
    icon: <FaIdCard     />,
    subRoutes: [
      {
        path: "/adminPanel/AddDrivingLicenseType",
        name: "Ehliyet Tipi Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/DrivingLicenseTypes",
        name: "Ehliyet Tipi Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteDrivingLicenseType",
        name: "Ehliyet Tipi Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Yakıt Tipi",
    icon: <FaGasPump       />,
    subRoutes: [
      {
        path: "/adminPanel/AddFuelType",
        name: "Yakıt Tipi Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/FuelTypes",
        name: "Yakıt Tipi Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteFuelType",
        name: "Yakıt Tipi Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Vites Tipi",
    icon: <TbManualGearbox       />,
    subRoutes: [
      {
        path: "/adminPanel/AddShiftType",
        name: "Vites Tipi Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/ShiftTypes",
        name: "Vites Tipi Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteShiftType",
        name: "Vites Tipi Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Araç Segmenti",
    icon: <TbManualGearbox       />,
    subRoutes: [
      {
        path: "/adminPanel/AddCarSegment",
        name: "Araç Segmenti Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/CarSegments",
        name: "Araç Segmenti Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteCarSegment",
        name: "Araç Segmenti Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Çalışan",
    icon: <FaHospitalUser      />,
    subRoutes: [
      {
        path: "/adminPanel/AddEmployee",
        name: "Çalışan Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/Employees",
        name: "Çalışan Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/DeleteEmployee",
        name: "Çalışan Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "",
    name: "Admin",
    icon: <GrUserAdmin       />,
    subRoutes: [
      {
        path: "/adminPanel/addAdmin",
        name: "Admin Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/Admins",
        name: "Admin Güncelleme",
        icon: <FaRedo   />,
      },
      {
        path: "/adminPanel/deleteAdmin",
        name: "Admin Silme",
        icon: <FaMinus  />,
      },
    ],
  },
  {
    path: "/adminPanel/VehicleStatuses",
    name: "Araç durumu",
    icon: <MdCarCrash        />,
  },
  {
    path: "/adminPanel/paymentTypes",
    name: "Ödeme Tipi",
    icon: <MdPayment        />,
  },
  {
    path: "/adminPanel/paymentDetails",
    name: "Fatura",
    icon: <FaFileInvoice         />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Admin Panel
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;