import "../Brands/Brand.css";
import MyMUIDataTable from "./PaymentTypeTable";
import SideBar from "../../components/Sidebar/SideBar";

type Props = {};

const PaymentTypes = (props: Props) => {

  return (
    <SideBar>
      <div className="full-screen">
        <MyMUIDataTable />
      </div>
    </SideBar>
  );
};

export default PaymentTypes;
