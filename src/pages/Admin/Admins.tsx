import SideBar from "../../components/Sidebar/SideBar";
import "../Brands/Brand.css";
import MyMUIDataTable from "./AdminTable";

type Props = {};

const Admins = (props: Props) => {
  return (
    <SideBar>
      <div className="full-screen">
        <MyMUIDataTable />
      </div>
    </SideBar>
  );
};

export default Admins;
