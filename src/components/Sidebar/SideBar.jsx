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
    name: "Araçlar",
    icon: <FaCarSide />,
    subRoutes: [
      {
        path: "/adminPanel/addCar",
        name: "Araç Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/Cars",
        name: "Araç Listesi",
        icon: <FaRedo   />,
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
        name: "Marka Listesi",
        icon: <FaRedo   />,
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
        name: "Model Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/CarModels",
        name: "Model Listesi",
        icon: <FaRedo   />,
      },
    ],
  },
  {
    path: "",
    name: "Kasa Tipi",
    icon: <FaCaravan  />,
    subRoutes: [
      {
        path: "/adminPanel/AddCarBodyType",
        name: "Kasa Ekleme",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/CarBodyTypes",
        name: "Kasa Listesi",
        icon: <FaRedo   />,
      },
    ],
  },
  {
    path: "",
    name: "Renkler",
    icon: <FaPalette  />,
    subRoutes: [
      {
        path: "/adminPanel/AddColor",
        name: "Renk Ekleme",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/Colors",
        name: "Renk Listesi",
        icon: <FaRedo   />,
      },
    ],
  },
  {
    path: "",
    name: "İndirim Kodu",
    icon: <FaTicketAlt />,
    subRoutes: [
      {
        path: "/adminPanel/AddDiscountCode",
        name: "İndirim Kodu Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/DiscountCodes",
        name: "İndirim Kodu Listesi",
        icon: <FaRedo   />,
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
        name: "Ehliyet Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/DrivingLicenseTypes",
        name: "Ehliyet Listesi",
        icon: <FaRedo   />,
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
        name: "Yakıt Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/FuelTypes",
        name: "Yakıt Listesi",
        icon: <FaRedo   />,
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
        name: "Vites Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/ShiftTypes",
        name: "Vites Listesi",
        icon: <FaRedo   />,
      },
    ],
  },
  {
    path: "",
    name: "Segment",
    icon: <TbManualGearbox       />,
    subRoutes: [
      {
        path: "/adminPanel/AddCarSegment",
        name: "Segment Ekleme ",
        icon: <FaPlus  />,
      },
      {
        path: "/adminPanel/CarSegments",
        name: "Segment Listesi",
        icon: <FaRedo   />,
      },
    ],
  },
  {
    path: "",
    name: "Araç Kiralama",
    icon: <TbManualGearbox       />,
    subRoutes: [
    
      {
        path: "/adminPanel/rentals",
        name: "Araç Kiralama",
        icon: <FaRedo   />,
      }
  
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
        name: "Çalışan Listesi",
        icon: <FaRedo   />,
      },
    ],
  },
  {
    path: "",
    name: "Kullanıcı",
    icon: <FaHospitalUser      />,
    subRoutes: [
      {
        path: "/adminPanel/Users",
        name: "Kullanıcı",
        icon: <FaPlus  />,
      }
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
        name: "Admin Listesi",
        icon: <FaRedo   />,
      },
    ],
  },
  {
    path: "/adminPanel/VehicleStatuses",
    name: "Araç durumu",
    icon: <MdCarCrash />,
  },
  {
    path: "/adminPanel/paymentTypes",
    name: "Ödeme Tipi",
    icon: <MdPayment />,
  },
  {
    path: "/adminPanel/paymentDetails",
    name: "Fatura",
    icon: <FaFileInvoice />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="main-container flex"> 
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
          }}
          className={`sidebar overflow-y-auto ${isOpen ? "bg-gray-800" : "bg-gray-900"}`} 
          style={{
            backgroundColor: "rgba(255, 255, 255, 0)",
            color: "rgb(255, 255, 255)",
            backdropFilter: "blur(4px)",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(59, 67, 129, 0.547) rgba(0, 0, 0, 0)",
            height: "auto"
          }}
        >
          <div className="top_section flex items-center justify-between px-4 py-3"> 
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="logo text-white" 
                >
                  Admin Panel
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <button onClick={toggle}>
                <FaBars className="text-white" /> 
              </button>
            </div>
          </div>
          <div className="search px-4 py-2"> 
            <div className="search_icon">
              <BiSearch className="text-white" /> 
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial={{ width: 0 }}
                  animate={{ width: "140px" }}
                  exit={{ width: 0 }}
                  type="text"
                  placeholder="Search"
                  className="bg-gray-600 text-white px-2 py-1 ml-2 rounded" 
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link flex items-center text-white px-4 py-2 border-r-4 border-transparent transition duration-200 hover:border-red-600 hover:bg-red-600" 
                  activeClassName="active"
                >
                  <div className="icon">
                    {route.icon} 
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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

        <main className="w-full">{children}</main>
      </div>
    </>
  );
};

export default SideBar;