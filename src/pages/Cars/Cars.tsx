
import "./Car.css";

import SideBar from "../../components/Sidebar/SideBar";
import '../Brands/Brand.css';
import MyMUIDataTable from "./CarTable";

type Props = {};

const Cars = (props: Props) => {


  return (
    <div >
      <SideBar>

        <div className="full-screen">
          <MyMUIDataTable />
        </div>

      </SideBar>

    </div>
  );
};

export default Cars;
